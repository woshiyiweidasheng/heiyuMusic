<template>
   <div id="player">
    <h2 class="title">黑云音乐</h2>
    <div class="search">
      <input type="text" v-model="inputVal" @keyup.enter="goSongs"/>
      <button @click="goSongs">
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <div class="tab-wrapper">


      <!-- 对应的内容区域 -->
      <div class="tab-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVal:""
    }
  },
  methods: {
    goSongs(){
      if(this.inputVal.trim()=="")return;
      this.$router.push("/songs?q="+this.inputVal)
    }
  },
}
</script>

<style>
  @import url(./assets/css/index.css);
  @import url(./assets/css/iconfont.css);
</style>
