<template>
    <div class="login-input-container">
        <div class="input-cont"><div class="input-cont-wrap input-cont-wrap-bb"><label for="loginname" class="label">账户名</label><input id="loginname" v-model="loginname" placeholder="请输入海融易账户名" /></div></div>
        <div class="input-cont"><div class="input-cont-wrap"><label for="password" class="label">密码</label><input id="password" v-model="password" placeholder="请输入登录密码" :type="open ? 'text':'password'" /><i class="close" :class="{open: open}" @click="passwordChange"></i></div></div>
        <div class="button-login" :class="{cansubmit: cansubmit}" @click="submitLogin">登录</div>
        <div class="forgetpassword">
            <nuxt-link to="/forgetpassword">
                忘记密码?
            </nuxt-link>
        </div>

    </div>
</template>
<script>
    import axios from 'axios'
    import { Toast, Indicator } from 'mint-ui'
    export default {
      data () {
        return {
          loginname: '',
          password: '',
          open: false
        }
      },
      computed: {
        cansubmit () {
          return (this.loginname && this.password)
        }
      },
      methods: {
        passwordChange () {
          this.open = !this.open
        },
        submitLogin () {
          if (this.cansubmit) {
            Indicator.open()
            var datas = {
              loginName: this.loginname,
              unsafePassword: this.password,
              key: 'forlogin'
            }
            // this.$store.dispatch('LOGIN', datas)
            axios.post('/api/login', datas).then((res) => {
              console.log(res.data)
              if (res && res.data && res.data.responseCode !== 0) {
                Indicator.close()
                Toast(res.data.responseMessage || '异常状态，请稍后再试！')
              } else {
                this.$store.dispatch('getUserIdAndBindOpenid', res.data.token).then((resp) => {
                  Indicator.close()
                  console.log(resp)
                  if (resp && resp.responseCode === 0) {
                    if (this.$route.query && this.$route.query.returnUrl) {
                      this.$router.push({
                        path: this.$route.query.returnUrl
                      })
                    } else {
                      this.$router.push({
                        path: '/worth'
                      })
                    }
                  } else {
                    Toast(resp.responseMessage || '获取用户信息异常')
                  }
                })
              }
            })
          } else {
            console.log("can't submit")
            return false
          }
        }
      }
    }
</script>
<style scoped lang='sass' src="~/assets/sass/login.sass"></style>