<template>
  <div>
    <div class="search-box">
      <div class="select">
        <select v-model="searchType">
          <option value="name">按用户名</option>
          <option value="id">按用户ID</option>
        </select>
      </div>
      <div class="input">
        <input type="text" v-model="userSearch"/>
      </div>
      <y-button text="查询用户"
          classStyle="main-btn"
          @btnClick="search"
          style="width: 100px;height: 50px;line-height: 48px"></y-button>
    </div>
    <y-shelf title="查询结果">
      <div slot="content">
        <div v-if="userList.length">
          <div v-for="(item,i) in userList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="order-id"> 用户信息 </span>
                </div>
                <div class="f-bc">
                  <span class="price">账号</span>
                  <span class="num">用户Id</span>
                  <span class="price">用户名</span>
                </div>
              </div>
              <div class="last">
                <span class="sub-total">用户角色</span>
                <span class="order-detail">
                  <a href="javascript:;">权限操作<em class="icon-font"></em></a>
                </span>
              </div>
            </div>
            <div class="pr">
              <div class="cart">
                <div class="cart-l bt">
                  <div class="car-l-l">
                    <div class="img-box">
                      <img
                        :src="item.avatar"
                        alt="">
                      </div>
                  </div>
                  <div class="cart-l-r">
                    <div>{{item.userName}}</div>
                    <div class="num">{{item.userId}}</div>
                    <div class="num">{{item.name}}</div>
                  </div>
                </div>
                <div class="cart-r">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="prod-operation pa" style="right: 0;top: 0;">
                <div class="total">{{roleMap[item.role]}}</div>
                <div class="status">
                  <a href="javascript:;" @click="openModal(item.userId, item.role)">修改权限<em class="icon-font"></em></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 100px 0;text-align: center">
            未查询到该用户
          </div>
        </div>
      </div>
    </y-shelf>
    <div class="modal" v-show="modal" @click="() => this.modal = false">
      <div @click.stop="() => {}">
        <el-select v-model="role" placeholder="请选择" @change="changeRole">
          <el-option :label="'用户管理员'" :value="1"></el-option>
          <el-option :label="'市场运营经理'" :value="2"></el-option>
          <el-option :label="'商品管理员'" :value="3"></el-option>
          <el-option :label="'普通用户'" :value="4"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import { searchUser, changeRole } from '/api/admin'
  export default {
    data () {
      return {
        userList: [],
        userSearch: '',
        searchType: 'name',
        orderStatusMap: {
          '0': '待支付',
          '1': '正在支付',
          '2': '已支付',
          '3': '支付失败',
          '4': '取消支付'
        },
        roleMap: {
          0: '超级管理员',
          1: '用户管理员',
          2: '市场运营经理',
          3: '商品管理员',
          4: '普通用户'
        },
        modal: false,
        role: 0,
        operUserId: ''
      }
    },
    methods: {
      search () {
        let params = {}
        switch (this.searchType) {
          case 'name':
            params.name = this.userSearch
            break
          case 'id':
            params.id = this.userSearch
            break
        }
        searchUser(params).then(res => {
          this.userList = res.result
        })
      },
      openModal (userId, role) {
        this.modal = true
        this.role = role
        this.operUserId = userId
      },
      changeRole (role) {
        changeRole({
          userId: this.operUserId,
          role: this.role
        }).then(res => {
          this.modal = false
          this.userList = this.userList.map(user => {
            if (res.result.userId !== user.userId) {
              return user
            } else {
              return Object.assign({}, user, {
                role: res.result.role
              })
            }
          })
        })
      }
    },
    created () {
    },
    components: {
      YShelf,
      YButton
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 6px;
  }

  .order-id {
    margin-left: 20px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }

  .search-box {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;

    .select {
      height: 50px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      select {
        font-size: 16px;
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
    }

    .input {
      height: 50px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      input {
        font-size: 16px;
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
    }
  }

  .modal {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
