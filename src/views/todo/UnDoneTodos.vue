<template>
    <div class="un-done-todos">
        <todo-item-vue :key="t.id" v-for='t in unDoneTodos' :todo="t"/>
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
        unDoneTodos(){
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
.un-done-todos{
    max-height: 500px;
    overflow-y: auto;
    
   
}
</style>