const express = require('express')
var router = express.Router()
const request = require('superagent')
const config = require('../config/index')
var reqData = require('../utils/reqData')

router.post('/login', function (req, res) {
  var datas = req.body
  datas.verifyCode = 'Ed%8r5'
  datas.clientIp = reqData.getClientIp(req) || '127.0.0.0'
  console.log(datas)
  request.post(config.memberService.url + '/customerFacade/login')
    .send(datas).then(function (resp) {
      console.log(resp.body)
      if (resp.body.token) {
        var domain = (req.hostname.indexOf('hairongyi.com') < 0) ? req.hostname : '.hairongyi.com'
        res.cookie('com.vfsso.cas.token', resp.body.token, {domain: domain})
        resp.body.encryptMemberId = null
        // request.post(config.userService.url + '/loginFacade/getUserInfoByToken').send({ token: resp.body.token })
        //   .then(function (res) {
        //     console.log(res.body)
        //   })
      }
      res.send(resp.body)
    }).catch(function (err) {
      console.log(err)
      // return null;
      res.send({
        responseCode: -1,
        responseMessage: '接口异常，请稍后重试'
      })
    })
})

module.exports = router
