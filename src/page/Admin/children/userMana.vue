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
          <div v-for="(item,i) in orderList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="date" v-text="item.createDate"></span>
                  <span class="order-id"> 订单号： <a href="javascript:;">{{item.orderId}}</a> </span>
                </div>
                <div class="f-bc">
                  <span class="price">单价</span>
                  <span class="num">数量</span>
                  <span class="operation">商品操作</span>
                </div>
              </div>
              <div class="last">
                <span class="sub-total">实付金额</span>
                <span class="order-detail"> <a href="javascript:;">查看详情<em class="icon-font"></em></a> </span>
              </div>
            </div>
            <div class="pr">
              <div class="cart" v-for="(good,j) in item.goodsList" :key="j">
                <div class="cart-l" :class="{bt:j>0}">
                  <div class="car-l-l">
                    <div class="img-box"><img
                      :src="good.productImg"
                      alt=""></div>
                    <div class="ellipsis">{{good.productName}}</div>
                  </div>
                  <div class="cart-l-r">
                    <div>¥ {{good.productPrice}}</div>
                    <div class="num">{{good.productNum}}</div>
                    <div class="type"><a @click="_delOrder(item.orderId,i)" href="javascript:;" v-if="j<1"
                                         class="del-order">删除此订单</a>
                    </div>
                  </div>
                </div>
                <div class="cart-r">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="prod-operation pa" style="right: 0;top: 0;">
                <div class="total">¥ {{item.orderTotal}}</div>
                <div class="status"> {{orderStatusMap[item.orderStatus]}}  </div>
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

  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import { searchUser } from '/api/admin'
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
        }
      }
    },
    methods: {
      search () {
        console.log(this.searchType)
        console.log(this.userSearch)

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
          console.log(res)
          this.userList = res.result
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
</style>
