<template>
    <div id="todo-app" class="match-parent">
        <div class="todo-container">
            <div class="todo-tabbar">
                <tabbar-vue center @indexChanged="onTabIndexChanged">
                    <tabbar-item-vue>
                        <div class="todo-tabbar-option">TO DO ({{taskUnDoneCount}})</div>
                    </tabbar-item-vue>
                     <tabbar-item-vue>
                        <div class="todo-tabbar-option">DONE ({{taskDoneCount}})</div>
                    </tabbar-item-vue>
                </tabbar-vue>
            </div>

             <div class="slider-wrapper" :style="sliderWrapperStyle">
                 <margin-vue top="0px"/>
                <slider-vue :index="sliderIndex"
                @childHeightChanged="onChildHeightChanged"
                style="overflow-y: auto"
                >
                    <slider-item-vue>
                        <un-done-todos-vue/>
                        
                    </slider-item-vue>
                    <slider-item-vue>
                        <done-todos-vue/>
                    </slider-item-vue>
                </slider-vue>
            </div>
            <div class="add-todo-button-container">
                <form-input-vue
                lightPlaceholder
                label="New todo"
                v-model="newTodo.title"
                @keyup.enter="onAddNewTodo"
                wrapperFocusStyle="border: none"
                wrapperBlurStyle="border: none"
                labelFocusStyle="color: #f0f0f0; background-color: transparent"
                labelBlurStyle="background-color: transparent; color: #fafafa"
                placeholder="Enter name"
                />
            </div>

        </div>
    </div>
</template>
<script>
import TabbarVue from '../../components/generics/tabbar/Tabbar.vue'
import TabbarItemVue from '../../components/generics/tabbar/TabbarItem.vue'
import SliderVue from '../../components/generics/slider/Slider.vue'
import SliderItemVue from '../../components/generics/slider/SliderItem.vue'
import MarginVue from '../../components/generics/layouts/Margin.vue'
import FormInputVue from '../../components/generics/forms/FormInput.vue'

import DoneTodosVue from './DoneTodos.vue'
import UnDoneTodosVue from './UnDoneTodos.vue'

//mixin

import todoMixin from '../../mixins/todo.mixin'

export default {
    mixins: [todoMixin],
    components:{
       TabbarVue, TabbarItemVue,
       SliderVue, SliderItemVue,
       MarginVue,
       DoneTodosVue, UnDoneTodosVue,
       FormInputVue
    },
    data(){
        return {
            sliderIndex : 0,
            sliderHeight: 0,
            newTodo: {
                title: ""
            }
        }
    },
    computed:{
        sliderWrapperStyle(){
            return `height: ${this.sliderHeight}px`
            // if(this.sliderHeight < 300)
            //     return `height: ${this.sliderHeight}px; overflow: none`
            // else
            //     return `height: ${this.sliderHeight}px; overflow-y: auto`
        },
        taskUnDoneCount(){
            return this.unDoneTodos.length
        },
        taskDoneCount(){
            return this.doneTodos.length
        }
    },
    methods:{
        onTabIndexChanged(index){
            this.sliderIndex = index
        },
        onChildHeightChanged(height){
            console.log("Height",height)
            this.sliderHeight = height
        },
        onAddNewTodo(){
            if(this.newTodo.title != ""){
                this.addTodo({
                    id: Date.now(),
                    title: JSON.parse(JSON.stringify(this.newTodo.title)),
                    done: false
                })
            }
            this.newTodo.title = ""
        }
    },

    mounted(){
        // [1,2,3].forEach(i => {
        //     this.addTodo({
        //         id: i,
        //         title: "Task "+i,
        //         done: false
        //     })
        // })
    }
}
</script>
<style lang="scss">

$todo-container-bg: #fff;
#todo-app{
    font-size: 14px;
    background-color: #9999fe;
    display: flex;
    align-items: center;
    justify-content: center;
    .todo-container{
        width: 380px;
        background-color: $todo-container-bg;
        position: relative;
        border-radius: 8px;
        display: grid;
        grid-template-rows: auto 1fr 50px;
        overflow: hidden;
        
        .todo-tabbar-option{
            padding: 20px 10px;
            margin: 0 25px;
            font-size: 0.7em;
            font-weight: bold;
            letter-spacing: 2.5px;
        }

        .slider-wrapper{
            padding: 0 20px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .add-todo-button-container{
            background-color: #5555ff;
            display: flex;
            align-items: center;
            padding: 0 20px;

           
        }
        
    }
    


}

.next-enter-active {
    animation: next-current-enter-animation 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.next-leave-active {
    
    animation: next-last-leave-animation 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.prev-enter-active {
    animation: prev-current-enter-animation 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.prev-leave-active {
    
    animation: prev-last-leave-animation 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes next-current-enter-animation {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        position: relative;
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes next-last-leave-animation {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(-100%);
        opacity: 0;
    }
}

@keyframes prev-current-enter-animation {
    from {
        position: relative;
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes prev-last-leave-animation {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
</style>