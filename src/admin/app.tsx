import type { StrapiApp } from '@strapi/strapi/admin';
import favicon from './extensions/favicon.png';

export default {
  config: {
    head: {
      favicon,
    },
    auth: {
      logo: favicon,
    },
    menu: {
      logo: favicon,
    },
    translations: {
      en: {
        'Auth.form.welcome.title': 'Welcome to Hard Hit dashboard!',
        'Auth.form.welcome.subtitle': 'Log in with your credentials',
        'app.components.LeftMenu.navbrand.title': 'HardHit Dashboard',
      },
    },
  },
  bootstrap(app: StrapiApp) {},
};
