import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

const store = () => new Vuex.Store({
  state: {
    couponListList: []
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
