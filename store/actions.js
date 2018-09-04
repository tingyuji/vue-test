import Services from './services'
export default {
  async nuxtServerInit ({ commit, state }, { req, res }) {
    if (req.query.code) {
      // const wechatUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx2599e1d77e06e184&secret=33a66a8bf56386d607d92a7b941c5d42&code=' + req.query.code + '&grant_type=authorization_code'
      // const wechatInfo = await axios.get(wechatUrl)
      const wechatInfo = await Services.getWeChatOpenid(req.query.code)
      console.log('wechatInfo')
      console.log(wechatInfo.data)
      if (wechatInfo && wechatInfo.data && wechatInfo.data.openid) {
        var datas = {openId: wechatInfo.data.openid}
        const getUseridByopenid = await Services.getUserIdByOpenId(datas)
        console.log('getUseridByopenid.body')
        console.log(getUseridByopenid.body)
        if (getUseridByopenid && getUseridByopenid.body && getUseridByopenid.body.responseCode === 0) {
          commit('SET_USERID', getUseridByopenid.body.userId)
        } else if (getUseridByopenid && getUseridByopenid.body && getUseridByopenid.body.responseCode === 7999) {
          commit('SET_OPENID', wechatInfo.data.openid)
        } else {
          console.log(getUseridByopenid.body.responseMessage)
        }
      } else {
        console.log(wechatInfo.data || wechatInfo)
      }
    } else if (req.headers.cookie) {
      var cookie = req.headers.cookie
      var cookieObj = {}
      var cookieArr = []
      var key = ''
      var value = ''
      cookie = cookie.split(';')
      for (let i = 0; i < cookie.length; i++) {
        cookieArr = cookie[i].trim().split('=')
        key = cookieArr[0]
        value = cookieArr[1]
        cookieObj[key] = value
      }
      console.log(cookieObj)
      if (cookieObj['com.vfsso.cas.token']) {
        var token = cookieObj['com.vfsso.cas.token']
        var userInfo = await Services.getUserIdBytoken(token)
        console.log(userInfo.body)
        if (userInfo && userInfo.body && userInfo.body.userDto && userInfo.body.userDto.userId) {
          commit('SET_USERID', userInfo.body.userDto.userId)
          console.log(state.userInfo)
        }
      }
    }
  },

  async getUserIdAndBindOpenid ({ commit, state }, token) {
    var result = {}
    var getUserInfo = await Services.getUserIdBytoken(token)
    console.log(getUserInfo.body)
    if (getUserInfo && getUserInfo.body && getUserInfo.body.userDto && getUserInfo.body.userDto.userId) {
      commit('SET_USERID', getUserInfo.body.userDto.userId)
      if (state.openId) {
        var datas = {
          userId: getUserInfo.body.userDto.userId,
          openId: state.openId
        }
        var useridBindOpenid = await Services.getUserIdAndBindOpenid(datas)
        console.log('useridBindOpenid')
        console.log(useridBindOpenid.body)
        if (useridBindOpenid && useridBindOpenid.body && useridBindOpenid.body.responseCode === 0) {
          result = {
            responseCode: 0,
            responseMessage: '绑定成功'
          }
        } else {
          result = {
            responseCode: 0,
            responseMessage: '获取用户信息成功'
          }
        }
      } else {
        result = {
          responseCode: 0,
          responseMessage: '获取用户信息成功'
        }
      }
    } else {
      result = getUserInfo.body
    }
    return result
  },

  getPersonalRealName ({ commit, state }) {
    var datas = { userId: state.userInfo.userId }
    var realName = ''
    return Services.getPersonalRealName(datas).then(function (getPersonalRealName) {
      if (getPersonalRealName && getPersonalRealName.body && getPersonalRealName.body.personalRealNameDto && getPersonalRealName.body.personalRealNameDto.realName) {
        realName = getPersonalRealName.body.personalRealNameDto.realName
      }
      commit('SET_REALNAME', realName)
      return null
    })
  },

  getUserInvestInfo ({ commit, state }) {
    var datas = {
      userId: state.userInfo.userId
    }
    console.log(datas)
    var investInfo = {}
    return Services.getUserInvestInfo(datas).then(function (res) {
      if (res) {
        investInfo = {
          totalAsset: res.totalAsset,
          availBalance: res.availBalance,
          investingAmount: res.investingAmount,
          investmentAmount: res.investmentAmount,
          investmentProfit: res.investmentProfit,
          collectProfit: res.collectProfit
        }
      }
      commit('SET_USERINVEST', investInfo)
      return investInfo
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
