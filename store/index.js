import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { eventCenter,residentAudit,houses,videoLook,communityServ,addressList,user,creditInfo }  from './module/index.js'
import createLogger from 'vuex/dist/logger';
const debug = process.env.NODE_ENV !== 'production';


export default new Vuex.Store({
	modules: {
		user,
		videoLook,
	    residentAudit,
		addressList,
		communityServ,
		videoLook,
		eventCenter,
		houses,
		creditInfo
	},
	  strict: debug,
	  plugins: debug ? [createLogger()] : [],
});
