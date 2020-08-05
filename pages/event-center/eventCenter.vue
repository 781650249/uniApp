<template>
	<view class="notice"  :style="{ height: tabsNav +'px'}">

		<scroll-view scroll-y="true" @scrolltolower="treatedListLoading" style="height: 100%;" >
			<view class="notice-item" v-for="(item, index) in list" :key="index" @click="onSelect('event-detail')">
				<navigator :url="`./eventDetail?eventType=${item.eventType}&yjid=${item.yjid}`">
					<view class="notice-card">
						<image class="notice-card-image" mode="aspectFit" :src="item.tpurl"></image>
						<view class="notice-card-content">
							<text class="notice-card-content-text">{{ item.address | ellipsis }}</text>
							<text class="notice-card-content-time">{{ item.sjfssj }}</text>
						</view>
					</view>
				</navigator>
			</view>
			<uni-load-more :status="triggered" :contentText="contentText" color="#D6D6D6"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				tabsNav:'',
				triggered: 'noMore',
				contentText: {
					contentdown: '下拉加载更多',
					contentrefresh: '正在加载更多',
					contentnomore: '没有更多数据了'
				},
			}
		},
		computed: {
			...mapState('eventCenter', ['page', 'size', 'list','total']),
			params() {
				const {
					page,
					size,
				} = this;
				const params = {
					page,
					size
				}
				return params
			}
		},
		watch: {
			params() {
				this.getListWithoutClassify({ ...this.params
				})
			}
		},
		filters: {
			ellipsis(value) {
				if (!value) return ''
				if (value.length > 21) {
					return value.slice(0, 21) + '...'
				}
				return value
			}
		},
		methods: {
			...mapActions('eventCenter', ['getListWithoutClassify']),
			...mapMutations('eventCenter', ['setPage','setList']),
			onSelect: route => {
				uni.navigateTo({
					url: `../event-detail/${route}`
				})
			},
			treatedListLoading(e) {
				const {
					page,
					total
				} = this
				if (page * this.size > total) {
					this.triggered = 'noMore';
				} else {
					this.triggered = 'more';
					this.setPage(this.page + 1)
				}

			}
		},
		onLoad() {
			this.getListWithoutClassify({
				...this.params
			})
		},
		mounted() {
			uni.getSystemInfo({
				success: res => {
					this.tabsNav = res.windowHeight;
				}
			})
		},
		onUnload() {
			this.setList({
				list: '',
				total:0
			})
		}
	}
</script>

<style lang="scss">
	.notice {
		margin-top: 10rpx;
		padding: 24rpx 20rpx;
		flex: auto;
		overflow: hidden;
		box-shadow: $shadow;

		&-item {
			background-color: $background-color;
		}

		&-card {
			display: flex;
			align-items: center;
			padding: 0 36rpx 0 20rpx;
			height: 192rpx;
			margin-bottom: 24rpx;
			// background: #ffffff;
			border-radius: 3px;
			box-shadow: 0 2px 8px #e9e9e9;

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

			&-content {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				width: calc(100% - 188rpx);
				height: 108rpx;

				&-text {
					font-size: 24rpx;
				}

				&-time {
					font-size: 24rpx;
					color: #95A1A6;
				}
			}
		}
	}
</style>
