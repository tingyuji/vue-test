import axios from 'axios'
const userService = 'http://10.252.12.212:7032'
const ossService = 'http://10.252.12.5:7015'
// hryId:10007952
export default {
  getUserInvestInfo (datas) {
    // return axios.post(userService + '/userFacade/getUserProperty', {userId:10007952})
    return new Promise(function (resolve, reject) {
      axios.post(userService + '/userFacade/getUserProperty', datas).then(function (res) {
        res.status === 200 ? resolve(res.data) : reject('错误:', res.status)
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  // 券数量统计
  getCouponAmount (datas) {
    return new Promise(function (resolve, reject) {
      axios.post(ossService + '/couponFacade/getCouponAmount', datas).then(function (res) {
        res.status === 200 ? resolve(res.data) : reject('错误:', res.status)
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  // 优惠券列表
  queryCouponList (datas) {
    return new Promise(function (resolve, reject) {
      console.log(datas)
      axios.post(ossService + '/couponFacade/queryCouponList', datas).then(function (res) {
        res.status === 200 ? resolve(res.data) : reject('错误:', res.status)
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  // 抵用金统计
  getUserLcjDetail () {
    return new Promise(function (resolve, reject) {
      axios.post(ossService + '/rewardsFacade/getUserLcjDetail', {hryId: 10009344}).then(function (res) {
        res.status === 200 ? resolve(res.data) : reject('错误:', res.status)
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  // 抵用金列表
  queryLcjListByStatus (datas) {
    return new Promise(function (resolve, reject) {
      console.log(datas)
      axios.post(ossService + '/rewardsFacade/queryLcjListByStatus', datas).then(function (res) {
        res.status === 200 ? resolve(res.data) : reject('错误:', res.status)
      }).catch(function (err) {
        reject(err)
      })
    })
  }

}