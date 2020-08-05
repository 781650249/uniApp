const baseURL = 'https://smartpark.bywin.cn:8198/wechatapi'

// const baseURL = 'api'

class Request {
	constructor() {
		this.initOptions = {
			timeout: 1000 * 60,
			dataType: 'json',
			header: {},
		};
		this.baseURL = baseURL;
	}

	request(url, options = {}) {
		const nextOptions = {
			...this.initOptions,
			...options,
			url: `${this.baseURL}${url}`,
		};
		nextOptions.header.Authorization = uni.getStorageSync('token');
		return new Promise((resolve, reject) => {
			uni.request({
				...nextOptions,
				success: response => {
					 response['Set-Cookie']
					console.log(response,)
					const {
						statusCode,
						data
					} = response;
					if (statusCode === 200) {
						if (data.code === 'SUCCESS') {
							resolve(data);
						} else if (data.code === 'LOGOUT' || data.message === '当前没有登录') {
							// uni.switchTab({
							// 	url:'/pages/user-center/userCenter.vue'
							// })
							reject(data);
						} else {
							reject(data);
						}
					} else {
						reject(data);
					}
				},
				fail: error => {
					reject(error);
					// console.log(error);
				},
			});
		});
	}
	get(url, params = {}, options = {}) {
		return this.request(url, { ...options,
			method: 'GET',
			data: params
		});
	}
	post(url, params = {}, options = {}) {
		return this.request(url, { ...options,
			method: 'POST',
			data: params
		});
	}
}

const request = new Request();

export default request;
