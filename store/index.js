import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

const store = () => new Vuex.Store({
  state: {
    user: {
      userId: '10009344'
    },
    loginName: '静静',
    userInvest: {},
    IP: ''
  },

  actions,
  mutations

  // mutations: {
  //   getcouponList (state) {
  //     state.couponListList = [
  //       {
  //         name: '小金链',
  //         time: '2018-09-09'
  //       }
  //
  //     ]
  //   }
  //
  // }
})

export default store
