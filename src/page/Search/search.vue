<template>
  <div class="goods">
    <!--商品-->
    <div v-if="searchList.length > 0" class="goods-box w">
      <mall-goods v-for="(item,i) in searchList" :key="i" :msg="item"></mall-goods>
    </div>
    <div v-else class="no-data">
      搜索无结果
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import mallGoods from '/components/mallGoods'
  import YButton from '/components/YButton'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'searchList'
      ])
    },
    components: {
      mallGoods,
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";
  @import "../../assets/style/theme";

  .nav {
    height: 60px;
    line-height: 60px;
    > div {
      display: flex;
      align-items: center;
      a {
        padding: 0 15px;
        height: 100%;
        @extend %block-center;
        font-size: 12px;
        color: #999;
        &.active {
          color: #5683EA;
        }
        &:hover {
          color: #5683EA;
        }
      }
      input {
        @include wh(80px, 30px);
        border: 1px solid #ccc;
      }
      input + input {
        margin-left: 10px;
      }
    }
    .price-interval {
      padding: 0 15px;
      @extend %block-center;
      input[type=number] {
        border: 1px solid #ccc;
        text-align: center;
        background: none;
        border-radius: 5px;
      }
    }
  }

  .goods-box {
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }

  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 100%;
    
  }


</style>
