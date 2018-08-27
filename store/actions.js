import axios from 'axios'
import Services from './services'
export default {
  getUserInvestInfo () {
    return Services.getUserInvestInfo().then(function (res) {
      return res
    }).catch(function (err) {
      console.log(err)
    })
  },

  getCouponAmount () {
    return Services.getCouponAmount().then(function (res) {
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
    datas.hryId = '10007952'
    return Services.queryCouponList(datas).then(function (res) {
      console.log(res)
      return res
    }).catch(function (err) {
      console.log(err)
    })
  },

  queryLcjListByStatus ({ commit, state, getters }, datas) {
    datas.hryId = '10007952'
    return Services.queryLcjListByStatus(datas).then(function (res) {
      return res
    }).catch(function (err) {
      console.log(err)
    })
  }
}