<template>
    <div class="login-container">
        <div class="login-top">
            <p class="login-title">- 绑定海融易账号 -</p>
            <img src="~/assets/img/bound.png" alt="" class="logo" />
            <p class="detail">登录后，您的海融易账号将关联至微信账号</p>
        </div>
        <LoginInput />
    </div>
</template>
<script>
  import axios from '~/plugins/axios'
  import LoginInput from '../../components/LoginInput.vue'
  export default {
    async asyncData () {
      let { data } = await axios.get('/api/users/someinport')
      console.log(data)
      return { users: data }
    },
    head () {
      return {
        title: '登录海融易'
      }
    },
    components: {
      LoginInput
    }
  }
</script>
<style scoped lang="sass">
    .login-container
        .login-top
            height: 9.2rem
            text-align: center
            background: url("~/assets/img/login-bg.png") no-repeat center bottom
            background-size: cover
            .login-title
                font-size: 0.8rem
                color: #282828
                line-height: 1.1rem
                padding: 1rem 0 1.4rem
            .logo
                display: block
                margin: 0 auto
                width: 50%
                max-width: 100%
            .detail
                font-size: 0.65rem
                color: #999999
                line-height: 0.925rem
                padding: 0.825rem 0 1.15rem
</style>