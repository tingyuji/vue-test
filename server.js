const { Nuxt, Builder } = require('nuxt')
// const bodyParser = require('body-parser')
const app = require('express')()

// Body parser，用来封装 req.body
// app.use(bodyParser.json())

// 我们用这些选项初始化 Nuxt.js：
const isProd = process.env.NODE_ENV === 'production'
const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)
// 生产模式不需要 build
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

// load('config', {cwd: path.join(__dirname, './')}).into(app)
// for (var environment in app.config) {
//   if (environment === app.get('env')) {
//     global.config = {}
//     for (var key in app.config[environment]) {
//       global.config[key] = app.config[environment][key]
//     }
//   }
// }

app.listen(3000)
console.log('Server is listening on http://localhost:3000')
