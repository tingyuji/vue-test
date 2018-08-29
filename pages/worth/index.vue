<template>
    <div class="hrywechat-container">
        <div class="worth-container">
            <div class="worth-navbar">
                <div class="back-icon"></div>
                <span>{{realNameHide(loginName)}}</span>
                <div class="uer-loginout">退出</div>
            </div>
            <div class="worth-about">
                <p class="title">总资产(元)</p>
                <p class="money">{{isOpen ? formatMoney((userInvest && userInvest.totalAsset) ? userInvest.totalAsset : 0) : '日进斗金'}}<i class="money-desensitization" :class="{open:isOpen}"
                                                                    @click="toggleOpen"></i></p>
                <p class="decript">不含快捷通账户余额</p>
            </div>
        </div>
        <ul class="my-worth-detail">
            <li v-for="(item,index) in items" :key="index">
                <nuxt-link :to="item.href" v-if="item.href">
                    <div :class="item.class">
                        <img :src="item.icon"/>
                        <span class="title">{{item.title}}</span>
                        <span class="total" v-if="Number(item.total)">{{!isOpen ? '****' : formatMoney(item.total) + '元'}}</span>
                    </div>
                </nuxt-link>
                <div :class="item.class" v-else>
                    <img :src="item.icon"/>
                    <span class="title">{{item.title}}</span>
                    <span class="total" v-if="Number(item.total)">{{!isOpen ? '****' : formatMoney(item.total) + '元'}}</span>
                </div>
            </li>
        </ul>
    </div>

</template>

<script>
  import {mapState} from 'vuex'
  import formatMoney from '~/helper/formatMoney.js'

  export default {
    async fetch ({ store, route }) {
      if (!store.state.userInvest.totalAsset) {
        await store.dispatch('getUserInvestInfo')
      }
    },
    head () {
      return {
        title: '我的资产'
      }
    },
    data () {
      return {
        isOpen: true,
        items: [
          {
            icon: require('~/assets/img/balance.png'),
            title: '可用余额',
            total: (this.$store.state.userInvest && this.$store.state.userInvest.availBalance) ? this.$store.state.userInvest.availBalance : 0,
            class: 'li_wrap balance'
          },
          {
            icon: require('~/assets/img/investments.png'),
            title: '我的出借',
            total: (this.$store.state.userInvest && this.$store.state.userInvest.investingAmount) ? this.$store.state.userInvest.investingAmount : 0,
            href: '/myinvest',
            class: 'li_wrap investments haslink'
          },
          {
            icon: require('~/assets/img/preferential.png'),
            title: '我的优惠',
            href: '/preferential',
            class: 'li_wrap haslink'
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'loginName',
        'userInvest'
      ])
    },
    methods: {
      toggleOpen () {
        this.isOpen = !this.isOpen
      },
      realNameHide (realName) {
        if (realName) {
          realName = '*' + realName.substring(realName.length - 1)
        }
        return realName
      },
      formatMoney (money) {
        if (money) {
          return formatMoney.formatMoney(money)
        }
        return money
      }
    }
  }
</script>

<style scoped lang="scss">
    .worth-container {
        background: #266DFC;
        height: 9.2rem;
        text-align: center;
        color: #ffffff;
        margin-bottom: 0.5rem;
        .worth-navbar {
            height: 2.2rem;
            line-height: 2.2rem;
            position: relative;
            font-size: 0.9rem;
            .back-icon {
                position: absolute;
                width: 2.5rem;
                height: 2.2rem;
                background: url("~/assets/img/center_back.png") no-repeat center;
                background-size: 9px 14px;
                left: 0;
                top: 0;
            }
            .uer-loginout {
                position: absolute;
                width: 3.4rem;
                right: 0;
                top: 0;
                font-size: 0.7rem;
            }
        }
        .worth-about {
            .title {
                font-size: 0.6rem;
                line-height: 0.825rem;
                padding: 0.95rem 0 0.5rem;
            }
            .money {
                display: inline-block;
                height: 2rem;
                line-height: 2rem;
                position: relative;
                font-size: 1.7rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
                .money-desensitization {
                    position: absolute;
                    width: 1rem;
                    height: 1rem;
                    right: -1.5rem;
                    top: 0.5rem;
                    background: url("~/assets/img/close.png") no-repeat center;
                    background-size: 16px 16px;
                }
                .open {
                    background: url("~/assets/img/open.png") no-repeat center;
                    background-size: 16px 16px;
                }
            }
        }
    }

    .my-worth-detail {
        & > li {
            background: #FFFFFF;
            padding-left: 0.8rem;
            .li_wrap {
                display: block;
                height: 2.5rem;
                line-height: 2.5rem;
                text-align: left;
                position: relative;
                padding-left: 1.7rem;
                font-size: 0.8rem;
                & > img {
                    display: block;
                    position: absolute;
                    width: 1rem;
                    top: 0.72rem;
                    left: 0;
                }
                .title {
                    color: #282828;
                }
                .total {
                    color: #666666;
                    display: block;
                    position: absolute;
                    right: 1.5rem;
                    top: 0;
                    text-align: right;
                }
                &.haslink {
                    background: url("~/assets/img/worth_li_bg.png") no-repeat 97% center;
                    background-size: 14px 14px;
                }
                &.balance {
                    margin-bottom: 0.5rem;
                }
                &.investments {
                    border-bottom: 1px solid #EFEFEF;
                }
            }
        }
    }

</style>
