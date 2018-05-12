<template>
  <div class="layout-container">
    <y-header :showNav="false"></y-header>
    <div class="w">
      <div class="content">
        <div class="account-sidebar">
          <div class="avatar gray-box ">
            <div>
              <img :src="userInfo.info.avatar">
              <h5 v-if="!changingName">
              {{userInfo.info.name}} <a class="change-name" @click="showChangeName" href="javascript:;">修改</a>
              </h5>
              <div class="change-name-box" v-else>
                <input class="change-name-input" v-model="newName"/>
                <div>
                  <a class="change-name" @click="changeName" href="javascript:;">确定</a>
                  <a class="change-name" @click="hideChangeName" href="javascript:;">取消</a>
                </div> 
              </div>
            </div>
            <div class="box-inner">
              <ul class="account-nav">
                <li v-for="(item,i) in nav" :key='i' :class="{current:item.name===title}"
                    @click="tab(item)">
                  <a href="javascript:;">{{item.name}}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="account-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <y-footer></y-footer>

  </div>

</template>
<script>
  import YFooter from '/common/footer'
  import YHeader from '/common/header'
  import { mapState } from 'vuex'
  import store from '../../store'
  import { userInfo, changeName } from '/api/index'
  export default {
    data () {
      return {
        title: '我的订单',
        nav: [
          {name: '我的订单', path: 'orderList'},
          {name: '账户资料', path: 'information'},
          {name: '收货地址', path: 'addressList'},
          {name: '我的优惠', path: 'coupon'},
          {name: '售后服务', path: 'support'},
          {name: '以旧换新', path: 'aihuishou'}
        ],
        editAvatar: true,
        newName: '',
        changingName: false
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      tab (e) {
        this.$router.push({path: '/user/' + e.path})
      },
      showChangeName () {
        this.changingName = true
        this.newName = this.userInfo.info.name
      },
      hideChangeName () {
        this.changingName = false
        this.newName = ''
      },
      changeName () {
        changeName({
          newName: this.newName
        }).then(res => userInfo()).then(res => {
          this.changingName = false
          store.commit('RECORD_USERINFO', {info: res.result})
        })
      }
    },
    created () {
      let path = this.$route.path.split('/')[2]
      this.nav.forEach(item => {
        if (item.path === path) {
          this.title = item.name
        }
      })
    },
    components: {
      YFooter,
      YHeader
    },
    watch: {
      $route (to) {
        let path = to.path.split('/')[2]
        this.nav.forEach(item => {
          if (item.path === path) {
            this.title = item.name
          }
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";

  .w {
    padding-top: 40px;
  }

  .content {
    display: flex;
    height: 100%;
  }

  .account-sidebar {
    width: 210px;
    border-radius: 6px;
    .avatar {
      padding-top: 20px;
      border-radius: 10px;
      text-align: center;
      img {
        width: 168px;
        height: 168px;
      }
      h5 {
        font-size: 18px;
        line-height: 48px;
        font-weight: 700;
      }
    }
    .account-nav {
      padding-top: 15px;
      li {
        position: relative;
        height: 48px;
        border-top: 1px solid #EBEBEB;
        line-height: 48px;
        &:hover {
          a {
            position: relative;
            z-index: 1;
            height: 50px;
            background-color: #98AFEE;
            line-height: 50px;
            color: #FFF;
          }

        }
        a {
          display: block;
        }
        &.current {
          a {
            position: relative;
            z-index: 1;
            height: 50px;
            background-color: #98AFEE;
            line-height: 50px;
            color: #FFF;
          }
        }

      }
    }
  }

  .account-content {
    margin-left: 20px;
    flex: 1;
  }

  .change-name-box {
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .change-name-input {
    font-size: 20px;
    font-weight: normal;
    border: 1px solid #98AFEE;
    line-height: 28px;
    border-radius: 3px;
    text-align: center;
  }

  .change-name {
    font-size: 12px;
    font-weight: normal;
  }

</style>
