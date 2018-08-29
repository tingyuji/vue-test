
import Services from './services'
export default {
  getUserInvestInfo ({ commit, state }) {
    var datas = {
      userId: state.user.userId
    }
    console.log(datas)
    return Services.getUserInvestInfo(datas).then(function (res) {
      if (res) {
        var data = {
          totalAsset: res.totalAsset,
          availBalance: res.availBalance,
          investingAmount: res.investingAmount,
          investmentAmount: res.investmentAmount,
          investmentProfit: res.investmentProfit,
          collectProfit: res.collectProfit
        }
        commit('SET_USERINVEST', data)
      }
      return res
    }).catch(function (err) {
      console.log(err)
    })
  },

  getCouponAmount ({state}) {
    var datas = {
      hryId: state.user.userId
    }
    return Services.getCouponAmount(datas).then(function (res) {
      return res
    }).catch(function (err) {
      console.log(err)
    })
  },

  getUserLcjDetail () {
    return Services.getUserLcjDetail().then(function (res) {
      return res
    }).catch(function (err) {
      console.log(err)
    })
  },

  queryCouponList ({ commit, state, getters }, datas) {
    datas.hryId = '10009344'
    return Services.queryCouponList(datas).then(function (res) {
      console.log(res)
      return res
    }).catch(function (err) {
      console.log(err)
    })
  },

  queryLcjListByStatus ({ commit, state, getters }, datas) {
    datas.hryId = '10009344'
    return Services.queryLcjListByStatus(datas).then(function (res) {
      return res
    }).catch(function (err) {
      console.log(err)
    })
  }
}