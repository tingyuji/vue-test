import axios from '~/plugins/axios'
import Services from './services'
export default {
  nuxtServerInit ({ commit, state }, { req }) {
    state.IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
  },

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
  },

  LOGIN ({commit, state}, datas) {
    datas.verifyCode = 'Ed%8r5'
    datas.clientIp = state.IP || '127.0.0.0'
    console.log(datas)
    console.log(state)
    var result = {}
    return Services.login(datas).then(function (res) {
      console.log('++++login res++++')
      console.log(res)
      if (res && res.data && res.data.responseCode === 0) {
        return Services.getUserInfoByToken(res.data.token).then(function (res) {
          return res
        })
      } else {
        result = res.data
        result.success = 0
        return result
      }
    })
  }

  // async getWeChatCode ({store}) {
  //   const redirectUrl = 'http%3a%2f%2f2v19007a54.iok.la%2flogin'
  //   const weixinurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2599e1d77e06e184&redirect_uri=' + redirectUrl + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
  //   const wechatdata = await axios.get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2599e1d77e06e184&redirect_uri=' + redirectUrl + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect')
  //   console.log('+++wechatdata')
  //   console.log(weixinurl)
  //   console.log(wechatdata)
  // }
}
