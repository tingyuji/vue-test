const { Router } = require('express')

const router = Router()
const axios = require('axios')

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

router.get('/users/someinport', function (req, res, next) {
  res.json('hahah')
})

// router.get('/wechatcode', function (req, res, next) {
//   const redirectUrl = 'http://2v19007a54.iok.la/login'
//   // Promise.resolve(
//   //   redirectUrl
//   //   // axios.get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2599e1d77e06e184&redirect_uri=' + redirectUrl + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect')
//   // ).then(function (res) {
//   //   console.log(res)
//   //   res.json(res)
//   // })
//   // console.log(axios)
//   res.json(redirectUrl)
// })

module.exports = router
