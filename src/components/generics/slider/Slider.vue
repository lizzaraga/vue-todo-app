<template>
    <div class="x-slider">
       <slot v-bind="{animationName}"/>
    </div>
</template>
<script>
export default {
   
    props: {
        index: {
            type: Number,
            default: 0
        },
        nextAnimationName:{
            type: String,
            default: "next"
        },
        prevAnimationName:{
            type: String,
            default: "prev"
        },
        

    },

    watch: {
        index(n, o){
            this.innerIndex = n
            // if(this.innerIndex >= this.childrenCount) this.innerIndex = this.childrenCount - 1
            // if(this.innerIndex < 0) this.innerIndex = 0
            if(this.innerIndex > o){
                this.direction = "next"
            }
            else if (this.innerIndex < o)
                this.direction = "prev"
            this.$emit("indexChanged", this.innerIndex)

            //console.log(n, o, this.direction)
        },
        currentChildHeight(n){
            
            this.$emit("childHeightChanged", n)
        }
    },

    data(){
        return {
            direction: "next",
            childrenCount: 0,
            innerIndex: 0,
            currentChildHeight: 0
        }
    },
    computed: {
        animationName(){
            if(this.direction == "next") return this.nextAnimationName
            else return this.prevAnimationName
        }
    },
    mounted(){
       
        const children = this.$children

        this.childrenCount = children.length
        children.forEach((t, i) => {
            t.index = i
        })
    }
}
</script>
<style lang="scss">
.x-slider{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}


</style>