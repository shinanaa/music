import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutation'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug, // 开发过程中检测state的修改是否是通过mutation，建议开发环境中使用，线上环境不建议使用
  plugins: debug ? [createLogger()] : [] // 操作state过程中打印操作的日志
})
