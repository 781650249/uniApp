<template>

	<view class="list">
		<uniCard>
			<view class="list-content">
				<view class="list-content-left">
					<img :src="faceImageUrl"></img>
				</view>
				<view class="list-content-right">
					<view class="list-top">
						<view class="list-name">{{name}}</view>
						<view class="list-nv">{{sexCn==="1"?'(男)':'(女)'}}</view>
						<view class="list-xsd">相似度</view>
						<view class="list-name">{{rate}}</view>
					</view>

					<view class="list-bottom">
						<view class="list-info">
							<block>{{ nation }} </block>
							<block>{{ education }}</block>
							<block> {{ age }}岁</block>
						</view>
						<view class="list-sfzh">身份证号 {{idValue}}</view>
						<navigator url="./creditDetail">
							<view @click="showDetail('./creditDetail')" class="list-showDetail"> 查看详情</view>
						</navigator>
					</view>
				</view>
			</view>
		</uniCard>

	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		mounted() {
			this.getPersonInfoByPid({
				pid: `${this.imgPid}`
			})
		},
		computed: {
			...mapState('creditInfo', ['detailList', 'faceIdentify', 'faceImageUrl','sexCn','name','imgPid', 'rate','education','age','nation','idValue']),
		},
		methods: {
			...mapActions('creditInfo', ['getPersonInfoByPid']),
			...mapMutations('creditInfo', ['setState', 'setPid']),
			showDetail: route => {
				uni.navigateTo({
					url: `${route}`
				})
			}
		},
		components: {
			uniCard
		},
	}
</script>

<style lang="scss">
	.list {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200rpx;
		margin-top: 70rpx;

		&-content {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			&-left {
				img {
					background-size: 100% 100%;
					background-repeat: no-repeat;
					width: 160rpx;
					height: 160rpx;
				}
			}

			&-right {
				height: 100%;
				padding: 20rpx 30rpx;
				width: calc(100% - 40rpx);
			}
		}




		&-top {
			display: flex;
			text-indent: 28rpx;
			padding: 16rpx 0rpx;
		}

		&-name {
			font-weight: 900;
			font-size: $uni-font-size-lg;
		}

		&-bottom {
			position: relative;
		}

		&-showDetail {
			color: #007AFF;
			position: absolute;
			right: 0;
			bottom: -40rpx;
			font-size: 27rpx;
			font-weight: 700;
		}

		&-info {
			padding: 20rpx 30rpx;
		}

		&-sfzh {
			padding: 20rpx 30rpx;
		}

		&-nv,
		&-xsd,
		&-info,
		&-sfzh {
			font-size: 26rpx;
			color: #ABABAB;
			margin:  auto;
		}
		&-sfzh {
			white-space: nowrap;
		}
		&-info {
			letter-spacing:1px;
		}
	}
</style>
