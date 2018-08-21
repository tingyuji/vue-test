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
            <ul>
                <li v-for="(item,index) in couponList" :key="index">
                    <div class="coupon-detail" :class="couponstate">
                        <div class="overdue" v-if="item.overdue"></div>
                        <div class="clearfix">
                            <div class="left">
                                <p class="money" v-if="item.type === 1">
                                    <i>￥</i>
                                    <span class="integermoney">{{item.formatmoney.integermoney}}</span>
                                    <span class="decimalmoney">{{item.formatmoney.decimalmoney}}</span>
                                </p>
                                <p class="money rate" v-if="item.type === 2">
                                    <i>+</i>
                                    <span class="integermoney">{{item.interestrate}}</span>
                                    <span class="decimalmoney">%</span>
                                </p>
                                <p class="coupontype">{{item.coupontype}}</p>
                            </div>
                            <div class="right">
                                <p class="time">有效期至{{item.time}}</p>
                                <p class="limitmoney" v-if="item.limitmoney">满{{item.limitmoney}}元可用</p>
                                <p class="limitdetail">{{item.limitdetail}}</p>
                            </div>
                        </div>
                        <p class="cut-off-rule"><i class="left-circular"></i><i class="right-circular"></i></p>
                        <p class="bottomdetail clearfix">
                        <span class="releasetime">{{item.releasetime}}</span>
                        <span class="explain">{{item.explain}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>


    </div>
</template>

<script>
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
          {
            type: 1,
            coupontype: '抵扣券',
            money: '30.00',
            formatmoney: {
              integermoney: '30',
              decimalmoney: '.00'
            },
            time: '2018-08-29',
            limitmoney: '6',
            limitdetail: '限180天及以上小金链、优易计划、融 融发、海赚',
            overdue: true,
            releasetime: '2018-01-01',
            explain: '夏日优易专享30元抵扣券'
          },
          {
            type: 2, // 加息券
            coupontype: '加息券',
            interestrate: '1.58',
            time: '2018-08-29',
            limitdetail: '限180天及以上小金链、优易计划、融 融发、海赚',
            overdue: false,
            releasetime: '2018-01-01',
            explain: '夏日优易专享30元抵扣券'
          }
        ]
      }
    },
    methods: {
      toggleType (type) {
        this.type = type
      }
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
                float: left;
                box-sizing: border-box;
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
                float: left;
                box-sizing: border-box;
                padding: 0 0.9rem;
                .time{
                    font-size: 0.7rem;
                    font-weight: bold;
                    color: #282828;
                    line-height: 0.7rem;
                    position: relative;
                    top: -0.4rem;
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