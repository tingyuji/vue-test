export default {
  SET_USER: (state, user) => {
    state.user = user
  },

  SET_USERINVEST: (state, userInvest) => {
    state.userInvest = userInvest
  },

  SET_USERID: (state, userId) => {
    state.userInfo.userId = userId
  },

  SET_OPENID: (state, openId) => {
    state.openId = openId
  },

  SET_REALNAME: (state, realName) => {
    state.userInfo.realName = realName
  }
}
