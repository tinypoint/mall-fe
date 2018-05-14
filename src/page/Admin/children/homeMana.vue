<template>
  <div>
    <y-shelf title="主页推荐模块配置">
      <span slot="right"><y-button text="添加收货地址" style="margin: 0" @btnClick="update()"></y-button></span>
      
    </y-shelf>
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
     
    </y-popup>
  </div>
</template>
<script>
  import { productHome } from '/api/index'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        popupOpen: false,
        popupTitle: '添加主题推荐',
        floors: [],
        hots: []
      }
    },
    created () {
      productHome().then(res => {
        this.floors = res.result.home_floors
        this.hots = res.result.home_hot
      })
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
  
</style>
