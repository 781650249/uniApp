<template>
	<view class="container">
		<view class="site-row" @click="handleLogin">
			<view class="site-row-text">退出</view>
			<uni-icons type="arrowright" size="16"></uni-icons>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {

			};
		},
		computed: {
			...mapState('user', ['token']),
		},
		methods: {
			...mapMutations('communityServ',['setStates','setAreaList']),
			...mapMutations('user', ['setState']),
			handleLogin() {
				uni.removeStorageSync('token');
				uni.removeStorageSync('userinfo');
				uni.clearStorageSync()
				this.setState({
					token: ''
				})
				this.setAreaList([]);
				this.setStates({
					residentHandleCount: 0,
					warnHandleCount: 0
				});
				uni.navigateBack()
			},
		},
		onLoad() {

		},
	};
</script>

<style lang="scss">
	.container {
		background: $uni-white;
		padding-left: 36rpx;

		.site-row {
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 102rpx;
			border-bottom: 1px solid #f2f5fa;

			&-text {
				width: 100%;
				font-size: 16px;
				color: rgba($uni-font-color, 0.85);
			}
		}
	}
</style>
