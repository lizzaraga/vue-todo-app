<template>
    <div class="x-tabbar" :class="{'column': vertical, 'center': center}" @resize="onResize">
        <slot/>
        <div ref="indicatorTrace" class="tabbar__indicator__trace" :class="indicatorClass"></div>
        <div ref="indicator" class="tabbar__indicator" 
         :style="indicatorStyle"></div>
    </div>
</template>
<script>
export default {
    props: {
        index:{
            type: Number,
            default : 0
        },
        center: {
            type: Boolean,
            default: false
        },
        indicatorClass:{
            type: String,
            default: ''
        },
        
        compute:{
            type: Boolean,
            default: true
        },
        indicatorSize:{
            type: Number,
            default: 2
        },
        indicatorColor:{
            type: String,
            default: "#000"
        },
        vertical:{
            type: Boolean,
            default: false
        },
        topIndicator:{
            type: Boolean,
            default: false
        },
        rightIndicator:{
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {
            innerIndex : 0,
            tabs: [],
            currentEl: null,
            offset: 0,
            indicatorWidth: 0,
            indicatorHeight: 0,
            
        }
    },
    watch:{
        currentEl(){
            this.setIndicatorDims()
            const rootRect = this.$el.getBoundingClientRect()
            const childRect = this.currentEl.getBoundingClientRect()
            if(this.vertical == false)
                this.offset = childRect.left - rootRect.left
            else
                this.offset = childRect.top - rootRect.top

        },

        index(n){
            console.log('index watch')
            this.innerIndex = n
        },

        innerIndex(n){
            this.$emit("indexChanged", n)
        }
    },
    computed:{
        indicatorStyle(){
            
            const direction = this.vertical ? "top" : "left"
            const dim = this.vertical ? "height" : "width"
            const dimValue = this.vertical ? this.indicatorHeight : this.indicatorWidth
            
            //console.log(dim, dimValue, direction, this.offset)
            
            if(this.indicatorColor){
                return `${dim}: ${dimValue}px; ${direction}: ${this.offset}px; background-color: ${this.indicatorColor}`
            }
            return `${dim}: ${dimValue}px; ${direction}: ${this.offset}px `
        },
        indicatorLeft(){
            return this.innerIndex * this.indicatorWidth
        },

        
    },
    
    methods:{
        async setIndicatorDims(){
            
            if(this.currentEl != null){
                const childRect = this.currentEl.getBoundingClientRect()
                if(this.vertical == false)
                    this.indicatorWidth = childRect.width
                else{
                    this.indicatorHeight = childRect.height
                }


            }
            
        },
        onResize(){
            this.currentEl = this.tabs[this.innerIndex].$el
           
        },

    },
    mounted(){
        if(this.rightIndicator){
            this.$refs.indicator.style.right="0"
        }
        if(this.topIndicator){
            this.$refs.indicator.style.top="0"
            this.$refs.indicator.style.bottom="initial"
        }
        if(this.vertical == false){
            this.indicatorHeight = this.indicatorSize
            this.$refs.indicator.style.height = this.indicatorHeight+"px"
        }
        else{
            this.indicatorWidth = this.indicatorSize
            this.$refs.indicator.style.width = this.indicatorWidth+"px"
            this.$refs.indicator.style.top="0"
        }
        this.tabs = this.$children
        this.tabs.forEach((t, i) => {
            t.index = i
        })

        // console.log(this.tabs[this.index])

        this.innerIndex = this.index // force innerIndex to index the first-time
        this.currentEl = this.tabs[this.innerIndex].$el
       
        window.addEventListener("resize", this.onResize);
    }
}
</script>
<style lang="scss">
.x-tabbar{
    display: flex;
    position: relative;

    &.column{
        display: block;
    }

    &.center{
        justify-content: center;
    }
    
    &>.tabbar__indicator{
        position: absolute;
        bottom: 0;
        background-color: white;
        transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        
    }

    // &>.tabbar__indicator__trace{
    //     position: absolute;
    //     top: 0;
    //     bottom: 0;
    //     width: 1px;
    //     background: #4561e01c;
    // }
    
}
</style>