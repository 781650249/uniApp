<template>
	<view class="list">
		<uniCard>
			<view class="list-content">
				<view class="list-content-left" @click="previewImage([faceImageUrl], 0)">
					<img :src="faceImageUrl"></img>
				</view>
				<view class="list-content-right">
					<view class="list-top">
						<view class="list-name">{{name}}</view>
						<view class="list-nv">{{sexCn==="1"?'男':'女'}}</view>
						<view class="list-xsd">相似度</view>
						<view class="list-name">{{rate}}</view>
					</view>

					<view class="list-bottom">
						<view class="list-info">
							<block>{{ nation }} </block>
							<block>{{ education }}</block>
							<block> {{ age }}岁</block>
						</view>
					</view>
				</view>
			</view>

			<view class="list-sfzh">
				<view class="list-left">身份证号</view>
				<view class="list-right">{{idValue}}</view>
			</view>


			<view class="list-jg">
				<view class="list-left">籍贯</view>
				<view class="list-right">{{domicile}}</view>
			</view>
		</uniCard>

		<uniCard>
			<view class="rela">
				<view class="rela-photo rela-card" @click="goTo('xxx')"> 关系图谱</view>
			</view>
			<view class="road">
				<view class="road-photo road-card" @click="goTo('xxx')"> 行踪轨迹</view>
			</view>
		</uniCard>

		<!-- 		<uniCard>
			<view>行为轨迹</view>

			<timeline>
				<timelineItem leftTime='2020-01-02'>
					<view class="tripItem">
						<view class="title">xxxxxx</view>
						<view class="tips">xxxxxxx</view>
					</view>
				</timelineItem>
				<timelineItem leftTime='2020-01-01'>
					<view class="tripItem">
						<view class="title">xxxxxxx</view>
						<view class="tips">xxxxxxx</view>
					</view>
				</timelineItem>
			</timeline>

		</uniCard> -->

	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import timeline from '@/components/chenbin-timeline/timeLine.vue'
	import timelineItem from '@/components/chenbin-timeline/timelineItem.vue'
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		onBackPress(event) {
			if (event.from == "navigateBack") {
				return false
			}
			this.back()
			return true
		},
		computed: {
			...mapState('creditInfo', ['detailList', 'faceIdentify', 'faceImageUrl','name','imgPid', 'age','rate','education','age','nation','idValue','domicile',]),
		},
		methods: {
			...mapActions('creditInfo', ['getPersonInfoByPid', 'getTrajectory']),
			...mapMutations('creditInfo', ['setPid']),
			previewImage(urls, current) {
				console.log(urls,current)
				uni.previewImage({
					urls,
					current
				});
			},
			goTo() {
				// uni.navigateTo({
				// 	url: './creditRelation'
				// })
				uni.showToast({
					title: '该功能暂不开放',
					icon: 'none',
				});
			},
			back() {
				uni.navigateBack({
					delta: 3
				})
			}
		},
		mounted() {
			// this.getTrajectory({
			// 	pid: [`${this.imgPid}`]
			// })
		},
		components: {
			uniCard,
			timeline,
			timelineItem
		},
	}
</script>

<style lang="scss">
	.tripItem {
		height: 180rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
		border-radius: 10px;
		margin-bottom: 30rpx;

		.title {
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
		}

		.tips {
			font-size: 22rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin-top: 20rpx;

		}
	}

	.list {
		// display: flex;
		// justify-content: center;
		// align-items: flex-start;
		height: 900rpx;

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
			justify-content: space-around;
			align-items: center;
			padding: 16rpx 12rpx;
		}

		&-name {
			font-weight: bold;
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
			padding: 20rpx 28rpx;
			letter-spacing: 1px;
		}


		&-nv,
		&-xsd,
		&-info {
			font-size: 26rpx;
			color: #ABABAB;
		}



		&-sfzh,
		&-jg {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 30rpx;
			padding: 20rpx 0;

		}

		&-left {
			width: 80%;
		}

		&-right {
			text-align: right;
			color: $uni-text-color-grey;
			font-size: 30rpx;
		}


		&-sfzh {
			border-bottom: 1px solid #f2f5fa;
		}
	}

	.rela {
		&-photo {
			position: relative;
			margin-left: 120rpx;
			line-height: 112rpx;
			border-bottom: 1px solid #f2f5fa;
		}



		&::after {
			position: absolute;
			display: block;
			content: '';
		}

		&::before {
			position: absolute;
			display: block;
			content: '';
		}

		&::before {
			top: 30rpx;
			left: 20rpx;
			width: 100rpx;
			height: 100rpx;
			// background-color: #ccc;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background: url(@/static/gxt.png) no-repeat;
		}

		&::after {
			top: 56rpx;
			right: 16rpx;
			width: 40rpx;
			height: 48rpx;
			background: url(@/static/images/icon-next.png) no-repeat;
			background-size: 100% 100%;
		}

		&-card {
			&::before {
				background-image: url(@/static/gxt.png);
			}
		}
	}
	
	
	.road {
		&-photo {
			position: relative;
			margin-left: 120rpx;
			line-height: 112rpx;
			border-bottom: 1px solid #f2f5fa;
		}
	
	
	
		&::after {
			position: absolute;
			display: block;
			content: '';
		}
	
		&::before {
			position: absolute;
			display: block;
			content: '';
		}
	
		&::before {
			top: 156rpx;
			left: 24rpx;
			width: 100rpx;
			height: 100rpx;
			// background-color: #ccc;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background: url(@/static/road.png) no-repeat;
		}
	
		&::after {
			top: 174rpx;
			right: 16rpx;
			width: 40rpx;
			height: 48rpx;
			background: url(@/static/images/icon-next.png) no-repeat;
			background-size: 100% 100%;
		}
	
		&-card {
			&::before {
				background-image: url(@/static/gxt.png);
			}
		}
	}
</style>
