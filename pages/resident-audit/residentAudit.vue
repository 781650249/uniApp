<template>
	<view class="form-wrap">
		<view class="header">
			<view class="header-title">房屋信息</view>
		</view>
		<form @submit="onSubmit">
			<uni-card :is-shadow="isTrue">
				<uni-list>
					<uni-list-item title="小区" :show-arrow="false">
						<template v-slot:right="">
							<view>{{detail.xqmc}}</view>
						</template>
					</uni-list-item>
					<uni-list-item title="楼栋房号" :show-arrow="false">
						<template v-slot:right="">
							<view>{{detail.ldmc}}{{detail.fwbh}}</view>
						</template>
					</uni-list-item>
				</uni-list>
			</uni-card>

			<view class="header">
				<view class="header-title">住户基本信息</view>
			</view>

			<uni-card :is-shadow="isTrue">
				<uni-list>
					<uni-list-item title="姓名" :show-arrow="false">
						<template v-slot:right="">
							{{detail.xm}}
						</template>
					</uni-list-item>
					<uni-list-item title="身份" :show-arrow="false">
						<template v-slot:right="">
							{{detail.ypzgxdm}}
						</template>
					</uni-list-item>
					<uni-list-item title="性别" :show-arrow="false">
						<template v-slot:right="">
							{{detail.xbdm==="2"?'女':'男'}}
						</template>
					</uni-list-item>
					<uni-list-item title="民族" :show-arrow="false">
						<template v-slot:right="">
							{{detail.mzdm}}
						</template>
					</uni-list-item>
					
					<uni-list-item title="学历" :show-arrow="false">
						<template v-slot:right="">
							{{detail.xldm}}
						</template>
					</uni-list-item>
					
					<uni-list-item title="籍贯" :show-arrow="false">
						<template v-slot:right="">
							{{detail.jgssxdm }}
						</template>
					</uni-list-item>
					<uni-list-item title="居住地址" :show-arrow="false">
						<template v-slot:right="">
							{{detail.sjjzd | ellipsis}}
						</template>
					</uni-list-item>
					<uni-list-item title="证件号码" :show-arrow="false">
						<template v-slot:right="">
							{{detail.zjhm}}
						</template>
					</uni-list-item>
					<uni-list-item title="身份证照片" @click="onSelect('creditPhoto',detail.id)">
						<template v-slot:right="">
							<!-- <view>去采集</view> -->
						</template>
					</uni-list-item>
					<uni-list-item title="人脸照片" @click="onChoose('facePhoto',detail.id)">
						<template v-slot:right="">
							<!-- <view>去采集</view> -->
						</template>
					</uni-list-item>
				</uni-list>
			</uni-card>

			<view class="page-bottom">
					<button @click="updateUnStatusBtn"  class="form-btn">
						不通过
					</button>
					<button @click="updateStatusBtn"   class="form-btn" style="background-color: #4751F1;color: #FFFFFF;">通过</button>
			</view>
		</form>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import {
		mapState,
		mapActions
	} from 'vuex';
	export default {
		components: {
			uniCard
		},
		data() {
			return {
				isTrue: true,
				InfoId: ''
			}
		},
		computed: {
			...mapState('residentAudit', ['detail','photoImg','faceInfo','creditInfo'])
		},
		filters: {
			ellipsis(value) {
				if (!value) return ''
				if (value.length > 14) {
					return value.slice(0, 14) + '...'
				}
				return value
			}
		},
		methods: {
			...mapActions('residentAudit', ['getDetail', 'updateStatus']),
			onChoose: (route, InfoId) => {
				uni.navigateTo({
					url: `../resident-audit/${route}?id=${InfoId}`
				});
			},
			onSelect: (route, InfoId) => {
				uni.navigateTo({
					url: `../resident-audit/${route}?id=${InfoId}`
				});
			},
			updateUnStatusBtn(){
				this.updateStatus({id:this.InfoId,auditResult:2,auditNode:3})
				uni.navigateBack()
				
			},
			updateStatusBtn(){
				this.updateStatus({id:this.InfoId,auditResult:1,auditNode:3})
				uni.navigateBack()
			}
		},
		onLoad({
			id
		}) {
			this.InfoId  = id
			this.getDetail({
				id
			});
		},

	}
</script>

<style lang="scss">
	.form-wrap {
		overflow: auto;
	}
	.form-btn{
		width: 42% !important;
	}
	.form {
		height: 100%;

		&-wrap {
			height: 100%;
			background: $uni-white;

			.header {
				position: relative;
				height: 70rpx;
				line-height: 70rpx;

				// padding: 120rpx 52rpx 0 52rpx;
				&-title {
					color: #ABABAB;
					font-size: 30rpx;
					text-indent: 24rpx;
					height: 50rpx;

				}
			}

		}

		&-btn {
			width: 50%;
			display: inline-block !important;
			border: 1px solid transparent;
		}

	}

	.page-bottom {
		width: 100%;
		display: flex;
	}
</style>
