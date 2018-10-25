const app = {
  state: {
    breadcrumbName: '',
  },
  mutations: {
    updateBreadcrumbName(state, payload) {
      Object.assign(state, {
        breadcrumbName: payload.name,
      });
    },
  },
  actions: {

  },
};

export default app;
