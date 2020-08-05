<template>
	<view class="video">
		<!-- 		<view class="video-list-input">

		</view> -->
		<!-- <video :src="liveVideoUrl" :autoplay="true" /> -->
		<live-player :picture-in-picture-mode="mode" id="livePusher" @statechange="statechange" :src="liveVideoUrl"
		 @fullscreenchange="screenChange(direction,fullScreen)" autoplay>
			<cover-view class="viewFull"> </cover-view>
			<view v-if="isFull">
				<cover-view class="full" style="color: #C0C0C0;position: absolute;right: 24rpx;bottom: 24rpx;" @click="handFullSreen()">
					全屏 </cover-view>
			</view>
			<view v-else>
				<cover-view class="full" style="color: #C0C0C0;position: absolute;right: 24rpx;bottom: 24rpx;" @click="exitFull()">
					退出 </cover-view>
			</view>
		</live-player>
		<view class="video-list-wrap">
			<view class="video-list-header">
				<!-- <input :value="keyword" type="text" confirm-type="search" @input="handleSearchChange($event.detail.value)" /> -->

				<view class="list-left">
					<picker @change="bindPickerChange" :value="index" :range="AreaInfo" range-key="communityName">
						<view class="uni-input">{{ AreaInfo[index].communityName ? AreaInfo[index].communityName: '' | ellipsis}}</view>
					</picker>
				</view>
				<view class="list-right">
					<input placeholder="请输入关键字" :value="keyword" type="text" confirm-type="search" @confirm="input" />
				</view>
			</view>
			<scroll-view :scroll-top="scrollTop" @scroll="scroll" scroll-y="true" class="video-list" @scrolltolower="handleNextLoading"
			 style="height: 100%;">
				<view v-for="(item, i) in videoList.list" :key="i" class="video-list-item">
					<view class="video-list-item-content">
						<view class="video-list-item-title ellipsis">
							{{ item.cameraType }}
						</view>
						<view class="video-list-item-address ellipsis">
							{{ item.azdd }}
						</view>
						<view class="video-list-item-btn" @click="handlePlay(item.spbfbm)">查看视频</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				mode: ["push", "pop"],
				isFull: true,
				index: 0,
				src: '',
				keyword: '',
				triggered: 'noMore',
				contentText: {
					contentdown: '下拉加载更多', //more
					contentrefresh: '正在加载更多', //loading
					contentnomore: '没有更多数据了' //noMore
				},
				scrollTop: 0,
				old: {
					scrollTop: 0
				}

			}
		},
		computed: {
			...mapState('videoLook', ['videoList', 'pageSize', 'AreaInfo', 'liveVideoUrl'])
		},
		filters: {
			ellipsis(value) {
				if (!value) return ''
				if (value.length > 5) {
					return value.slice(0, 4)
				}
				return value
			}
		},
		methods: {
			...mapActions('videoLook', ['selectCameraListByCommunity', 'getList', 'getPlayLiveVideoUrl']),
			...mapMutations('videoLook', ['setState', 'setliveVideoUrl']),
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			screenChange(m1, m2) {
				console.log(m1, m2)
			},
			statechange(e) {
				console.log('live-player code:', e.detail.code)
				if (e.detail.code === 2004) {
					uni.showToast({
						icon: 'none',
						title: '视频播放开始'
					})
				} else if (e.detail.code == -2301) {
					uni.showToast({
						icon: 'none',
						title: '网络连接断开，请检查设备是否开启'
					})
				}
			},

			//切换小区
			bindPickerChange(e) {
				const {
					keyword,
					pageNum,
					list
				} = this.videoList;
				this.$store.state.list = []
				this.$store.state.pageNum = 1
				this.index = e.target.value
				this.$store.state.communityId = this.AreaInfo[this.index].communityId
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				this.selectCameraListByCommunity({
					pageNum: 1,
					pageSize: 10,
					communityId: this.AreaInfo[this.index].communityId,
					keyword: keyword
				})
			},
			//下拉刷新
			handleNextLoading() {
				const {
					pageNum,
					total,
					communityId,
					keyword
				} = this.videoList;
				if (pageNum * this.pageSize > total) {
					this.triggered = 'noMore'
				} else {
					this.triggered = 'loading'
					this.$store.state.pageNum = 1
					//存取它的value 和 地区
					this.selectCameraListByCommunity({
						pageNum: pageNum + 1,
						pageSize: 10,
						keyword: keyword,
						communityId: communityId
					})
				}

			},

			//输入搜索
			input(res) {
				const {
					communityId
				} = this.videoList;
				console.log(res.target.value)
				this.$store.state.keyword = res.target.value
				this.$store.state.list = []
				this.$store.state.pageNum = 1
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});

				this.selectCameraListByCommunity({
					pageNum: 1,
					pageSize: 10,
					communityId: communityId,
					keyword: `${res.target.value}`
				})

			},
			handFullSreen() {
				var _that = this
				this.context = uni.createLivePlayerContext('livePusher', this);
				this.context.requestFullScreen({
					direction: -90,
					complete: function() {
						_that.$nextTick(() => {
							_that.isFull = false
						})
						console.log(_that.isFull)
					}
				})
			},
			exitFull() {
				var _that = this
				this.context = uni.createLivePlayerContext('livePusher', this);
				this.context.exitFullScreen()
				_that.$nextTick(() => {
					_that.isFull = true
				})

			},
			handlePlay(id) {
				// 点播视频
				this.setliveVideoUrl('')
				this.getPlayLiveVideoUrl({
					"deviceId": `${id}`,
					"protocol": 'flv',
				})
			}
		},
		onLoad() {
			//获取小区列表
			this.getList()
			//获取摄像头列表
			this.selectCameraListByCommunity({
				pageNum: 1,
				pageSize: 10,
				communityId: '',
				keyword: ''
			})
			//获取直播
			this.getPlayLiveVideoUrl({
				"deviceId": 'liveVideoUrl',
				"protocol": 'flv',
			})
		},
		onUnload() {
			this.setliveVideoUrl('')
		}
	}
