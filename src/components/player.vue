<template>
  <div class="player" v-if="musicInfo!=''">
    <div class="left">
      <img class="disc" src="../assets/img/disc.png" alt />
      <img class="cover" :src="musicInfo.al.picUrl" alt />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt />
        <span>{{musicInfo.name}}</span>
      </div>
      <div class="singer">
        歌手:
        <span>{{musicInfo.ar | filterNames}}</span>
      </div>
      <div class="album">
        所属专辑:
        <span>{{musicInfo.al.name}}</span>
      </div>
      <audio ref="audio" class="audio" controls :src="musicUrl"></audio>
      <ul class="lyric-container" ref="container">
        <li
          class="lyric"
          v-for="(item, index) in lrc"
          :key="index"
          :class="{colorStyle:currIndex==index}"
        >{{item.split("]")[1]}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  data() {
    return {
      musicUrl: "",
      musicInfo: "",
      currentTime: -1,
      lrc: [],
      currIndex: 0,
      timeInter: ""
    };
  },
  filters: {
    filterAr(arr) {
      return arr
        .map(item => {
          return item.name;
        })
        .join("&");
    }
  },
  beforeDestroy() {
    window.clearInterval(this.timeInter);
  },
  created() {
    this.timeInter = window.setInterval(() => {
      if (this.musicUrl != "" && this.$refs.audio.paused == false) {
        let _currentTime = this.$refs.audio.currentTime;
        // 处理出每一句歌词的时间以秒为单位
        let _timeArr = this.lrc.map(item => {
          if (item) {
            let _timeStr = item
              .split("]")[0]
              .split("[")[1]
              .split(":");
            return Number(_timeStr[0]) * 60 + Number(_timeStr[1]);
          } else {
            return 0;
          }
        });
        // 找出时间所对应的歌词的索引
        this.currIndex = _timeArr.findIndex((item, index) => {
          if (
            item < _currentTime &&
            index < _timeArr.length - 1 &&
            _currentTime < _timeArr[index + 1]
          ) {
            return true;
          } else if (item < _currentTime && index == _timeArr.length - 1) {
            return true;
          } else {
            return false;
          }
        });
        this.$refs.container.scrollTop = this.currIndex * 20 - 60;
      }
    }, 1000);
    let id = this.$route.query.id;
    // 获取歌曲url
    this.$axios({
      url: "/song/url?id=" + id + "&t=" + Math.random()
    }).then(res => {
      this.musicUrl = res.data.data[0].url;
      window.console.log(res);
    });
    // 获取歌曲详情
    this.$axios({
      url: "/song/detail",
      params: {
        ids: id,
        t: Math.random() * 999
      }
    }).then(res => {
      this.musicInfo = res.data.songs[0];
      // window.console.log("歌曲详情", res);
    });
    // 获取歌词
    this.$axios({
      url: "/lyric",
      params: {
        id: id,
        t: Math.random() * 999
      }
    }).then(res => {
      this.lrc = res.data.lrc.lyric.split("\n");
      // window.console.log("歌词:", res.data.lrc.lyric.split("\n"));
    });
  }
};
</script>
<style>
.player .lyric-container {
  width: 100%;
  height: 100px;
  overflow: hidden;
}
.player .lyric-container .lyric {
  height: 20px;
  line-height: 20px;
  margin-top: 0 !important;
}
.player .lyric-container .colorStyle {
  color: red;
}
</style>