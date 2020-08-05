<template>
	<view class="list">
		<uniCard>
			<view class="list-content">
				<view class="list-content-left">
					<img :src="personDetail.imageUrl"></img>
				</view>
				<view class="list-content-right">
					<view class="list-top">
						<view class="list-name">{{personDetail.name}}</view>
						<view class="list-nv">({{personDetail.relation}})</view>
					</view>

					<view class="list-bottom">
						<view class="list-info">
							<block> 学历 {{ personDetail.education }}</block>
						</view>
						
						<view class="list-info">
							出生年月 {{personDetail.birth}}
						</view>
					</view>
				</view>
			</view>
			<view class="list-sjh">
				<view class="list-left">手机号</view>
				<view class="list-right">{{personDetail.phone}}</view>
			</view>
			<view class="list-sfzh">
				<view class="list-left">身份证号</view>
				<view class="list-right">{{personDetail.id}}</view>
			</view>


			<view class="list-jg">
				<view class="list-left">籍贯</view>
				<view class="list-right">{{personDetail.wz}}</view>
			</view>



			<!-- 	<view class="list-birth">
				<view class="list-left">出生年月</view>
				<view class="list-right">{{personDetail.birth}}</view>
			</view> -->
		</uniCard>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		onLoad(options) {
			const personDetail = this.list.find(item => item.id === options.id)
			this.setState(personDetail)
		},
		computed: {
			...mapState('houses', ['list', 'personDetail']),
		},
		methods: {
			...mapMutations('houses', ['setState'])
		},
		components: {
			uniCard,
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
		overflow: hidden;
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
			justify-content: space-between;
			align-items: center;
			padding: 16rpx 12rpx;
			text-indent: 16rpx;
		}

		&-name {
			font-weight: bold;
			font-size: $uni-font-size-lg;
			text-align: left;
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

		&-nv {
			font-size: 28rpx;
			color: #ABABAB;
		}


		&-xsd,
		&-info {
			font-size: 26rpx;
			color: #ABABAB;
		}



		&-sfzh,
		&-birth,
		&-sjh,
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
