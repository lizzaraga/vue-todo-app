<template>
    <div class="todo-item">
        <span>{{todo.title}}</span>
        <input type="checkbox" :checked="todo.done" @change="onUpdate($event, todo)" />
    </div>
</template>
<script>
import todoMixin from '../../mixins/todo.mixin'


export default {
    mixins: [todoMixin],
    props:{
        todo: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            timeoutId: 0
        }
    },
    methods:{
        onUpdate($event, todo){
            this.timeoutId = setTimeout(() => {
                todo.done = $event.target.checked

                clearTimeout(this.timeoutId)
            }, 150);
        }
    }
}
</script>
<style lang="scss" scoped>
.todo-item{
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border-bottom: 1px solid #ddd
}
</style>