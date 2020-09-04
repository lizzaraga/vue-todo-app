import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import TodoApp from "../views/todo/TodoApp.vue"

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'todo-app',
    component: TodoApp
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
