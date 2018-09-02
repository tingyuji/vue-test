module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'hryWecart',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: '/js/basefont.js'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/static/css/main.css','mint-ui/lib/style.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'mint-ui'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  },
  plugins: [
    { src: '~plugins/mint-ui.js', ssr: true }
  ],
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
