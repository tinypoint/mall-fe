<template>
  <div class="layout-container">
    <y-header :showNav="false"></y-header>
    <div class="w">
      <div class="content">
        <div class="account-sidebar">
          <div class="avatar gray-box ">
            <div>
              <img :src="userInfo.info.avatar">
              <h5>{{userInfo.info.name}}</h5>
              <h4>{{roleMap[userInfo.info.role]}}</h4>
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
  export default {
    data () {
      return {
        title: '用户管理',
        nav: [],
        roleMap: {
          0: '超级管理员',
          1: '用户管理员',
          2: '市场运营经理',
          3: '商品管理员',
          4: '普通用户'
        }
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      tab (e) {
        this.$router.push({path: '/admin/' + e.path})
      }
    },
    created () {
      if (!this.userInfo.info || !(this.userInfo.info.role in [0, 1, 2, 3])) {
        this.$router.push({path: '/'})
      }

      if (this.userInfo.info) {
        switch (this.userInfo.info.role) {
          case 0:
            this.nav = [
              {name: '用户管理', path: 'userMana'},
              {name: '商品管理', path: 'goodMana'},
              {name: '主页配置', path: 'homeMana'}
            ]
            break
          case 1:
            this.nav = [
              {name: '用户管理', path: 'userMana'}
            ]
            break
          case 2:
            this.nav = [
              {name: '主页管理', path: 'homeMana'}
            ]
            break
          case 3:
            this.nav = [
              {name: '商品管理', path: 'goodMana'}
            ]
            break
        }
      }

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


</style>
