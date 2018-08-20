<template>
    <div class="hrywechat-container">
        <div class="worth-container">
            <div class="worth-navbar">
                <div class="back-icon"></div>
                {{name}}
                <div class="uer-loginout">退出</div>
            </div>
            <div class="worth-about">
                <p class="title">总资产(元)</p>
                <p class="money">{{investSum}}<i class="money-desensitization" :class="{open:isOpen}" @click="isOpen = !isOpen"></i></p>
                <p class="decript">不含快捷通账户余额</p>
            </div>
        </div>
    </div>

</template>

<script>
import fotmatMoney from '~/helper/formatMoney.js'
export default {
  head () {
     return {
        title:'我的资产'
     }
  },
  data () {
    return {
      isOpen:true,
      name:"*丹",
      investSum:fotmatMoney.formatMoney(200000)
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
    .worth-container{
        background: #266DFC;
        height: 9.2rem;
        text-align: center;
        color: #ffffff;
        .worth-navbar{
            height: 2.2rem;
            line-height: 2.2rem;
            position: relative;
            font-size: 0.9rem;
            .back-icon{
                position: absolute;
                width:2.5rem;
                height: 2.2rem;
                background: url("~/assets/img/center_back.png") no-repeat center;
                background-size: 9px 14px;
                left: 0;
                top: 0;
            }
            .uer-loginout{
                position: absolute;
                width:3.4rem;
                right: 0;
                top: 0;
                font-size: 0.7rem;
            }
        }
        .worth-about{
            .title{
                font-size: 0.6rem;
                line-height: 0.825rem;
                padding: 0.95rem 0 0.5rem;
            }
            .money{
                display: inline-block;
                height: 2rem;
                line-height: 2rem;
                position: relative;
                font-size: 1.7rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
                .money-desensitization{
                    position: absolute;
                    width: 1rem;
                    height: 1rem;
                    right: -1.5rem;
                    top: 0.5rem;
                    background: url("~/assets/img/close.png") no-repeat center;
                    background-size: 16px 16px;
                }
                .open{
                    background: url("~/assets/img/open.png") no-repeat center;
                    background-size: 16px 16px;
                }
            }
        }
    }

</style>
