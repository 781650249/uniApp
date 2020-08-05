<template>
	<view>
		<view class="face-side"  @click="previewImage([faceInfo],0)">
			<view class="face-text">人像面</view>
			<uniCard style="padding: 0;">
				<view class="wrap"><image style="width: 100%;height: 100%;" :src="faceInfo"></image></view>
			</uniCard>
		</view>
		
		<view class="police-slide" @click="previewImage([creditInfo],0)">
			<view class="police-text">警徽面</view>
			<uniCard >
				<view class="wrap">	<image style="width: 100%;height: 100%;"  :src="creditInfo"></image></view>
			</uniCard>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
	     data(){
		  return {
		  }	
		},
		computed:{
			...mapState('residentAudit',['faceInfo','creditInfo'])
		},
		components:{
			uniCard
		},
		methods: {
		   previewImage(urls, current) {
		   	uni.previewImage({
		   		urls,
		   		current
		   	});
		   },
		},
	}
</script>

<style lang="scss">
	.face {
		&-slide {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		&-text {
			text-indent: 24rpx;
			color: #ABABAB;
			font-size: 30rpx;
		}
	}
	.wrap {
		width: 640rpx;
		height: 480rpx;
	}
	.uni-card {
		// margin: 16rpx;
		padding: 0px !important;
	}
	.police {
		&-slide {
			
		}
		&-text {
			text-indent: 24rpx;
			color: #ABABAB;
			font-size: 30rpx;
		}
	}
</style>
