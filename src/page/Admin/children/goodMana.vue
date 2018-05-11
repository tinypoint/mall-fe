<template>
  <div>
    <div class="search-box">
      <div class="select">
        <select v-model="searchType">
          <option value="name">按商品名</option>
          <option value="id">按商品ID</option>
        </select>
      </div>
      <div class="input">
        <input type="text" v-model="goodSearch"/>
      </div>
      <y-button text="查询商品"
          classStyle="main-btn"
          @btnClick="search"
          style="width: 100px;height: 50px;line-height: 48px"></y-button>
    </div>
    <y-shelf title="查询结果">
    <span slot="right"><y-button text="添加商品" style="margin: 0" @btnClick="openModal({}, true)"></y-button></span>
      <div slot="content">
        <div v-if="goodsList.length">
          <div v-for="(item,i) in goodsList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="order-id"> 商品信息 </span>
                </div>
                <div class="f-bc">
                  <span class="price">商品Id</span>
                  <span class="num">商品名</span>
                  <span class="price">价格</span>
                </div>
              </div>
              <div class="last">
                <span class="order-detail">
                  <a href="javascript:;">商品操作<em class="icon-font"></em></a>
                </span>
              </div>
            </div>
            <div class="pr">
              <div class="cart">
                <div class="cart-l bt">
                  <div class="car-l-l">
                    <div class="img-box">
                      <img
                        :src="item.productImageBig"
                        alt="">
                      </div>
                  </div>
                  <div class="cart-l-r">
                    <div>{{item.productId}}</div>
                    <div class="num">{{item.productName}}</div>
                    <div class="num">{{item.salePrice}}</div>
                  </div>
                </div>
                <div class="cart-r">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="prod-operation pa" style="right: 0;top: 0;">
                <div class="status">
                  <a href="javascript:;" @click="openModal(item)">修改商品<em class="icon-font"></em></a>
                  <a href="javascript:;" @click="deleteProduct(item)">删除商品<em class="icon-font"></em></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 100px 0;text-align: center">
            未查询到该商品
          </div>
        </div>
      </div>
    </y-shelf>
    <div class="modal" v-show="modal" @click="() => this.modal = false">
      <div v-if="operProduct" @click.stop="() => {}" class="modal-inner">
        <div class="goodInfo">
          <div>
            <el-input placeholder="请输入内容" v-model="operProduct.productName">
              <template slot="prepend">商品名</template>
            </el-input>
          </div>
          <div>
            <el-input placeholder="请输入内容" v-model="operProduct.sub_title">
              <template slot="prepend">子标题</template>
            </el-input>
          </div>
          <div>
            <el-input placeholder="请输入内容" v-model="operProduct.salePrice">
              <template slot="prepend">价格&nbsp;&nbsp;&nbsp;</template>
            </el-input>
          </div>
        </div>
        <div class="oper">
          <el-button @click="() => { this.isAdding ? addProduct() : changeProduct() }" type="primary">确定</el-button>
          <el-button @click="() => this.modal = false">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import { searchGood, updateGood, addGood, deleteProd } from '/api/admin'
  export default {
    data () {
      return {
        goodsList: [],
        goodSearch: '',
        searchType: 'name',
        modal: false,
        operProduct: null,
        isAdding: false
      }
    },
    methods: {
      search () {
        let params = {}
        switch (this.searchType) {
          case 'name':
            params.name = this.goodSearch
            break
          case 'id':
            params.id = this.goodSearch
            break
        }
        searchGood(params).then(res => {
          this.goodsList = res.result
        })
      },
      openModal (product, isAdding) {
        this.modal = true
        this.isAdding = isAdding
        this.operProduct = Object.assign({}, product)
      },
      deleteProduct ({ productId }) {
        deleteProd({
          productId
        }).then(() => {
          this.search()
        }).catch(() => {
          alert('删除失败')
        })
      },
      changeProduct () {
        updateGood({
          productId: this.operProduct.productId,
          productName: this.operProduct.productName,
          sub_title: this.operProduct.sub_title,
          salePrice: this.operProduct.salePrice
        }).then(res => {
          this.goodsList = this.goodsList.map(item => {
            if (this.operProduct.productId === item.productId) {
              return this.operProduct
            } else {
              return item
            }
          })
          this.modal = false
        })
      },
      addProduct () {
        addGood(this.operProduct).then(res => {
          this.search()
          this.modal = false
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
    .status {
      width: 100%;
      display: flex;
      justify-content: space-around;
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
  
  .modal-inner {
    height: 400px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    algin-items: center;
    background-color: #fff;
    padding: 40px;
    border-radius: 6px;
    .goodInfo {
      height: 260px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      algin-items: center;
    }
    .oper {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
