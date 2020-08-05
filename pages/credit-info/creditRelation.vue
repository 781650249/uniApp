<template>
	<view class="wrap">
		<view class="wrap-block" v-for="(item,index) in relationPhotos" @click="previewImage([item.avatar],0)">
			
		<view class="wrap-block-content">
			
			<image style="	width: 152rpx;
				height: 152rpx;"
			  :src="item.avatar"/>
			
			</view>
		</view>
		<!-- <view v-for="(_,i) in Array.from({length:1})" :key="`${i}-${i}`"></view> -->
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

			}
		},
		computed:{
			...mapState('creditInfo', ['relationPhotos','imgPid']),
			...mapMutations('creditInfo',['setPid']),
		},
		onLoad() {
			this.getRelationEntity({
				pid:`${this.imgPid}`
			})
		},
		methods: {
			...mapActions('creditInfo', ['getRelationEntity']),
			previewImage(urls, current) {
				uni.previewImage({
					urls,
					current
				});
			},
		}
	}
</script>

<style lang="scss">
	.wrap {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		
		&-block {
			
				img {
					 width: 100%;
					 height: 100%;
					 object-fit: contain;
				}
			&-block-content{
				position: relative;
			}
			&-block-content:after {
				
				content: "";
				position: absolute;
				left: 160rpx;
				top: 20rpx;
				// left: 20px;
				height: 0rpx;
				width: 0rpx;
				background-color: #FF0000;
				border-top: 10rpx solid #ABABAB;
				border-bottom: 10rpx solid transparent;
				border-right: 10rpx solid transparent;
				border-left: 10rpx solid transparent;
			}
		}
		
	}
	
</style>
