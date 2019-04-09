const common = {
  state: {
    loading: false,
    listRefresh: false,
    listTmp: {},
    rowTmp: {}
  },
  mutations: {
    setLoading (state, n) {
      state.loading = n
    },
    setListRefresh (state, n) {
      state.listRefresh = n
    },
    setListTmp (state, n) {
      state.listTmp = n
    },
    setRowTmp (state, n) {
      state.rowTmp = n
    }
  }
};

export default common
