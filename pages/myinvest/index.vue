<template>
    <div class="myinvest-container">
        <Investments :userInvest="$store.state.userInvest" />
    </div>
</template>
<script>
    import Investments from '../../components/investments'
    export default {
      async fetch ({ store, route }) {
        console.log(store.state.userInvest)
        if (!store.state.userInvest.totalAsset) {
          await store.dispatch('getUserInvestInfo')
        }
        console.log(store.state.userInvest)
      },
      head () {
        return {
          title: '我的出借'
        }
      },
      components: {
        Investments
      }
    }
</script>
<style>

</style>