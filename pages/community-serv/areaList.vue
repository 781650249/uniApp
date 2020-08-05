<template>
	<view class="list-wrap">
		<uni-search-bar class="list-input" clearButton="none" bgColor="#fff" @input="input"></uni-search-bar>
		<view class="list-content">
			<block v-for="(item,index) in getAreaInfo" :key="item.communityId">
				<view class="list-content-item" @click="check(item)">{{item.communityName}}</view>
			</block>
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
				keyword: '',
			};
		},
	
		computed: {
			...mapState('communityServ', ['AreaInfo','index']),
			getAreaInfo() {
				return this.AreaInfo.filter(el => el.communityName.indexOf(this.keyword) !== -1)
			},
		
		},
		created() {
		
		},
		methods: {
			...mapActions('communityServ', ['getList','switchCommunityDataSource','getIndexStatisticsDataForPolice']),
			...mapMutations('communityServ', ['setArea','setAreaList','setCommunityId']),

			check(item) {
				this.setArea(item.index)
				this.switchCommunityDataSource({
					id: `${item.communityId}`
				})
				this.getIndexStatisticsDataForPolice()
				this.setCommunityId(item.communityId)
				setTimeout(()=>{
					uni.navigateBack()
				},300)
			},
			input: function(res) {
				this.keyword = res.value;
			},

		},




	}
</script>

<style lang="scss">
	.list {
		&-wrap {
			// position: absolute;
			// width: 100%;
			// height: 100%;
			// padding: 24rpx 0;
		}

		&-input {
			// position: absolute;
			width: calc(100% - 32rpx);
			margin: 0 auto;
			// padding: 0;
		}

		&-content {
			height: calc(100% - 36px - 32rpx);
			// margin-top: calc(36px + 32rpx);
			padding: 12rpx 16rpx;
			box-sizing: border-box;
			background: $uni-white;

			&-item {
				height: 96rpx;
				line-height: 96rpx;
				font-size: 16px;
				border-bottom: 1rpx solid #e5e5e5;
			}
		}
	}
</style>
