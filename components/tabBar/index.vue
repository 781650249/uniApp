<template>
	<view>
		<!--顶部导航栏-->
		<view style="flex-direction: row;">
			<scroll-view style="display: flex;" scroll-x class="uni-swiper-tab">
				<view style="display: flex;justify-content: space-around;width: 100%;">
					<block v-for="(tabBar,index) in tabBars" :key="index">
						<view style="flex-direction: row" class="swiper-tab-list" :class="{'active': tabIndex==index}" @tap="toggleTab(index)">
							<view class="swiperTxt">{{tabBar.name}}</view>
							<view class="swiper-tab-line">
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>

		<!--内容区-->
		<view class="uni-tab-bar">
			<swiper :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(item,index) in buildList" :key="index">
					<view class="notice-card">
						<image v-if="tabIndex===0" class="notice-card-image" mode="aspectFit" :src="item.image"></image>
						<image v-else class="notice-card-greyImage" mode="aspectFit" :src="item.image"></image>
						<view class="notice-card-content">

							<view class="notice-card-left">
								<view class="notice-card-content-text">{{ item.name }}
									<text style="color: #ABABAB;">{{' '}}(租客)</text>
								</view>
								<text class="notice-card-content-time">{{ item.Address }}</text>
							</view>

							<view class="notice-card-right">
								<button @click="goTo()" class="notice-card-content-btn">去审核</button>
							</view>
						</view>
					</view>
				</swiper-item>


			</swiper>
		</view>


	</view>


</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				tabIndex: 0, //选中标签栏的序列
				contentList: [
					"待审核",
					"已审核",
				],

				tabBars: [{
						name: '待审核',
						id: 'daishenhe'
					},
					{
						name: '已审核',
						id: 'yishenhe'
					},
				],
				swiperHeight: 0

			}
		},
		computed: {
			...mapState({
				buildList: state => state.hasHouse.personInfo
			})
		},
		components: {
			uniCard
		},
		methods: {
			toggleTab(index) {
				console.log(index)
				this.tabIndex = index
			},
			//滑动切换swiper
			tabChange(e) {
				const tabIndex = e.detail.current
				this.tabIndex = tabIndex
				console.log(this.tabIndex)
			},
			goTo() {
				uni.navigateTo({
					url: '../../pages/resident-audit/residentAudit'
				})
			},
		}
	}
</script>

<style lang="scss">
	.swiper-tab-list {
		color: #969696;
		font-weight: bold;
	}

	.uni-tab-bar .active {
		color: #343434;
	}

	uni-view {
		width: 100%;
	}

	.swiperTxt {
		display: flex;
		justify-content: space-around;
		padding-bottom: 15rpx;
	}

	.active .swiper-tab-line {
		border-bottom: 6upx solid blue;
		width: 70upx;
		margin: auto;
		border-top: 6upx solid blue;
		border-radius: 20upx;
	}

	.uni-swiper-tab {
		border-bottom: 1upx solid #eeeeee;

	}

	.notice {
		margin-top: 10rpx;
		padding: 24rpx 20rpx;
		background: $uni-white;

		&-card {
			display: flex;
			align-items: center;
			height: 192rpx;
			margin-bottom: 24rpx;
			background: #f8f8f8;

			// margin: 20rpx;
			&-image {
				flex-shrink: 0;
				width: 200rpx;
				height: 200rpx;
				margin-right: 52rpx;

				&-image img {
					width: 100%;
					height: 100%;
				}
			}

			&-greyImage {

				flex-shrink: 0;
				width: 200rpx;
				height: 200rpx;
				margin-right: 52rpx;
				opacity: 0.6;
				filter: alpha(opacity=60);

				&-image img {
					width: 100%;
					height: 100%;
					background: #000;
				}
			}


			&-content {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				width: calc(100% - 188rpx);
				height: 150rpx;
				align-items: center;

				&-text {
					font-size: 24rpx;
					font-weight: bold;
				}

				&-time {
					font-size: 24rpx;
					color: #95A1A6;
				}

				&-btn {
					border: 1px solid blue;
					text-align: center;
					font-size: 16rpx;
					color: blue;
					float: right;
				}
			}
		}
	}
</style>
