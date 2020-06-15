<template>
    <div class="player">
    <div class="left">
      <img class='disc' src="../assets/img/disc.png" alt="">
      <img class='cover' :src="img" alt="">
    </div>
    <div class="right">
      <div class="title"><img src="" alt=""><span>{{name}}</span> </div>
      <div class="singer" v-if="songer!=''">歌手: <span>{{songer|filterAr}}</span></div>
      <div class="album">所属专辑: <span>{{songerzj}}</span></div>
      <audio class='audio' controls :src="infoSong" autoplay></audio>
      <ul class='lyric-container'>
        <li class='lyric' v-for="(item, index) in lyric" :key="index">{{item.split("]")[1]}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            infoSong:"",
            name:"",
            songerzj:"",
            songer:"",
            lyric:"",
            img:""
        }
    },
created() {
    this.$axios({
        url:"song/url?id="+this.$route.query.id
    }).then(res=>{
        this.infoSong=res.data.data[0].url
        // console.log(res);
    })
    this.$axios({
        url:"song/detail?ids="+this.$route.query.id
    }).then(res=>{
        this.name=res.data.songs[0].name
        this.songerzj=res.data.songs[0].al.name
        this.songer=res.data.songs[0].ar
        this.img=res.data.songs[0].al.picUrl
        // console.log(res);
    })
    this.$axios({
        url:"lyric?id="+this.$route.query.id
    }).then(res=>{
        this.lyric=res.data.lrc.lyric.split("\n")
        // console.log(res);
    })
},
}
</script>

<style>

</style>