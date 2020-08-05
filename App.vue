<script>
import Vue from 'vue';
import PickerItem from '@/components/picker-item/picker-item';


export default {
  onLaunch: function() {
    console.log('App Launch');
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  },
  created() {},
};
</script>

<style lang="scss">
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  src: url('/static/uni.ttf');
}

/* #endif */
page {
  height: 100%;
  $text-color: #222;
  font-size: 30rpx;
  background-color: $background-color-base;
}
view,
uni-swiper-item,
uni-textarea {
  box-sizing: border-box;
}
.tabs-content swiper-item {
  height: 100%;
  padding: 0 32rpx 32rpx;
  overflow: auto;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}


@for $i from 2 through 3 {
  .ellipsis-mulitiple-#{$i} {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: #{$i};
    -webkit-box-orient: vertical;
  }
}

</style>
