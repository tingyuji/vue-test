<template>
    <div class="preferential-container" :class="{lcjcont: type==='dyj'}" v-scroll="onLoad">
        <div class="top-con">
            <ul class="top-con-ul">
                <li class="preferential-type-li" :class="{active:type==='yhq'}" @click="toggleType('yhq')">优惠券</li>
                <li class="preferential-type-li" :class="{active:type==='dyj'}" @click="toggleType('dyj')">抵用金</li>
            </ul>
            <div class="mylcj-wrap" v-if="type==='dyj'">
                <p class="mylcj-title">我的抵用金(元)</p>
                <p class="mylcj-tatal">{{unusedLcjValue}}</p>
            </div>
            <ul class="coupon-tab-ul clearfix" v-if="type==='yhq'">
                <li
                   v-for="(item,index) in yhqtabItems"
                   :key="index" class="tab-li"
                   :class="{active: couponstate===item.tabname}"
                   @click="tabChange(item.tabname)">
                    {{item.name}}
                    <i></i>
                </li>
            </ul>
            <ul class="coupon-tab-ul clearfix" v-if="type==='dyj'">
                <li
                   v-for="(item,index) in dyjtabItems"
                   :key="index" class="tab-li"
                   :class="{active: lcjstate===item.tabname}"
                   @click="lcjtabChange(item.tabname)">
                   {{item.name}}
                   <i></i>
                </li>
            </ul>
        </div>
        <div class="coupon-wrap">
            <Coupon :totalCount="yhqtotalCount" :couponList="couponList" :couponstate="couponstate" v-if="type==='yhq'" />
            <LcjCom :totalCount="lcjtotalCount" :couponList="lcjList" :couponstate="lcjstate" v-else />
        </div>
        <div v-if="isLoading">加载中...</div>
    </div>
</template>

