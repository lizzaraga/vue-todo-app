<template>
    <transition :name="animationName">
        <div ref="parent" class="x-slider-item" v-show="active">
            <slot />
        </div>
    </transition>
</template>
<script>
export default {
    data(){
        return {
            index: null,
            updateHeightTimeoutID: 0
        }
    },
    watch:{
        active(n){
            if(n){
               this.startHeightUpdate()
            }
        }
    },
    computed:{
        active(){
            return this.index == this.$parent.innerIndex
        },
        animationName(){
            return this.$parent.animationName
        },
        
    },
    methods:{
        startHeightUpdate(){
            const child = this.$refs.parent.children[0]
            const parent = this.$parent
            this.updateHeightTimeoutID = setTimeout(() => {
                const rect = child.getBoundingClientRect()
                parent.currentChildHeight = rect.height

                clearTimeout(this.updateHeightTimeoutID)
            }, 10);
        },

        forceHeightUpdate(){
            if(this.active){
               this.startHeightUpdate()
            }
           
               
        }
    }
}
</script>
<style lang="scss">
.x-slider-item{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.fade-enter, .fade-leave-to{
    opacity: 0;
}

.fade-enter-active, .fade-leave-active{
    transition: opacity 5s linear;
}


</style>