// src/pages/api/send-email.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  
  // 1. SEGURIDAD: Verificación de Origen (Origin Check)
  // Asegura que la petición venga de tu propio sitio
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    "https://globocareremodeling.net",
    "https://www.globocareremodeling.net",
    "http://localhost:4321" // Para pruebas locales
  ];
  
  if (origin && !allowedOrigins.some(o => origin.startsWith(o))) {
    return new Response(JSON.stringify({ message: "Origen no autorizado" }), { status: 403 });
  }

  const data = await request.formData();

  // 2. SEGURIDAD: Honeypot (El campo trampa)
  // Si el campo 'confirm_email' (oculto en el frontend) tiene valor, es un bot.
  const honeypot = data.get('confirm_email');
  if (honeypot) {
    // Retornamos éxito falso para engañar al bot y que deje de intentar
    console.log("Bot detectado por Honeypot");
    return new Response(JSON.stringify({ message: "Enviado con éxito" }), { status: 200 });
  }

  // 3. SEGURIDAD: Validación de Tiempo (Time-trap)
  // Calculamos el tiempo desde que cargó la página hasta que envió
  const submitTime = Number(data.get('submit_time'));
  const now = Date.now();
  const timeDiff = now - submitTime;
  
  // Si tardó menos de 2.5 segundos (2500ms), es sospechoso
  if (!submitTime || timeDiff < 2500) {
     console.log("Envío demasiado rápido (posible bot)");
     return new Response(JSON.stringify({ message: "Envío demasiado rápido. Por favor tome su tiempo." }), { status: 429 });
  }

  const name = data.get('name');
  const email = data.get('email');
  const phone = data.get('phone');
  const customerType = data.get('customerType');
  const service = data.get('service');
  const timeline = data.get('timeline');
  const message = data.get('message');

  // Validación de campos
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ message: "Faltan campos obligatorios" }),
      { status: 400 }
    );
  }

  try {
    const send = await resend.emails.send({
      from: 'Globo Care Web <noreply@globocareremodeling.net>',
      to: ['info@globocareremodeling.net'],
      replyTo: email as string, // Permite responder directo al cliente
      subject: `Nuevo Lead: ${name} - ${service}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ea580c;">Nuevo Mensaje de Contacto</h1>
          <p>Has recibido una nueva solicitud desde el sitio web.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Cliente:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Teléfono:</strong> <a href="tel:${phone}">${phone}</a></p>
          </div>

          <h3>Perfil del Cliente</h3>
          <ul>
            <li><strong>Tipo de Cliente:</strong> ${customerType}</li>
            <li><strong>Servicio:</strong> ${service}</li>
            <li><strong>Urgencia:</strong> ${timeline}</li>
          </ul>

          <h3>Mensaje:</h3>
          <p style="white-space: pre-wrap; background-color: #fff; padding: 15px; border: 1px solid #e5e7eb; border-radius: 5px;">${message}</p>
          
          <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #888;">Este mensaje fue enviado desde el formulario seguro de globocareremodeling.net</p>
        </div>
      `,
    });

    if (send.error) {
      return new Response(JSON.stringify({ message: send.error.message }), { status: 500 });
    }

    return new Response(
      JSON.stringify({ message: "Correo enviado con éxito" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 });
  }
};