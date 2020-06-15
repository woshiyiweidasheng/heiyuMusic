<template>
  <div class="comment-wrapper">
    <div class="items">
      <div class="item" v-for="(item, index) in comments" :key="index">
        <div class="left">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="right">
          <div class="top">
            <span class="user">{{item.user.nickname}}</span>
            <span class="content">{{item.content}}</span>
          </div>
          <div class="bottom">
            <div class="time">{{item.time|farmatTime}}</div>
            <div class="like-wrapper">
              <span>👍</span>
              ({{item.likedCount}})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      comments: ""
    };
  },
  filters: {
    farmatTime(time) {
      return moment(time).format("YYYY年MM月DD日 hh:mm");
    }
  },
  created() {
    axios({
      url: "http://183.237.67.218:3000/comment/music?id=" + this.$route.query.id
    }).then(res => {
      this.comments = res.data.comments;
    //   console.log(res);
    });
  }
};
</script>

<style>
</style>