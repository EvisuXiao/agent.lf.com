const common = {
  state: {
    listRefresh: false,
    listTmp: {},
    rowTmp: {}
  },
  mutations: {
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
