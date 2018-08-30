<template>
    <div class="login-container">
        <p class="login-title">- 绑定海融易账号 -</p>
        <img src="~/assets/img/bound.png" alt="" />
        <p class="detail">登录后，您的海融易账号将关联至微信账号</p>
    </div>
</template>
<script>
  export default {
    async asyncData ({store}) {
      store.dispatch('getWeChatCode')
    },
    head: {
      title: '登录海融易'
    }
  }
</script>
<style>

</style>