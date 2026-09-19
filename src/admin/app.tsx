import type { StrapiApp } from '@strapi/strapi/admin';
import favicon from './extensions/favicon.png';

export default {
  config: {
    head: {
      favicon,
    },
  },
  bootstrap(app: StrapiApp) {},
};
