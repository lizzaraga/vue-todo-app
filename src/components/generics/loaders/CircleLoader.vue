<template>
    <div class="x-circle-loader" :style="style">
    </div>
</template>
<script>
import styleConverter from '../../../utils/object2Style'
export default {
    props:{
        radius:{
            type: Number,
            default: 15
        },
        bgColor: {
            type: String,
            default: "#fafafa"
        },
        
    },
    computed:{
        style(){
            return styleConverter({
                height: this.radius*2+"px",
                width: this.radius*2+"px",
                "background-color": this.bgColor
            })
        }
    }
}
</script>
<style lang="scss">
.x-circle-loader{
    border-radius: 50%;
    //border : 4px solid #000;
    position: relative;
    box-shadow: 0px 2px 3px #aaa;
    
    &::after{
        content: '';
        position: absolute;
        left: 4px;
        right: 4px;
        top: 4px;
        bottom: 4px;
        border: 2px solid #000;
        border-color: transparent;
        border-top-color: #273e50;
        border-right-color: #273e50;
        border-radius: inherit;
        animation: turn 0.6s linear infinite;
    }
}

@keyframes turn {
     
     from{
         transform: rotate(0deg);
     }
     to{
         transform: rotate(360deg);
     }
}
</style>