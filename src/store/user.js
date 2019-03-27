const user = {
  state: {
    info: {
      id: 0,
      nickName: '',
      mobile: '',
      role: '',
      mode: 0,
      level: 1,
      lastLogin: ''
    }
  },

  mutations: {
    setInfo: (state, info) => {
      state.info = info;
    }
  }
}

export default user
