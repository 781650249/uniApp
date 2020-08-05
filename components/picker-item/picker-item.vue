<template>
  <view class="f-cell">
    <view class="f-cell-left">
      {{ label }}
    </view>
    <view class="f-cell-db">
      <picker
        :mode="mode"
        :value="valueIndex"
        :range="range"
        :range-key="rangeKey"
        @change="bindPickerChange"
      >
        <view class="f-input">{{ name }}</view>
      </picker>
    </view>
  </view>
</template>

<script>
export default {
  name: 'PickerItem',
  props: {
    mode: {
      type: String,
      default: 'selector',
    },
    range: {
      type: Array | [Object],
      default() {
        return [];
      },
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    rangeKey: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {
    valueIndex() {
      if (this.value) {
        return this.range.map(item => item.value).indexOf(this.value);
      }
      return 0;
    },
    name() {
      const current = this.range.find(item => item.value === this.value)
      if (current) {
        return current.name
      }
      return '请选择';
    },
  },
  methods: {
    bindPickerChange(e) {
      let value = '';
      const i = e.detail.value;
      if (i >= 0 && i < this.range.length) {
        value = this.range[i].value;
      }
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss">
.f-cell {
  display: flex;
  height: 54px;
  line-height: 54px;
  background-color: #fff;
  border-radius: 8rpx;
  &-left {
    padding-left: 32rpx;
    color: $label-color;
    width: 200rpx;
    font-size: 15px;
  }
  &-db {
    position: relative;
    flex: auto;
    padding-right: 76rpx;
    color: $value-color;
    text-align: right;
    &::after {
      position: absolute;
      display: block;
      top: 0px;
      right: 30rpx;
      width: 20px;
      height: 100%;
      background-image: url(@/static/images/icon-next.png);
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 100% auto;
      content: '';
    }
  }
}
</style>
