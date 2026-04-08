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
    'footer.privacy': 'Privacy Policy', 
    'footer.company': 'Company',
    'footer.services': 'Services',
    'footer.contact': 'Contact Us',
    'footer.description': 'High-quality remodeling and construction services in Florida.',
    
  },
  es: {
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.gallery': 'Galería',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'cta.estimate': 'Pedir Estimado Gratis',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.company': 'Empresa',
    'footer.services': 'Servicios',
    'footer.contact': 'Contacto',
    'footer.description': 'Servicios de remodelación y construcción de alta calidad en Florida.',
  },
} as const;