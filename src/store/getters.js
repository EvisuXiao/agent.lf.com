const getters = {
  loading: state => state.common.loading,
  userInfo: state => state.user.info,
  listRefresh: state => state.common.listRefresh,
  listTmp: state => state.common.listTmp,
  rowTmp: state => state.common.rowTmp
};
export default getters
