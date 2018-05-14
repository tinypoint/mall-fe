<template>
  <div>
    <y-shelf title="配置热门商品">
      <div slot="content" class="contanier">
        <div class="goods-box">
          <div v-for="(msg, i) in hots" :key="i" class="good-item">
            <div class="good-img">
              <img v-lazy="msg.productImageBig" :alt="msg.productName">
            </div>
            <h6 class="good-title">{{msg.productName}}</h6>
            <h3 class="sub-title ellipsis">{{msg.sub_title}}</h3>
            <div class="good-price pr">
              <div class="ds pa">
                <y-button text="删除"
                          style="margin: 0 5px"
                          @btnClick="delHot(msg.productId)"
                          classStyle="main-btn"
                ></y-button>
              </div>
              <p><span style="font-size: 16px">￥</span>
                {{msg.salePrice}}</p>
            </div>
          </div>
          <div class="good-item" v-if="hots.length <= 4">
            <div class="add-btn" @click="openAddHot"></div>
          </div>
        </div>
        
      </div>
    </y-shelf>
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
      <div slot="content">
        <div>
          <el-input placeholder="请输入内容" v-model="addId">
            <template slot="prepend">商品Id</template>
          </el-input>
        </div>
        <div class="oper">
          <el-button @click="addHot" type="primary">确定</el-button>
          <el-button @click="popupOpen=false">取消</el-button>
        </div>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import { productHome } from '/api/index'
  import { configHots } from '/api/admin'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        popupOpen: false,
        popupTitle: '添加主题推荐',
        floors: [],
        hots: [],
        addId: ''
      }
    },
    created () {
      this._getData()
    },
    methods: {
      _getData () {
        productHome().then(res => {
          this.floors = res.result.home_floors
          this.hots = res.result.home_hot
        })
      },
      openAddHot () {
        this.popupOpen = true
      },
      addHot () {
        configHots({
          oper: 'add',
          ids: this.addId
        }).then(res => {
          this._getData()
          this.popupOpen = false
          this.addId = ''
          if (res.status === 1) {
            alert('该商品已经是热门商品了')
          }
        })
      },
      delHot (productId) {
        configHots({
          oper: 'del',
          ids: productId
        }).then(res => {
          this._getData()
        })
      }
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/style/mixin";
  @import "../../../assets/style/theme";

  .contanier {

  }
  .goods-box {
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }

  .add-btn {
    width: 100%;
    height: 100%;
    background-image: url(/static/images/add.png);
    background-repeat: no-repeat; 
    background-position: center center; 
    background-size: 50px 50px; 
    cursor: pointer;
  }

  .oper {
    margin-top: 30px;
  }

  .good-item {
    background: #fff;
    width: 25%;
    transition: all .5s;
    height: 430px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;
      .good-price p {
        display: none;
      }
      .ds {
        display: flex;
      }
    }
    .ds {
      @extend %block-center;
      width: 100%;
      display: none;
    }

    .good-img {
      img {
        margin: 50px auto 10px;
        @include wh(206px);
        display: block;
      }
    }
    .good-price {
      margin: 15px 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #e4393c;
      font-size: 20px;
    }
    .good-title {
      line-height: 1.2;
      font-size: 16px;
      color: #424242;
      margin: 0 auto;
      padding: 0 14px;
      text-align: center;
      overflow: hidden;
    }
    h3 {
      text-align: center;
      line-height: 1.2;
      font-size: 12px;
      color: #d0d0d0;
      padding: 10px;
    }

  }
</style>
