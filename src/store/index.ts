import Vue from 'vue'
import Vuex from 'vuex'
import { TodoModule } from './modules/todo.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    todo: TodoModule
  }
})
