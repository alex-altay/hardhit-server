/**
 * band controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::band.band', ({ strapi }) => ({
  /**
   * All published bands sorted by name without limits and pagination. 
   * Separate short data type != Band[] for lightweight request
   */
  async index() {
    const bands = await strapi.documents('api::band.band').findMany({
      fields: ['name', 'slug'],
      populate: {
        photos_collections: { fields: ['id'] },
        interview_links: { fields: ['id'] },
        live_links: { fields: ['id'] },
      },
      sort: 'name:asc',
      status: 'published',
    });

    return {
      data: bands.map((band) => ({
        name: band.name,
        slug: band.slug,
        media: {
          hasPhotos: Boolean(band.photos_collections?.length),
          hasInterview: Boolean(band.interview_links?.length),
          hasVideo: Boolean(band.live_links?.length),
        },
      })),
    };
  },
}));
