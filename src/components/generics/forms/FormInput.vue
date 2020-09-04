<template>
    <div  class="x-form-input" 
    :class="{'focus': isActive}" 
    @click="onFocus" :style="wrapperStyle">
        <label :for="name" :style="labelStyle">{{label}}</label>
        <input  @input="updateValue($event.target.value)"
        @focus="onFocus" ref="entry"
        :class="{'light-placeholder': lightPlaceholder, }"
        :placeholder="getPlaceHolder"
        :type = "type" :name="name"
        :disabled = "disabled"
        :value="value"
        @blur="onBlur" 
        @keyup="onKeyup"
       
        />
    </div>
</template>
<script>
export default {
    
    props: {
        lightPlaceholder: {
            type: Boolean,
            default: false
        },
        disabled:{
            type: Boolean,
            default: false
        },
        wrapperDisableStyle: {
            type: String,
            default: "background-color: #eee"
        },
        label: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "text"
        },
        name: {
            type: String,
            default: ""
        },
        wrapperFocusStyle: {
            type: String,
            default: "border: 2px solid dodgerblue"
        },
        labelFocusStyle: {
            type: String,
            default: "color: dodgerblue"
        },
        wrapperBlurStyle: {
            type: String,
            default: ""
        },
        labelBlurStyle: {
            type: String,
            default: ""
        },
        value: {
            type: String,
        },
    },
    data(){
        return {
            isFocused: false,
            isActive: false,
            innerValue: ""
        }
    },

    watch:{
        innerValue(n){
            if(n.trim() != "")
                this.isActive = true
        },
        value(n){
           this.innerValue = n
        }
        
    },
    computed:{
        getPlaceHolder(){
            return this.isActive || this.label == "" ? this.placeholder : ""
        },
        wrapperStyle(){
            if(this.disabled) return this.wrapperDisableStyle
            if(this.isFocused){
                return  this.wrapperFocusStyle
            }
            else{
                return this.wrapperBlurStyle
            }
        },
        labelStyle(){
            return (this.isFocused) ? this.labelFocusStyle: this.labelBlurStyle
        },

        
    },
    methods: {
      updateValue: function (value) {        
        this.$emit('input', value)
      },
      
      onFocus(){
          this.isActive = true
          this.isFocused = true
      },
      onBlur(){
          this.isFocused = false
          if(this.innerValue.trim() != ""){
              this.isActive = true
              
          }
          else {
              this.isActive = false
              
          }
      },
      onKeyup(e){
          this.$emit('keyup', e)
      }
    },
    
}
</script>
<style lang="scss">
$label-left: 5px;
.x-form-input{
    position: relative;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0 $label-left;
    cursor: text;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
   
    &>label{
        position: absolute;
        left: $label-left;
        transform: scale(0.8);
        bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: #555;
        font-weight: 600;
        transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)
    }
    &>input{
        position: relative;
        width: 100%;
        height: 100%;
        bottom: 0;
        background-color: #ccc;
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 0.9em;
        letter-spacing: 1.5px;

        &::placeholder{
            letter-spacing: 1.5px;
        }
        &:disabled{
            cursor: not-allowed;
        }

        &.light-placeholder{
            color: #fafafa;

            &::placeholder{
                color: white
            }
        }

        
    }

    &.focus{
        
        &>label{
            transform-origin: left;
            transform: translateY(-90%) scale(0.7);
            background-color: white;
            
        }
        
    }
    
}
</style>