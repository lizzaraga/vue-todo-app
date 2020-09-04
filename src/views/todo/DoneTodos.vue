<template>
    <div class="done-todos">
        <todo-item-vue :key="t.id" v-for='(t) in doneTodos' :todo="t"/>
    </div>
</template>
<script>
import todoMixin from '../../mixins/todo.mixin'
import TodoItemVue from './TodoItem.vue'

export default {
    mixins: [todoMixin],
    components:{
        TodoItemVue
    },
    watch:{
        doneTodos(){
            this.forceHeightUpdate()
        }
    },
    methods:{
        forceHeightUpdate(){
            this.$parent.forceHeightUpdate()
        }
    }
}
</script>
<style lang="scss" scoped>
.done-todos{
    max-height: 500px;
    overflow-y: auto;
}
</style>