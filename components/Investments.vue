<template>
    <div class="myinvest-top">
        <div class="investments-about">
            <p class="title">待收本金(元)</p>
            <p class="money import">{{formatMoney(investAmount)}}</p>
            <p class="title">冻结金额(元)</p>
            <p class="money">{{formatMoney(userInvest.investingAmount)}}</p>
        </div>
        <div class="profit clearfix">
            <div class="profit-con left"><p class="profit-about">+{{formatMoney(userInvest.collectProfit)}}</p><p class="detail">待收收益</p></div>
            <div class="profit-con"><p class="profit-about">+{{formatMoney(userInvest.investmentProfit)}}</p><p class="detail">累计收益</p></div>
        </div>
    </div>
</template>
<script>
    import formatMoney from '../helper/formatMoney.js'
    export default {
      name: 'Investments',
      props: {
        userInvest: {
          type: Object,
          required: true
        }
      },
      computed: {
        investAmount () {
          return Number(this.userInvest.investmentAmount) - Number(this.userInvest.investingAmount)
        }
      },
      methods: {
        formatMoney (money) {
          if (money) {
            return formatMoney.formatMoney(money)
          }
          return money
        }
      }
    }
</script>
<!--<style scoped lang='sass' src='~/assets/sass/coupon.sass'></style>-->
<style scoped lang='sass' src="~/assets/sass/investments.sass"></style>
