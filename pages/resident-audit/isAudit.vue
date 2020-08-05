<template>
	<view class="tabs">
		<view class="tabs-nav">
			<view class="tabs-nav-list">
				<view class="tabs-tab" id="fTab0" :class="{ 'tabs-tab-active': auditStatus === '0' }" @click="setStatus('0')">
					待审核
				</view>
				<view class="tabs-tab" id="fTab1" :class="{ 'tabs-tab-active': auditStatus === '1' }" @click="setStatus('1')">
					已审核
				</view>
				<view class="tabs-ink-bar" :style="{ left: `${barLeft}px` }"></view>
			</view>
		</view>

		<view class="tabs-content">
			<swiper style="height: 100%;" :current-item-id="auditStatus" :duration="300" @change="setStatus($event.detail.currentItemId)">
				<swiper-item item-id="0" style="padding: 0">
					<scroll-view scroll-y="true" @scrolltolower="unAuditedListLoading" style="height: 100%;">
						<view class="list">
							<view class="list-item" v-for="(item, i) in untreated.list" :key="i">
								<view class="list-item-cover">
									<img :src="item.xp" alt="" mode="aspectFit" />
								</view>
								<view class="list-item-content">
									<view class="list-item-title">
										{{ item.xm +'' | ellipsis }} <text style="font-size: 30rpx;color: rgb(0,0,0,0.3); margin-left: 10rpx;">({{item.ypzgxdm}})</text>
										<view style="padding-top: 40rpx; font-size: 30rpx;color: rgb(0,0,0,0.3)"> {{ item.xqmc  }}</view>
									</view>

									<view style="height: 200rpx;">
										<button @click="goTo(item.id)" class="list-item-btn">去审核</button>
									</view>


								</view>
							</view>
							<uni-load-more :status="triggered" :contentText="contentText" color="#D6D6D6"></uni-load-more>
						</view>
					</scroll-view>
				</swiper-item>


				<swiper-item item-id="1" style="padding: 0">
					<scroll-view scroll-y="true" @scrolltolower="AuditedListLoading" style="width: auto; height: 100%;">
						<view class="list">
							<view class="list-item" v-for="(item, i) in treated.list" :key="i" @click="goDetail(item.id)">
								<!-- <navigator url="./auditDetail?id"> -->
								<view class="list-item-cover">
									<img :src="item.xp" alt="" />
								</view>
								<view class="list-item-content">
									<view class="list-item-title ellipsis-mulitiple-2">
										{{ item.xm +'' | ellipsis }}<text style="font-size: 30rpx;color: rgb(0,0,0,0.3); margin-left: 10rpx;">({{item.ypzgxdm}})</text>
										<view style="padding-top: 20rpx; font-size: 30rpx;color: rgb(0,0,0,0.3);"> {{ item.xqmc   }}</view>
									</view>

								</view>
								<!-- </navigator> -->
							</view>
							<uni-load-more :status="triggered" :contentText="contentText" color="#D6D6D6"></uni-load-more>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';

	export default {
		data() {
			return {

				barLeft: 0,
				tabsNav: '',
				heightS: '',
				triggered: 'noMore',
				contentText: {
					contentdown: '下拉加载更多',
					contentrefresh: '正在加载更多',
					contentnomore: '没有更多数据了'
				},
			};
		},
		computed: {
			...mapState('residentAudit', ['auditStatus', 'treated', 'untreated', 'pageSize']),
		},
		filters: {
			ellipsis(value) {
				if (!value) return ''
				if (value.length > 4) {
					return value.slice(0, 4) + '...'
				}
				return value
			}
		},
		methods: {
			...mapActions('residentAudit', ['getList']),
			...mapMutations('residentAudit', ['setStatus','setUntreatedList','setTreatedList']),
			goTo(id) {
				uni.navigateTo({
					url: `./residentAudit?id=${id}`
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: `./auditDetail?id=${id}`
				})
			},
			unAuditedListLoading() {
				const {
					pageNum,
					total
				} = this.untreated;

				console.log(pageNum, total)
				if (pageNum * this.pageSize > total) {
					this.triggered = 'noMore';
				} else {
					this.triggered = 'loading';
					this.getList({
						auditNode: 3,
						pageNum: pageNum + 1,
						isNodeAudited: this.auditStatus,
						pageSize: 10
					});

				}

			},
			AuditedListLoading() {
				const {
					pageNum,
					total
				} = this.treated;
				if (pageNum * this.pageSize > total) {
					this.triggered = 'noMore';
				} else {
					this.triggered = 'more';
					this.getList({
						auditNode: 3,
						pageNum: pageNum + 1,
						isNodeAudited: this.auditStatus,
						pageSize: 10
					});
				}

			},
			setBarLeft() {
				const query = uni.createSelectorQuery().in(this);
				query.select(`#fTab${this.auditStatus}`).boundingClientRect(({
					left,
					width
				}) => {
					this.barLeft = left + width / 2
				}).exec()
			},

		},
		watch: {
			auditStatus() {
				this.setBarLeft()
			}
		},
		mounted() {
			this.setBarLeft()
			this.getList({
				pageNum: 1,
				isNodeAudited: '0',
				pageSize: 10,
				auditNode: 3,
			});


			this.getList({
				pageNum: 1,
				isNodeAudited: '1',
				pageSize: 10,
				auditNode: 3,
			});

		},
		onUnload() {
			this.setUntreatedList({
					list: [],
					pageNum: 1,
					total: 0,
				})
				this.setTreatedList({
					list: [],
					pageNum: 1,
					total: 0,
				})
		}

	};
