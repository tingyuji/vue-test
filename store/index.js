import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    couponList: []
  },
  mutations: {
    getcouponList (state) {
      state.couponList = [
        {
          name: '小金链',
          time: '2018-09-09'
        }

      ]
    }

  }
})

export default store