import axios from 'axios'
const userService = 'http://10.251.12.212:7032'
const ossService = 'http://10.251.12.5:7015'
export default {
  getUserInvestInfo () {
    // return axios.post(userService + '/userFacade/getUserProperty', {userId:10007952})
    return new Promise(function (resolve, reject) {
      axios.post(userService + '/userFacade/getUserProperty', {userId:10007952}).then(function (res) {
        res.status === 200 ? resolve(res.data) : reject('错误:', res.status);
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  // 券数量统计
  getCouponAmount () {
    return new Promise(function (resolve, reject) {
      axios.post(ossService + '/couponFacade/getCouponAmount', {hryId:10007952}).then(function (res) {
        res.status === 200 ? resolve(res.data) : reject('错误:', res.status);
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  // 优惠券列表
  queryCouponList () {
    return new Promise(function (resolve, reject) {
      axios.post(ossService + '/couponFacade/queryCouponList', {hryId: 10007952, pageIndex: 1, pageSize: 10, state: 4}).then(function (res) {
        res.status === 200 ? resolve(res.data) : reject('错误:', res.status);
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  // 抵用金统计
  getUserLcjDetail () {
    return new Promise(function (resolve, reject) {
      axios.post(ossService + '/rewardsFacade/getUserLcjDetail', {hryId:10007952}).then(function (res) {
        res.status === 200 ? resolve(res.data) : reject('错误:', res.status);
      }).catch(function (err) {
        reject(err)
      })
    })
  }

}