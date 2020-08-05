<template>
	<view class="houses">
		<view class="houses-screen">
			<picker :value="buildingIndex" :range="building" range-key="name" class="houses-screen-select" @change="handleBuildingChange">
				<text class="houses-screen-selected">{{ building[buildingIndex].name }}</text>
			</picker>
			<view class="houses-screen-select">
				<picker :value="unitIndex" :range="unit" range-key="name" @change="handleUnitChange">
					<text class="houses-screen-selected">{{ unit[unitIndex].name }}</text>
				</picker>
			</view>
			<view class="houses-screen-select">
				<picker :value="houseIndex" :range="house" range-key="name" @change="handleHouseChange">
					<text class="houses-screen-selected">{{ house[houseIndex].name }}</text>
				</picker>
			</view>
		</view>
		<scroll-view scroll-y="true" class="houses-list-wrap" @scrolltolower="handleNextLoading" style="height:100%;">
			<view class="houses-list">
				<view v-for="(item, i) in list" :key="i" class="houses-list-item">
					<navigator style="display: flex;" :url="`./houseDetail?name=${item.name}&id=${item.id}`">
						<view class="houses-list-item-cover">
							<img :src="item.imageUrl" alt="" />
						</view>
						<view class="houses-list-item-content">
							<view class="houses-list-item-name">{{ item.name }} <text style="font-size: 30rpx;color: rgb(0,0,0,0.3);margin-left: 14rpx;">({{item.relation}})</text></view>

							<view class="houses-list-item-address">{{ item.address }}</view>
						</view>
					</navigator>
				</view>
				<uni-load-more :status="triggered" :contentText="contentText" color="#D6D6D6"></uni-load-more>
			</view>
		</scroll-view>
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
				triggered: 'noMore',
				contentText: {
					contentdown: '下拉加载更多',
					contentrefresh: '正在加载更多',
					contentnomore: '没有更多数据了'
				},
				
				building: [{
					name: '选择楼栋',
					id: null
				}],
				buildingIndex: 0,
				unit: [{
					name: '选择单元',
					id: null
				}],
				unitIndex: 0,
				house: [{
					name: '选择房屋',
					id: null
				}],
				houseIndex: 0,
			};
		},
		computed: {
			...mapState('houses', ['list', 'page', 'pageSize', 'total']),
			...mapState('communityServ', ['AreaInfo', 'communityId']),
			params() {
				const {
					page,
					pageSize,
					buildingIndex,
					unitIndex,
					houseIndex
				} = this;
				const params = {
					page,
					pageSize
				};
				if (buildingIndex > 0) {
					params.ldxxbz = this.building[buildingIndex].id;
				}
				if (unitIndex > 0) {
					params.dyxxbz = this.unit[unitIndex].id;
				}
				if (houseIndex > 0) {
					params.fwxxbz = this.house[houseIndex].id;
				}
				return params;
			},
		},
		watch: {
			params() {
				this.getList({ ...this.params
				});
			},
		},
		mounted() {
			if (!this.AreaInfo) {
				uni.showToast({
					title: '请先选择小区',
					icon: 'none'
				})
				return false
			}
			this.getList({ ...this.params
			});
			this.getCommunityInfo(); //获取级联信息
		},

		methods: {
			// 获取小区列表  获取级联信息  获取所有住户信息列表 
			...mapActions('houses', ['getCommunity', 'getHouseCascade', 'getList']),
			...mapMutations('houses', ['setPage']),
			goDetail: (route) => {
				uni.navigateTo({
					url: `../house/${route}`
				})
			},
			async getCommunityInfo() {
				console.log(this.communityId)
				if(this.communityId){
					const building = await this.getHouseCascade({
						id: this.communityId
					});
					if (building){
						this.building = [...this.building, ...building];
					}	
				}
				
			},
			handleBuildingChange(e) {
				this.setPage(1);
				this.buildingIndex = e.target.value;
				this.unitIndex = 0;
				this.houseIndex = 0;
				this.unit = [{
						name: '选择单元',
						id: null
					},
					...(this.building[this.buildingIndex].unitList || []),
				];
				this.house = [{
					name: '选择房屋',
					id: null
				}];
			},
			handleUnitChange(e) {
				this.setPage(1);
				this.unitIndex = e.target.value;
				this.houseIndex = 0;
				this.house = [{
					name: '选择房屋',
					id: null
				}, ...(this.unit[this.unitIndex].houseList || [])];
			},
			handleHouseChange(e) {
				this.setPage(1);
				this.houseIndex = e.target.value;
			},
			handleNextLoading() {
				if (this.page * this.pageSize >= this.total) {
					this.triggered = 'noMore'
				} else {
					this.triggered = 'loading'
					this.setPage(this.page + 1);
				}

			},
		},
	};
</script>

<style lang="scss">
	.houses {
		height: 100%;

		&-screen {
			display: flex;
			height: 96rpx;
			padding-top: 16rpx;
			line-height: 80rpx;
			background-color: $background-color;

			&-select {
				flex: 1;
				font-size: 28rpx;
				text-align: center;

				&ed {
					position: relative;

					&::after {
						position: absolute;
						top: 50%;
						right: -30rpx;
						display: block;
						border: 10rpx solid transparent;
						border-top-color: $text-color;
						border-bottom-width: 0;
						transform: translate(0, -50%);
						content: '';
					}
				}
			}
		}

		&-list {
			padding: 32rpx 32rpx 0;

			&-wrap {
				height: calc(100% - 96rpx);
			}

			&-item {
				position: relative;
				display: flex;
				// height: 204rpx;
				margin-bottom: 24rpx;
				padding: 24rpx;
				padding-bottom: calc(24rpx - 1px);
				background-color: $background-color;
				border-radius: 8rpx;
				box-shadow: $shadow;

				&-cover {
					flex-shrink: 0;
					width: 156rpx;
					height: 156rpx;
					background-color: darken($background-color-base, 5);

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
					height: 156rpx;
					padding: 0rpx 0 16rpx 64rpx;
					overflow: hidden;
				}

				&-name {
					color: $list-item-title-color;
					font-weight: 500;
					font-size: 36rpx;
					line-height: 56rpx;
				}

				&-phone {
					position: absolute;
					top: 20rpx;
					right: 0;
					height: 48rpx;
					padding: 0 24rpx;
					color: $primary-color;
					line-height: 48rpx;
					text-decoration: none;
					box-shadow: 0 0 0 1px $primary-color inset;
					border-radius: 16rpx;
					box-sizing: border-box;
				}

				&-address,
				&-time {
					color: $list-item-describe-color;
					font-size: 30rpx;
					line-height: 40rpx;
				}
			}
		}
	}
</style>
