<template>
    <ul v-if="couponList.length">
        <li v-for="(item,index) in couponList" :key="index">
            <div class="coupon-detail" :class="'coupon-state-' + couponstate">
                <div class="overdue" v-if="item.overduetime <= 7 && couponstate === 2"></div>
                <div class="clearfix">
                    <div class="left">
                        <p class="money" v-if="item.couponKind === 1">
                            <i>￥</i>
                            <span class="integermoney">{{item.formatCouponValue.integermoney}}</span>
                            <span class="decimalmoney">{{item.formatCouponValue.decimalmoney}}</span>
                        </p>
                        <p class="money rate" v-if="item.couponKind === 2">
                            <i>+</i>
                            <span class="integermoney">{{item.subsidyRate }}</span>
                            <span class="decimalmoney">%</span>
                        </p>
                        <p class="coupontype">{{item.couponKind === 1 ? '抵扣券' : '加息券'}}</p>
                    </div>
                    <div class="right">
                        <p class="time">有效期至{{item.expiredDate}}</p>
                        <p class="limitmoney" v-if="item.minPayment !== '0'">满{{item.minPayment}}元可用</p>
                        <p class="limitdetail" v-if="item.limittime || item.limittypes">{{item.limittime + item.limittypes}}</p>
                    </div>
                </div>
                <p class="cut-off-rule"><i class="left-circular"></i><i class="right-circular"></i></p>
                <p class="bottomdetail clearfix">
                    <span class="releasetime">{{item.activateDate + '发放'}}</span>
                    <span class="explain">{{item.couponName}}</span>
                </p>
                <p class="hasused-detail" v-if="couponstate === 3">
                    <span class="usedtime">{{'使用时间' + item.usageTime}}</span>
                    <span class="purpose">{{item.usageComments}}</span>
                </p>
            </div>
        </li>
    </ul>
    <div class="hasnothing" v-else>
        <img src="~/assets/img/nothing.png" />
        <p class="hasnothing-tips">暂无优惠券</p>
    </div>
</template>
<script>
    export default {
      name: 'Coupon',
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