</script>

<style lang="scss">
	.viewFull {

		width: 100%;
		height: 100%;
		background: transparent;
	}

	.video {
		display: flex;
		flex-direction: column;
		height: 100%;

		video {
			flex-shrink: 0;
			width: 100%;
			height: 450rpx;
		}

		live-player {
			flex-shrink: 0;
			width: 100%;
			height: 450rpx;
			overflow-y: hidden;
		}

		&-top {
			height: 160rpx;
		}

		&-list {
			flex: auto;
			overflow: auto;

			// height: calc(100% - 503rpx);
			&-wrap {
				display: flex;
				flex-direction: column;
				flex: auto;
				overflow: hidden;
				height: calc(100% - 450rpx - 52rpx);
			}

			&-input {
				height: 104rpx;
				position: absolute;
				width: calc(100% - 32rpx);
				margin: 16rpx;
				padding: 0;

			}

			&-header {
				flex-shrink: 0;
				height: 120rpx;
				margin-bottom: 1px;
				padding: 16rpx 24rpx;
				background-color: $background-color;
				position: relative;
				display: flex;
				// justify-content: space-around;
				// align-items: center;
				flex-flow: row;

				input {
					height: 72rpx;
					line-height: 72rpx;
					background-color: $background-color-base;
					border-radius: 36rpx;
					padding: 0 24rpx;
				}

			}


			&-item {
				position: relative;
				display: flex;
				height: 208rpx;
				background-color: $background-color;
				margin-bottom: 2rpx;
				padding: 24rpx;

				&-cover {
					position: relative;
					flex-shrink: 0;
					width: 160rpx;
					height: 160rpx;
					background-color: $background-color-base;

					img {
						width: 100%;
						height: 100%;
						object-fit: contain;
					}
				}

				&-content {
					position: relative;
					display: flex;
					flex: auto;
					flex-direction: column;
					justify-content: space-between;
					padding: 16rpx 0 16rpx 32rpx;
					overflow: hidden;
				}

				&-btn {
					position: absolute;
					top: 16rpx;
					right: 24rpx;
					height: 60rpx;
					line-height: 60rpx;
					padding: 0 24rpx;
					color: $primary-color;
					font-size: 24rpx;
					border-radius: 8rpx;
					box-shadow: 0 0 0 2rpx $primary-color;
					transition: color 0.3s, box-shadow 0.3s;
					cursor: pointer;

					&:active {
						color: rgba($primary-color, 0.65);
						box-shadow: 0 0 0 2rpx rgba($primary-color, 0.65);
					}
				}

				&-title {
					width: calc(100% - 176rpx);
					font-size: 30rpx;
					line-height: 42rpx;
					color: $list-item-title-color;
				}

				&-address {
					font-size: 30rpx;
					line-height: 40rpx;
					color: $list-item-describe-color;
				}
			}
		}
	}

	.list-left {
		position: relative;
		width: 30%;
		overflow: hidden;
		text-align: left;
		height: 80rpx;
		line-height: 80rpx;
	}

	.uni-input {
		position: relative;
	}

	.uni-input:after {
		content: "";
		position: absolute;
		left: 164rpx;
		top: 34rpx;
		width: 0;
		height: 0;
		border-top: 10rpx solid #ABABAB;
		border-bottom: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-left: 10rpx solid transparent;
	}

	.list-right {
		flex: 1;
		margin: auto;
	}
</style>
