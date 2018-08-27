<template>
    <ul v-if="couponList.length">
        <li v-for="(item,index) in couponList" :key="index">
            <div class="coupon-detail lcj-detail" :class="'lcj-state-' + couponstate">
                <div class="clearfix">
                    <div class="left">
                        <p class="money">
                            <i>￥</i>
                            <span class="integermoney">{{item.formatCouponValue.integermoney}}</span>
                            <span class="decimalmoney">{{item.formatCouponValue.decimalmoney}}</span>
                        </p>
                    </div>
                    <div class="right">
                        <p class="time">有效期至{{item.expiredTime }}</p>
                        <p class="limitmoney">{{item.comments}}</p>
                    </div>
                </div>
                <p class="cut-off-rule"><i class="left-circular"></i><i class="right-circular"></i></p>
                <p class="bottomdetail clearfix">
                    <span class="releasetime">{{item.givenTime + '发放'}}</span>
                </p>
                <p class="hasused-detail" v-if="couponstate === 2">
                    <span class="usedtime">{{item.useComment }}</span>
                    <span class="purpose">{{'使用时间' + item.useTime}}</span>
                </p>
            </div>
        </li>
    </ul>
    <div class="hasnothing" v-else>
        <img src="~/assets/img/nothing.png" />
        <p class="hasnothing-tips">暂无抵用金</p>
    </div>
</template>
<script>
  export default {
    name: 'LcjCom',
    props: {
      totalCount: {
        type: Number
      },
      couponList: {
        type: Array,
        default: () => []
      },
      couponstate: {
        type: Number
      }
    }
  }
</script>

<style scoped lang='sass' src='~/assets/sass/coupon.sass'></style>