import request from 'superagent'
import axios from 'axios'
import globalConfig from '../server/config'
const userService = 'http://10.252.12.212:7032'
const ossService = 'http://10.252.12.5:7015'
const memberService = 'http://10.252.12.103:7011'
// hryId:10007952
export default {
  getWeChatOpenid (code) {
    const url = `${globalConfig.weChat.accessToken}appid=${globalConfig.weChat.appID}&secret=${globalConfig.weChat.appSecret}&code=${code}&grant_type=authorization_code`
    // const wechatUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx2599e1d77e06e184&secret=33a66a8bf56386d607d92a7b941c5d42&code=' + req.query.code + '&grant_type=authorization_code'
    return axios.get(url)
  },

  getUserIdByOpenId (datas) {
    return request.post(globalConfig.userServiceDev.url + '/weChatFacade/getUserIdByOpenId').send(datas)
  },

  getUserIdBytoken (token) {
    return request.post(globalConfig.userService.url + '/loginFacade/getUserInfoByToken').send({token: token})
  },

  getUserIdAndBindOpenid (datas) {
    return request.post(globalConfig.userServiceDev.url + '/weChatFacade/bindOpenIdAndUserId').send(datas)
  },

  getPersonalRealName (datas) {
    return request.post(globalConfig.userService.url + '/userFacade/getPersonalRealName').send(datas)
  },

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
      axios.post(userService + '/couponFacade/queryCouponList', datas).then(function (res) {
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
  },

  // 登陆
  login (datas) {
    return axios.post(memberService + '/customerFacade/login', datas)
  },

  // 根据token获取用户信息
  getUserInfoByToken (datas) {
    return axios.post(userService + '/customerFacade/login', datas)
  }
}
