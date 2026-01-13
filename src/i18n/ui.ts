// src/i18n/ui.ts
export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'cta.estimate': 'Get Free Estimate',
    'footer.rights': 'All rights reserved.',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.gallery': 'Galería',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'cta.estimate': 'Pedir Estimado Gratis',
    'footer.rights': 'Todos los derechos reservados.',
  },
} as const;