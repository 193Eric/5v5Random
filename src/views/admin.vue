<template>
    <div>
        <button @click='random'>开始随机</button>
        <button @click='init'>重置</button>
        <br>
        <br>
        <br>
        <input type='text' v-model='data'/>
        <button @click='add'>添加</button>
        <br>
        <br>
        <br>
        <div v-for='item in arr' class='name'>
            {{item}}
        </div>
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
            var iosocket = io.connect('http://localhost:3000/');
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