<template>
	<view class="wrap"  @click="previewImage([photoImg],0)">
		<uniCard>
			<view class="wrapcon">
					<image style="width: 100%;height: 100%;" :src="photoImg"></image>
			</view>
		</uniCard>
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
			...mapState('residentAudit',['photoImg'])
		},
		components:{
			uniCard
		},
		methods:{
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
	.wrap {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.wrapcon{
		
			width: 640rpx;
			height: 480rpx;
		
	}
</style>
