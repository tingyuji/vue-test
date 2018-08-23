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

  queryCouponList () {
    return Services.queryCouponList().then(function (res) {
      return res
    }).catch(function (err) {
      console.log(err)
    })
  }
}