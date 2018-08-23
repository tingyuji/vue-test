<template>
    <div class="preferential-container">
        <div class="top-con">
            <ul class="top-con-ul">
                <li class="preferential-type-li" :class="{active:type==='yhq'}" @click="toggleType('yhq')">优惠券</li>
                <li class="preferential-type-li" :class="{active:type==='dyj'}" @click="toggleType('dyj')">抵用金</li>
            </ul>
            <ul class="coupon-tab-ul clearfix">
                <li
                   v-for="(item,index) in tabItems"
                   :key="index" class="tab-li"
                   :class="{active: couponstate===item.tabname}"
                   @click="couponstate = item.tabname">
                    {{item.name}}
                    <i></i>
                </li>
            </ul>
        </div>
        <div class="coupon-wrap">
            <ul v-if="couponList.length">
                <li v-for="(item,index) in couponList" :key="index">
                    <div class="coupon-detail" :class="couponstate">
                        <div class="overdue" v-if="item.overdue"></div>
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
                                <p class="limitmoney" v-if="Number(item.minPayment)">满{{item.minPayment}}元可用</p>
                                <p class="limitdetail" v-if="item.limittime || item.limittypes">{{item.limittime + item.limittypes}}</p>
                            </div>
                        </div>
                        <p class="cut-off-rule"><i class="left-circular"></i><i class="right-circular"></i></p>
                        <p class="bottomdetail clearfix">
                            <span class="releasetime">{{item.activateDate + '发放'}}</span>
                            <span class="explain">{{item.couponName}}</span>
                        </p>
                        <p class="hasused-detail" v-if="couponstate === 'hasused'">
                            <span class="usedtime">{{'使用时间' + item.usageTime}}</span>
                            <span class="purpose">{{item.usageComments}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>


    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import fotmatMoney from '~/helper/formatMoney.js'
  import conv from '~/helper/conv'
  export default {
    head () {
      return {
        title: '我的优惠'
      }
    },
    data () {
      return {
        type: 'yhq',
        couponstate: 'canuse',
        totalCount: 0,
        tabItems: [
          {
            name: '可使用(3)',
            tabname: 'canuse'
          },
          {
            name: '已过期(5)',
            tabname: 'expired'
          },
          {
            name: '已使用(2)',
            tabname: 'hasused'
          }
        ],
        couponList:[
          // {
          //   type: 1,
          //   coupontype: '抵扣券',
          //   money: '30.00',
          //   formatmoney: {
          //     integermoney: '30',
          //     decimalmoney: '.00'
          //   },
          //   time: '2018-08-29',
          //   limitmoney: '6',
          //   limitdetail: '限180天及以上小金链、优易计划、融 融发、海赚',
          //   overdue: true,
          //   releasetime: '2018-01-01',
          //   explain: '夏日优易专享30元抵扣券',
          //   hasused: true, //已过期
          //   usedtime: '2018-08-06',
          //   purpose: '购买小金链3244'
          // },
          // {
          //   type: 2, // 加息券
          //   coupontype: '加息券',
          //   interestrate: '1.58',
          //   time: '2018-08-29',
          //   limitdetail: '限180天及以上小金链、优易计划、融 融发、海赚',
          //   overdue: false,
          //   releasetime: '2018-01-01',
          //   explain: '夏日优易专享30元抵扣券'
          // }
        ]
      }
    },
    computed: {
      ...mapState([])
    },
    methods: {
      toggleType (type) {
        this.type = type
        if (type === 'yhq') {
          this.getCouponAmount()
        } else {
          this.getUserLcjDetail()
        }
      },
      getCouponAmount () {
        this.$store.dispatch('getCouponAmount').then((res) => {
          console.log(res)
          if (res.responseCode === 0) {
            this.tabItems[0].name = '可使用(' + res.availableAmount + ')'
            this.tabItems[1].name = '已过期(' + res.expiredAmount  + ')'
            this.tabItems[2].name = '已使用(' + res.usedAmount  + ')'
          }
        })
      },
      getUserLcjDetail () {
        this.$store.dispatch('getUserLcjDetail').then((res) => {
          console.log(res)
          if (res.responseCode === 0) {
            this.tabItems[0].name = '可使用(' + res.unusedLcjCount  + ')'
            this.tabItems[1].name = '已过期(' + res.expiredLcjCount   + ')'
            this.tabItems[2].name = '已使用(' + res.usedLcjCount   + ')'
          }
        })
      }
    },
    beforeCreate () {
      this.$store.dispatch('getCouponAmount').then((res) => {
        console.log(res)
        if (res.responseCode === 0) {
          this.tabItems[0].name = '可使用(' + res.availableAmount + ')'
          this.tabItems[1].name = '已过期(' + res.expiredAmount  + ')'
          this.tabItems[2].name = '已使用(' + res.usedAmount  + ')'
        }
      })

      this.$store.dispatch('queryCouponList').then((res) => {
        console.log(res.pagination.resultList)
        if (res.responseCode === 0 && res.pagination) {
          this.totalCount = res.pagination.totalCount
          if (res.pagination.resultList && res.pagination.resultList.length > 0) {
            res.pagination.resultList.forEach(item => {
              item.formatCouponValue = {
                integermoney: parseInt(item.couponValue / 100),
                decimalmoney: '.' + ((item.couponValue % 100) < 10 ? '0' : '') + (item.couponValue % 100)
              }
              item.minPayment = fotmatMoney.formatCount(parseInt(item.minPayment / 100))
              item.limittime = Number(item.minProductMaturity) ? '限' + item.minProductMaturity + '天及以上' : ''
              item.limittypes = item.productTypes ? item.productTypes : ''
              item.usageTime = (item.usageTime) ? conv.toDateStr(item.usageTime, 'yyyy-MM-dd') : ''
            })
          }
          this.couponList = res.pagination.resultList

        }
      })
    }
  }
</script>

<style scoped lang="scss">
    .top-con{
        background: #FFFFFF;
        height: 5.25rem;
        .top-con-ul{
            padding: 0.75rem 0 0.5rem;
            text-align: center;
            .preferential-type-li{
                display: inline-block;
                vertical-align: middle;
                box-sizing: border-box;
                width: 5rem;
                height: 1.5rem;
                line-height: 1.5rem;
                color: #266DFC;
                font-size: 0.7rem;
                border: 1px solid #266DFC;
                &.active{
                    background: #266DFC;
                    color: #FFFFFF;
                }
            }
        }
        .coupon-tab-ul{
            padding: 0 0.75rem;
            .tab-li{
                width: 33.33%;
                height: 2.25rem;
                line-height: 2.25rem;
                text-align: center;
                position: relative;
                float: left;
                font-size: 0.7rem;
                color: #666666;
                &>i{
                    position: absolute;
                    width: 15px;
                    height: 2px;
                    display: block;
                    bottom: 0;
                    left: 50%;
                    margin-left: -7.5px;
                }
                &.active{
                    color: #4C87FC;
                    &>i{
                        background: #4C87FC;
                    }
                }
            }
        }
    }
    .coupon-wrap{
        padding: 0.5rem 0.75rem 0.9rem;
        .coupon-detail{
            margin-bottom: 0.5rem;
            box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.06);
            background: #ffffff;
            box-sizing: border-box;
            padding: 1.15rem 0 0;
            overflow: hidden;
            position: relative;
            .left{
                width: 31.8%;
                text-align: center;
                height: 2.25rem;
                border-right: 1px dotted #DDDDDD;
                color: #FF6633;
                box-sizing: border-box;
                display: inline-block;
                vertical-align: middle;
                .money{
                    height: 1.4rem;
                    line-height: 1.4rem;
                    margin-bottom: 0.2rem;
                    font-weight: bold;
                    i{
                        font-size: 0.7rem;
                        font-style: normal;
                        position: relative;
                        top: -0.35rem;
                    }
                    .integermoney{
                        font-size: 1.4rem;
                    }
                    .decimalmoney{
                        font-size: 0.7rem;
                    }
                    &.rate{
                        color: #FF9500;
                        i{
                            top: -0.2rem;
                        }
                    }
                }
                .coupontype{
                    font-size: 0.5rem;
                    color: #666666;
                }
            }
            .right{
                width: 68.2%;
                box-sizing: border-box;
                padding: 0 0.9rem;
                display: inline-block;
                vertical-align: middle;
                .time{
                    font-size: 0.7rem;
                    font-weight: bold;
                    color: #282828;
                    line-height: 0.7rem;
                    margin-bottom: 0.4rem;
                }
                .limitmoney,.limitdetail{
                    font-size: 0.6rem;
                    line-height: 0.8rem;
                    color: #666666;
                }
            }
            .cut-off-rule{
                margin: 1rem 0 0.5rem;
                border-bottom: 1px dotted #DDDDDD;
                background-size: 50%;
                position: relative;
                .left-circular,.right-circular{
                    width: 0.7rem;
                    height: 0.7rem;
                    position: absolute;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    top: 50%;
                    margin-top: -0.35rem;
                    background: #f1f1f1;
                }
                .left-circular{
                    left: -0.35rem;
                }
                .right-circular{
                    right: -0.35rem;
                }
            }
            .bottomdetail{
                padding:0 0.8rem 0.5rem;
                line-height: 0.8rem;
                color: #999999;
                font-size: 0.6rem;
                .releasetime{
                    float: left;
                }
                .explain{
                    float: right;
                }
            }
            .hasused-detail{
                height: 1rem;
                background: #CCCCCC;
                padding: 0 0.75rem;
                color: #ffffff;
                line-height: 1rem;
                font-size: 0.5rem;
                .usedtime{
                    float: left;
                }
                .purpose{
                    float: right;
                }
            }
            .overdue{
                position: absolute;
                right: -0.6rem;
                top: -0.55rem;
                height: 4rem;
                width: 4rem;
                background: url("~/assets/img/overdue.png") no-repeat center;
                background-size: cover;
            }
            &.expired,&.hasused{
                .left{
                    color: #666666;
                    .coupontype{
                        color: #999999;
                    }
                    .money.rate{
                        color: #666666;
                    }
                }
                .right{
                    .time{
                        color: #666666;
                    }
                    .limitmoney,.limitdetail{
                        color: #999999;
                    }
                }
            }
        }
    }
</style>