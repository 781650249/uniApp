<template>
  <view class="register">
    <view class="register-header">
      <text class="register-header-title">
        填写注册信息
      </text>
      <text class="register-header-describe">
        请完善注册信息
      </text>
    </view>
    <view class="register-form">
      <view class="register-form-item">
        <input type="text" placeholder="请输入手机号" v-model="account" />
      </view>
      <view class="register-form-item">
        <input type="text" placeholder="请输入验证码" v-model="code"/>
      </view>
      <view class="register-form-item">
        <input type="text" placeholder="请输入姓名" v-model="name"/>
      </view>
      <view class="register-form-item">
        <input type="text" placeholder="请输入6~12位密码" v-model="password"/>
      </view>
      <view class="register-form-item">
        <input type="text" placeholder="重复密码" v-model="rePassword"/>
      </view>
      <view class="register-form-item" style="margin: 24rpx 0;">
        <button @click="handleSubmit" type="primary">提交</button>
      </view>
      <view class="agreement">
        <checkbox color="#ffcc36"></checkbox>
        我已阅读并同意
        <text>《用户使用协议》</text>
        和
        <text>《隐私政策》</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      account: '',
      code: '',
      name: '',
      password: '',
      rePassword: '',
    };
  },
  methods: {
    handleSubmit() {
      uni.navigateTo({ url: './register-success' });
    }
  },
};
</script>

<style lang="scss">
.register {
  height: 100%;
  background-color: $uni-white;
  &-header {
    height: 344rpx;
    padding-top: 140rpx;
    padding-left: 40rpx;
    background-image: url(@/static/register-header.png);
    background-repeat: no-repeat;
    background-size: 100% auto;
    &-title {
      display: block;
      margin-bottom: 24rpx;
      font-weight: bold;
      font-size: 48rpx;
      line-height: 64rpx;
    }
    &-describe {
      color: rgba($text-color, 0.65);
      font-size: 24rpx;
    }
  }
  &-form {
    padding: 0 32rpx;
    &-item {
      height: 100rpx;
      line-height: 100rpx;
      input {
        height: 100rpx;
        line-height: 100rpx;
      }
	  button{
		     background-color: $primary-color;
	  }
    }
  }
  .agreement {
    font-size: 24rpx;
    line-height: 36rpx;
    text {
      color: $uni-color-primary;
    }
  }
}

</style>
