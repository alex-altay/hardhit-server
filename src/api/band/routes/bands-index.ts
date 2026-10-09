/**
 * All bands at once for an alphabetical index, see the index action of the band controller.
 * Not /bands/index: the core GET /bands/:id route would take "index" for a band id
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/bands-index',
      handler: 'band.index',
    },
  ],
};
