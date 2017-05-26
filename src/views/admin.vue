<template>
    <div>
        <button @click='init'>重置</button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                arr : [],
                data:"",
                io:''
            }
        },
        mounted(){
            var that = this;
            this.io = iosocket;
        },
        methods:{
            add(){
                if(this.data!=''){
                    this.arr.push(this.data);
                    this.data = '';
                }
            },
            random(){
                var that = this;
                     if(that.arr.length==10){
                        that.io.emit('random',{arr:that.arr});
                    }else{
                        alert("少于10人")
                    }
               
            },
            init(){
                this.io.emit('init');
            }
        },
    }
</script>
<style>
    .name{
        color:yellow;
    }
</style>