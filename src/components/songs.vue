<template>
  <div class="result-wrapper">
    <div class="song" v-for="(item, index) in list" :key="index" @dblclick="goComment(item.id)">
      <div class="name">
        <span class="iconfont icon-play" @click="goPlayer(item.id)"></span>
        {{item.name}}
        <span
          class="iconfont icon-editmedia"
          v-if="item.mvid!=0"
          @click="goMv(item.mvid)"
        ></span>
      </div>
      <div class="singer">{{item.artists | filterAr}}</div>
      <div class="album">《{{item.album.name}}》</div>
      <div class="time">{{item.duration|filterTimetime}}</div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  watch: {
    "$route.query.q"() {
      this.getList();
    }
  },
  filters: {
    filterTimetime(time) {
      return moment(time).format("mm:ss");
    }
  },
  methods: {
    goPlayer(id) {
        this.$router.push({
        path: "/player",
        query: {
          id
        }
      });
    },
    goComment(id) {
      this.$router.push({
        path: "/comment",
        query: {
          id
        }
      });
    },
    goMv(mvid) {
      this.$router.push({
        path: "/mv",
        query: {
          mvid
        }
      });
    },
    getList() {
      let _q = this.$route.query.q;
      this.$axios({
        url: "search?keywords=" + _q
      }).then(res => {
        this.list = res.data.result.songs;
      });
    }
  }
};
</script>

<style>
</style>