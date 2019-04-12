const common = {
  state: {
    loading: false,
    rowTmp: {}
  },
  mutations: {
    setLoading (state, n) {
      state.loading = n
    },
    setRowTmp (state, n) {
      state.rowTmp = n
    }
  }
};

export default common
