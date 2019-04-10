const user = {
  state: {
    info: {
      mid: 0 // 代理ID
    }
  },

  mutations: {
    setInfo: (state, info) => {
      state.info = info;
    }
  }
};

export default user