<script>
  import fotmatMoney from '~/helper/formatMoney.js'
  import conv from '~/helper/conv'
  import Coupon from '../../components/Coupon.vue'
  import LcjCom from '../../components/LcjCom.vue'
  function couponListOperate (items) {
    items.forEach(item => {
      item.formatCouponValue = {
        integermoney: parseInt(item.couponValue / 100),
        decimalmoney: '.' + ((item.couponValue % 100) < 10 ? '0' : '') + (item.couponValue % 100)
      }
      item.minPayment = fotmatMoney.formatCount(parseInt(item.minPayment / 100))
      item.limittime = Number(item.minProductMaturity) ? '限' + item.minProductMaturity + '天及以上' : ''
      item.limittypes = item.productTypes ? item.productTypes : ''
      item.usageTime = (item.usageTime) ? conv.toDateStr(item.usageTime, 'yyyy-MM-dd') : ''
    })
    return items
  }
  function lcjListOperate (items) {
    items.forEach(item => {
      item.formatCouponValue = {
        integermoney: parseInt(item.lcjValue / 100),
        decimalmoney: '.' + ((item.lcjValue % 100) < 10 ? '0' : '') + (item.lcjValue % 100)
      }
      item.expiredTime = (item.expiredTime) ? conv.toDateStr(item.expiredTime, 'yyyy-MM-dd') : ''
      item.givenTime = (item.givenTime) ? conv.toDateStr(item.givenTime, 'yyyy-MM-dd') : ''
      item.limittypes = item.productTypes ? item.productTypes : ''
    })
    return items
  }
  export default {
    head () {
      return {
        title: '我的优惠'
      }
    },
    data () {
      return {
        type: 'yhq',
        unusedLcjValue: 0,
        couponstate: 2,
        lcjstate: 1,
        yhqtabItems: [
          {
            name: '可使用(3)',
            tabname: 2
          },
          {
            name: '已过期(5)',
            tabname: 4
          },
          {
            name: '已使用(2)',
            tabname: 3
          }
        ],
        dyjtabItems: [
          {
            name: '可使用(3)',
            tabname: 1
          },
          {
            name: '已过期(5)',
            tabname: 3
          },
          {
            name: '已使用(2)',
            tabname: 2
          }
        ],
        couponpageIndex: 1,
        lcjpageIndex: 1,
        pageSize: 5,
        isLoading: false,
        yhqtotalCount: 0,
        couponList: [],
        lcjtotalCount: 0,
        lcjList: []
      }
    },
    components: {
      Coupon,
      LcjCom
    },
    async asyncData (context) {
      var [ getCouponAmountRes, getUserLcjDetailRes, queryCouponListRes ] = await Promise.all([
        context.store.dispatch('getCouponAmount'),
        context.store.dispatch('getUserLcjDetail'),
        context.store.dispatch('queryCouponList', {pageIndex: 1, pageSize: 10, state: 2})
      ])
      var yhqtabItems = [
        {
          name: '可使用(3)',
          tabname: 2
        },
        {
          name: '已过期(5)',
          tabname: 4
        },
        {
          name: '已使用(2)',
          tabname: 3
        }
      ]
      var dyjtabItems = [
        {
          name: '可使用(3)',
          tabname: 1
        },
        {
          name: '已过期(5)',
          tabname: 3
        },
        {
          name: '已使用(2)',
          tabname: 2
        }
      ]
      var yhqtotalCount = 0
      var couponList = []
      var unusedLcjValue = 0
      if (getCouponAmountRes.responseCode === 0) {
        yhqtabItems[0].name = '可使用(' + getCouponAmountRes.availableAmount + ')'
        yhqtabItems[1].name = '已过期(' + getCouponAmountRes.expiredAmount + ')'
        yhqtabItems[2].name = '已使用(' + getCouponAmountRes.usedAmount + ')'
      }
      if (getUserLcjDetailRes.responseCode === 0) {
        dyjtabItems[0].name = '可使用(' + getUserLcjDetailRes.unusedLcjCount + ')'
        dyjtabItems[1].name = '已过期(' + getUserLcjDetailRes.expiredLcjCount + ')'
        dyjtabItems[2].name = '已使用(' + getUserLcjDetailRes.usedLcjCount + ')'
        unusedLcjValue = fotmatMoney.formatMoney(getUserLcjDetailRes.unusedLcjValue)
      }
      if (queryCouponListRes.responseCode === 0 && queryCouponListRes.pagination) {
        yhqtotalCount = queryCouponListRes.pagination.totalCount
        if (queryCouponListRes.pagination.resultList && queryCouponListRes.pagination.resultList.length > 0) {
          couponList = couponListOperate(queryCouponListRes.pagination.resultList)
        }
      }

      return {yhqtabItems: yhqtabItems, dyjtabItems: dyjtabItems, unusedLcjValue: unusedLcjValue, yhqtotalCount: yhqtotalCount, couponList: couponList}
    },
    directives: {
      scroll: {
        bind (el, binding) {
          window.addEventListener('scroll', () => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
              let onLoad = binding.value
              onLoad()
            }
          }, false)
        }
      }
    },
    methods: {
      toggleType (type) {
        if (this.type === type) return false
        else this.type = type
      },
      tabChange (tabname) {
        if (this.couponstate === tabname) return false
        else {
          this.couponpageIndex = 1
          this.couponstate = tabname
          this.queryCouponList()
        }
      },
      lcjtabChange (tabname) {
        if (this.lcjstate === tabname) return false
        else {
          this.lcjstate = tabname
          this.queryLcjListByStatus()
        }
      },
      queryCouponList () {
        var couponDatas = {
          pageIndex: this.couponpageIndex,
          pageSize: this.pageSize,
          state: this.couponstate
        }
        this.$store.dispatch('queryCouponList', couponDatas).then((res) => {
          console.log(res.pagination.resultList)
          if (res.responseCode === 0 && res.pagination) {
            this.yhqtotalCount = res.pagination.totalCount
            if (res.pagination.resultList && res.pagination.resultList.length > 0) {
              var couponList = couponListOperate(res.pagination.resultList)
              if (this.isLoading) {
                for (var i = 0; i < couponList.length; i++) {
                  this.couponList.push(couponList[i])
                }
              } else {
                this.couponList = couponList
              }
            } else {
              this.couponList = this.isLoading ? this.couponList : []
            }
          } else {
            this.couponList = this.isLoading ? this.couponList : []
          }
          this.isLoading = false
        })
      },
      queryLcjListByStatus () {
        var lcjDatas = {
          pageIndex: 1,
          pageSize: this.pageSize,
          state: this.lcjstate
        }
        this.$store.dispatch('queryLcjListByStatus', lcjDatas).then((res) => {
          console.log(res.pagination.resultList)
          if (res.responseCode === 0 && res.pagination) {
            this.lcjtotalCount = res.pagination.totalCount
            if (res.pagination.resultList && res.pagination.resultList.length > 0) {
              var lcjList = lcjListOperate(res.pagination.resultList)
              this.lcjList = lcjList
            } else {
              this.lcjtotalCount = 0
              this.lcjList = []
            }
          } else {
            this.lcjtotalCount = 0
            this.lcjList = []
          }
        })
      },
      onLoad () {
        if (!this.isLoading) {
          if (this.type === 'yhq') {
            if (this.couponList.length < this.yhqtotalCount) {
              this.isLoading = true
              this.couponpageIndex++
              this.queryCouponList()
            } else {
              return false
            }
          }
        } else {
          return false
        }
      }
    }
  }
</script>

<style scoped lang="sass">
    .preferential-container
        .top-con
            background: #FFFFFF
            position: fixed
            z-index: 99
            top: 0
            left: 0
            width: 100%
            .top-con-ul
                padding: 0.75rem 0 0.5rem
                text-align: center
                .preferential-type-li
                    display: inline-block
                    vertical-align: middle
                    box-sizing: border-box
                    width: 5rem
                    height: 1.5rem
                    line-height: 1.5rem
                    color: #266DFC
                    font-size: 0.7rem
                    border: 1px solid #266DFC
                    &.active
                        background: #266DFC
                        color: #FFFFFF
            .mylcj-wrap
                text-align: center
                .mylcj-title
                    font-size: 0.6rem
                    line-height: 0.8rem
                    padding: 1rem 0 0.25rem
                    color: #999999
                .mylcj-tatal
                    font-size: 1.7rem
                    color: #282828
                    margin-bottom: 0.95rem
                    line-height: 2.3rem
            .coupon-tab-ul
                padding: 0 0.75rem 0.25rem
                .tab-li
                    width: 33.33%
                    height: 2.25rem
                    line-height: 2.25rem
                    text-align: center
                    position: relative
                    float: left
                    font-size: 0.7rem
                    color: #666666
                    &>i
                        position: absolute
                        width: 15px
                        height: 2px
                        display: block
                        bottom: 0
                        left: 50%
                        margin-left: -7.5px
                    &.active
                        color: #4C87FC
                        &>i
                            background: #4C87FC
        .coupon-wrap
            padding: 5.75rem 0.75rem 0.9rem
        &.lcjcont
            .coupon-wrap
                padding-top: 11rem

</style>