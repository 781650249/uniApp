import {
	getToken,
	getUserinfo,
	wechatLogin
} from '@/services/user.js';

const initState = {
  token: uni.getStorageSync('token') || '',
  userinfo: uni.getStorageSync('userinfo') || {
    avatar: '',
    name: '',
    account: '',
  },
};


export default {
	namespaced: true,
	state: {
		...initState
	},
	getters: {},
	actions: {
		async wechatLogin({
			commit
		}, params) {
			let token = ''
			try {
				const res = await wechatLogin({ ...params
				})
				token = res.data;
				uni.setStorageSync('token', token)
				commit("setToken", token)
			} catch (e) {
				console.log(e)
				token = ''
				if (Object.prototype.toString.call(e) === '[object Object]') {
					uni.showToast({
						title: e.message || '登录失败',
						icon: 'none'
					});
				}
			}
			return token;
		},
		
		async getToken({
			commit,
			state
		}, params) {
			let token = '';
			try {
				const res = await getToken({ ...params,
					role: 'property'
				});
				console.log(res)
				token = res.data;
				uni.setStorageSync('token', token);
				commit('setToken', token);
			} catch (e) {
				console.log(e)
				//TODO handle the exception
					uni.showToast({
						title: e.message || '登录失败',
						icon: 'none'
					});
			}
			return token;
		},
		async getUserinfo({
			commit,
			state
		}) {
			try {
				const {
					data
				} = await getUserinfo();
				const userinfo = {
					// account: '176 0597 ****',
					...data,
				};
				commit('setUserinfo', userinfo);
				uni.setStorageSync('userinfo', userinfo);
				return userinfo;
			} catch (e) {
				//TODO handle the exception
				return {};
			}
		},
		
	},

	mutations: {
		setToken(state, token) {
			state.token = token;
		},
		setUserinfo(state, userinfo) {
			state.userinfo = { ...state.userinfo,
				...userinfo
			};
		},
		setState(state, payload) {
			Object.keys(payload).forEach(el => {
				state[el] = payload[el]
			})
		},
		clear(state) {
			state.token = '';
			state.userinfo = {
				avatar: '',
				name: '',
				account: '',
			};
		},
	},
};
