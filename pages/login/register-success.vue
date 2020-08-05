<template>
  <view class="success">
    <view class="success-header">
      <view class="success-text">注册成功</view>
    </view>
    <button type="primary" @click="handleGoToLogin">去登录</button>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleGoToLogin() {
      uni.navigateTo({ url: './login' });
    },
  },
};
</script>

<style lang="scss">
.success {
  padding: 0 32rpx;
  height: 100%;
  background-color: $background-color;
  &-header {
    position: relative;
    height: 464rpx;
    margin-bottom: 64rpx;
    background: url(@/static/images/register-success.png) no-repeat;
    background-position: 50% 50%;
    background-size: 248rpx 248rpx;
  }
  &-text {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 48rpx;
    text-align: center;
  }
  button {
    background-color: #ffcc36;
  }
}
</style>
