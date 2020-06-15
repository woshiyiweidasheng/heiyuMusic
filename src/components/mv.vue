<template>
  <div class="video" v-if="info!=''">
    <div class="title-wrapper">
      <span class='tag'>MV</span>
      <span class='title'>{{info.name}}</span>
      <span class='artist'>{{info.artists|filterAr}}</span>
    </div>
    <video :src="info.brs|filterBrs" controls></video>
  </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            info:""
        }
    },
created() {
    axios({
        url:"http://183.237.67.218:3000/mv/detail?mvid="+this.$route.query.mvid
    }).then(res=>{
        this.info=res.data.data
        // console.log(res);
    })
},
filters:{
    filterBrs(obj){
        return obj[Math.max(...Object.keys(obj))]
    },
}
}
</script>

<style>

</style>