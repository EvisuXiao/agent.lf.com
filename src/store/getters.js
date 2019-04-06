// 购物车价格
// export const shoppingCartPrice = state => {
//   let price = 0;
//   state.shoppingCart.forEach(item => {
//     price += item.count * item.price;
//   });
//   return price / 100;
// };
const getters = {
  userInfo: state => state.user.info,
  rowTmp: state => state.common.rowTmp
};
export default getters
