const config = {
  development: {
    'memberService': {'url': 'http://10.252.12.103:7011'},
    'userService': {'url': 'http://10.252.12.212:7032'},
    'ossService': {'url': 'http://10.252.12.5:7015'},
    'userServiceDev': {'url': 'http://192.168.181.6:7032'},
    'weChat': {
      'accessToken': 'https://api.weixin.qq.com/sns/oauth2/access_token?',
      'appID': 'wx2599e1d77e06e184',
      'appSecret': '33a66a8bf56386d607d92a7b941c5d42',
      'token': 'hryWeChat'
    }
  },
  production: {
    'memberService': {'url': 'http://membercxf.hairongyi.com:7011'},
    'userService': {'url': 'http://user-cxf.hairongyi.local:7032'},
    'ossService': {'url': 'http://osscxf.hairongyi.com:7015'},
    'weChat': {
      'appID': 'wx2599e1d77e06e184',
      'appSecret': '33a66a8bf56386d607d92a7b941c5d42',
      'token': 'hryWeChat'
    }
  }
}
const ex = config[process.env.NODE_ENV ? process.env.NODE_ENV : 'development']
module.exports = ex
