<template>

	<view class="wrap">
		<view class="title">上传人脸照</view>
		<view class="desc">为信息验证，请上传人脸照片</view>
		<view class="face" @click="uploadPhoto()">
			<image style="width: 100%; height: 100%" mode="aspectFit" :src="imgSrc"></image>
		</view>
		<view class="prompt">拍摄人脸照片</view>
		<button class="form-btn" :disabled="disabled" @click="submit">对比分析</button>
	</view>

</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	import {
		pathToBase64
	} from '../../utils/image-tools/index.js';
	export default {
		data() {
			return {
				defaultImg: '../../static/icon/default-face.png'
			}
		},
		computed: {
			...mapState('creditInfo', ['faceImageUrl']),
			// faceImageUrl:{
			// 	get(){
			// 		return this.faceImageUrl
			// 	},
			// 	set(val){

			// 	}
			// },
			disabled() {
				return this.defaultImg == '../../static/icon/default-face.png'
			},
			imgSrc() {
				return this.faceImageUrl || this.defaultImg
			}
		},
		methods: {
			...mapActions('creditInfo', ['faceIdentify']),
			...mapMutations('creditInfo', ['setImg']),
			uploadPhoto() {
				this.setImg('')
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						const {
							tempFilePaths
						} = res;
						this.defaultImg = tempFilePaths[0];
					}
				});
			},
			submit() {
				// uni.showLoading({
				// 	mask: true
				// });
				pathToBase64(this.defaultImg).then(base => {
					this.faceIdentify({
						"faceImage": base, //base64图片
					})
					// uni.hideLoading();
				}).catch(error => {
					uni.showToast({
						type: '服务器错误',
						icon: 'none'
					})
				})
			}
		},
		onLoad() {

		},
		onUnload() {
			console.log('页面卸载')
			console.log(this.faceImageUrl)
			this.setImg('')
		},
	}
</script>

<style lang="scss">
	.wrap {
		flex: auto;
		padding: 40rpx 24rpx;
		background: $uni-white;

		.title {
			margin-bottom: 36rpx;
			padding-left: 6rpx;
			color: $uni-dark-font-color;
			font-size: 24px;
		}

		.desc {
			margin-bottom: 40rpx;
			padding-left: 6rpx;
			color: rgba($uni-font-color, 0.35);
		}

		.face {
			width: 408rpx;
			height: 408rpx;
			margin: 0 auto;
			padding: 8rpx;
			background-image: url(../../static/icon/face-border.jpg);
			background-size: 100% 100%;
		}

		.prompt {
			margin-top: 26rpx;
			text-align: center;
			color: rgba($uni-font-color, 0.35);
		}
	}


	.form-btn {
		position: fixed;
		bottom: 36rpx;
		width: calc(100vw - 40rpx);
		background-color: $primary-color;
		color: #FFFFFF;
	}

	button {
		background-color: $primary-color;
	}
</style>
