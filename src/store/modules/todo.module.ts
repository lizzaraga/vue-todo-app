import { Module } from 'vuex';
import { Todo } from '@/models/todo.model';



export interface TodoModuleState{
    todos: Todo[];
}

export const TodoModule: Module<TodoModuleState, {}> = {
    namespaced: true,
    state:{
        todos :  []
    },
    mutations:{
        ADD_TODO (state, todo: Todo){
            state.todos.unshift(todo)
        },
        REMOVE_TODO(state, todo: Todo){
            state.todos = state.todos.filter((t)=> t.id != todo.id)
        },

        
    },
    getters:{
        todos(state){
            return state.todos
        },
        unDoneTodos(state){
            return state.todos.filter(t => t.done == false)
        },
        doneTodos(state){
            return state.todos.filter(t => t.done == true)
        }
    },
    actions:{
        addTodo({commit}, todo: Todo){
            commit("ADD_TODO", todo)
        },
        removeTodo({commit}, todo: Todo){
            commit("REMOVE_TODO", todo)
        },
       
    }

}