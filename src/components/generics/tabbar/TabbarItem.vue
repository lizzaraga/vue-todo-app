<template>
    <div @click="onClick" class="x-tabbar-item" :class="{'active': active}">
        <slot v-bind="{active}"/>
    </div>
</template>
<script>
export default {
    data(){
        return {
            index : 1,

        }
    },
    watch:{
        active(value){
            if(value){
                this.$parent.currentEl = this.$el
            }
        }
    },
    computed:{
        active(){
            return this.$parent.innerIndex == this.index
        }
    },
   
    methods:{
        async onClick(){
            if(this.$parent.innerIndex != this.index){
                this.$parent.innerIndex = this.index
                this.$emit('active')
                this.$emit('click')
            }
            
        }
    }
}
</script>
<style lang="scss">
.x-tabbar-item{
    cursor: pointer;
    background-color: transparent;
    color: #888;
    transition: all 0.3s linear;
    //background-color: #ccc;
    &:hover{
        color: #000;
    }
    
}
</style>