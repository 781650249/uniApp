<template>
	<view class="page-wrap">
		<uniCard>
			<view class="page-head">
				<!-- <text class="page-text">小区户花园楼道灯不亮,门口台阶瓷砖破损严重物业请妥善清理</text> -->
			</view>
			<view class="page-center">
				<view class="page-left">
					<view v-for="(item,index) in events" :key="index">
						{{item.txt}}
					</view>
				</view>

				<view class="page-right">
					<view style="text-align: right;white-space: nowrap;">
						<view>{{eventDetail.address}}</view>
						<view>{{eventDetail.sjfssj}}</view>
						<view>{{eventDetail.yjlx}}</view>
					</view>
				</view>
			</view>

			<view class="page-footer">
				<view class="page-Image" @click="previewImage([eventDetail.tpurl], 0)">
					<img :src="eventDetail.tpurl" alt="" />
				</view>
				<view v-for="(item, i) in Array.from({ length: 3 })" :key="item" style="width: 152rpx"></view>
			</view>
		</uniCard>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				eventType: '',
				yjid: '',
				events: [{
						key: 0,
						txt: '发生地点'
					},
					{
						key: 1,
						txt: '发生时间'
					},
					{
						key: 2,
						txt: '事件行为'
					},
				],
				eventsInfo: [
				],

			}
		},
		
		computed: {
			...mapState('eventCenter', ['eventDetail'])
		},
		components: {
			uniCard
		},
		methods: {
			...mapActions('eventCenter', ['getEventDetail']),
			previewImage(urls, current) {
				uni.previewImage({
					urls,
					current
				});
			},
		},
		onLoad(options) {
			this.yjid = options.yjid;
			this.eventType = options.eventType
			this.getEventDetail({
				eventType: this.eventType,
				yjid: this.yjid
			})
		}
	}
</script>

<style lang="scss">
	.page {
		&-wrap {
			background-color: $background-color;
			box-shadow: $shadow;
		}

		&-head {
			// border-bottom: 1px solid #C0C0C0;
			// padding: 30rpx 0;
		}

		&-text {
			// font-weight: bold;
			line-height: 60rpx;
		}
	}


	.page {
		&-center {
			padding: 17rpx 20rpx;
			display: flex;
			flex-flow: row;
		}

		&-left {
			width: 300rpx;
			font-weight: bold;
			margin: 10rpx;
			line-height: 60rpx;
		}

		&-right {
			flex: 1;
			color: #ABABAB;
			margin: 10rpx;
			line-height: 60rpx;
		}
	}

	.page {
		&-footer {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 48rpx;
		}

		&-Image {
			width: 152rpx;
			height: 152rpx;
			margin-bottom: 16rpx;
			background-color: #ccc;
			    img {
			      width: 100%;
			      height: 100%;
			      object-fit: contain;
			    }
		}


	}
</style>
