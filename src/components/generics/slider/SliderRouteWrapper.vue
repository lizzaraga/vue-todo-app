<template>
    <div class="x-slider-route-wrapper">
        <slot/>
    </div>
</template>
<script>
export default {
    mounted(){
        
        const child = this.$el.children[0]
        const parent = this.$parent.$parent.$parent
       
        setTimeout(() => {
            const rect = child.getBoundingClientRect()
            parent.currentChildHeight = rect.height
        }, 10);
    }
}
</script>

<style lang="scss" scoped>
.x-slider-route-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}
</style>