</script>

<style lang="scss">
	.tabs {
		display: flex;
		flex-direction: column;
		height: 100%;

		&-nav {
			height: 100rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			overflow: auto;

			&-list {
				position: relative;
				display: flex;
				justify-content: space-between;
			}
		}

		&-tab {
			text-align: center;
			position: relative;
			flex: 1;
			flex-shrink: 0;
			height: 96rpx;
			margin: 0;
			padding: 0 24rpx;
			color: $tabs-nav-color;
			font-size: 28rpx;
			line-height: 96rpx;
			text-align: center;
			transition: color 0.3s;

			&-active {
				color: $tabs-nav-active-color;
			}
		}

		&-ink-bar {
			position: absolute;
			bottom: 0;
			width: 48rpx;
			height: 10rpx;
			background-color: $primary-color;
			transform: translate(-50%, 0);
			transition: left 0.3s;
		}

		&-content {
			flex: auto;
			overflow: hidden;
			height: calc(100% - 120rpx)
		}

		.list {
			margin: 0 32rpx 32rpx;
			border-radius: 16rpx;
			background-color: $background-color;
			box-shadow: $list-shadow;

			&-item {
				position: relative;
				display: flex;
				height: 208rpx;
				padding: 24rpx;
				padding-bottom: calc(24rpx - 1px);
				border-bottom: 1px solid darken($background-color-base, 2);

				&-cover {
					flex-shrink: 0;
					width: 160rpx;
					height: 160rpx;
					background-color: darken($background-color-base, 5);

					img {
						width: 100%;
						height: 100%;
						object-fit: contain;
					}
				}

				&-content {

					display: flex;
					flex: auto;
					flex-direction: column;
					justify-content: space-between;
					padding: 30rpx;
					// overflow: hidden;

				}

				&-btn {
					text-align: center;
					font-size: 24rpx;
					color: $primary-color;
					position: absolute;
					padding: 0 24rpx;
					right: 30rpx;
					box-shadow: 0 0 0 2rpx $primary-color;
					transition: color 0.3s, box-shadow 0.3s;
					cursor: pointer;
					top: 60rpx;

					&:active {
						color: rgba($primary-color, 0.65);
						box-shadow: 0 0 0 2rpx rgba($primary-color, 0.65);
					}
				}

				&-title {
					font-size: 34rpx;
					line-height: 42rpx;
					color: $list-item-title-color;
				}

				&-txt {
					font-size: 16rpx !important;
					color: #ABABAB;
				}

				&-time {
					font-size: 30rpx;
					line-height: 40rpx;
					color: $list-item-describe-color;
				}
			}
		}
	}
</style>
