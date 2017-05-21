<template>
    <div class='content'>
        <div class="cardList" v-for='item in arr'>
            <div class="initCard">
                <div :class="[item.url!=undefined ? 'infadeIn' : 'infadeOut']"></div>
            </div>
            <div class="rotateCard">
                <div :class="[item.url==undefined ? 'infadeOut' : 'infadeIn']">{{item}}</div>
            </div>
        </div>
        <div class='select-role' v-show='select_role'>
            <div class='role' v-for='item in select' @click='selectItem(item.url)'>
                <img :src='item.url'/>
            </div>
            <div class='new-role'>
                <upload></upload>
            </div>
        </div>
        <div @click='selectEmit' v-show='emit' id='emit'>点击随机</div>
        <div id='hide' v-show='hide'></div>
   </div>
</template>
<script>
     import upload from './../component/upload-img.vue'
    export default {
        data(){
            return{
                is_rotate : false,
                arr :['','','','','','','','','',''],
                select:[{url:1}],
                hide:true,
                url:'',
                select_role:true,
                emit:false
            }
        },
        mounted(){
            var that = this;
            iosocket.on('connect', function () {
                iosocket.on('role', function(message) {
                        that.arr = message.roleArr;
                        if(message.type==1){
                            this.emit = true;
                        }
                });
                iosocket.on('selectRole',function(res){
                    that.select = res.selectRole;
                })
                iosocket.on('send-img',function(res){
                    alert(res.ms);
                })
            });

        },
        components:{
            upload
        },
        methods:{
            selectItem(url){   
                this.url = url;
                this.hide = false;
                this.emit = true;
                this.select_role = false;
            },
            selectEmit(){
                var that = this;
                this.emit = false;
                iosocket.emit('random',{
                    url:that.url
                })
                iosocket.on('random',function(res){
                    alert(res.ms)
                })
            }
        },
    }
</script>
<style>
    body,html{ width:100%;height:100%;margin:0; padding:0; background:url(../images/bg.jpg) no-repeat;
        background-size:cover;
        }
    #app{
        width:1150px;
        margin:20px auto;
        height:100%;
    }   
    #emit{
        position:absolute;
        left:0;
        right:0;
        margin:0 auto;
        top:250px;
        font-size: 30px;
        background: #00a6c6;
        color: #fff;
        border: 2px solid #fff;
        border-radius: 5px;
        width: 200px;
        line-height: 40px;
    }
    #hide{
        background:#000;
        opacity:.7;
        width:100%;
        height:100%;
        z-index:10;
    }
    .cardList{
        width:200px;
        height:310px;
        float:left;
        margin:10px 15px;
        position:relative;
    }
    .select-role{
        position:absolute;
        top:50px;
        width:800px;
        left:0;
        right:0;
        margin:0 auto;
        z-index:11;
        background:#333;
        min-height:200px;
    }
    .select-role img{
        width:100%;
        height:100%;
    }
    .select-role>div{
        width:160px;
        float:left;
        height:200px;
    }
    .content{
        width: 100%;
        position:relative;
        height: 100%;
    }
    .initCard > div{
        width:200px;
        height:310px;
        background:url(../images/card.png) no-repeat;
        background-size:100%;
        position:absolute;
        top:0;
        left:0;
    }
    .rotateCard > div{
        width:200px;
        height:310px;
        line-height:310px;
        text-align:center;
        font-size:24px;
        border:2px solid #fff;
        color:#fff;
        border-radius:10px;
    }
    .infadeIn{ -webkit-animation:fadeInrotate 1s linear; animation: fadeInrotate 1s linear; -moz-animation:fadeInrotate 1s linear;-webkit-animation-fill-mode: both;
        animation-fill-mode: both;}
    .infadeOut{-webkit-animation:fadeOutrotate 1s linear; animation: fadeOutrotate 1s linear; -moz-animation:fadeOutrotate 1s linear; -webkit-animation-fill-mode: both;
        animation-fill-mode: both;}
    @keyframes fadeInrotate{
        from{
            -webkit-transform: perspective(1400px);
            transform: perspective(1400px);
        } 
        40%{
            -webkit-transform: perspective(1400px) rotate3d(0,1,0,-60deg);
            transform: perspective(1400px) rotate3d(0,1,0,-60deg);
            opacity: 1;
        }
        50%{
            -webkit-transform: perspective(1400px) rotate3d(0,1,0,-90deg);
            transform: perspective(1400px) rotate3d(0,1,0,-90deg);
            opacity: 0;
        }
        to{
            -webkit-transform: perspective(1400px) rotate3d(0,1,0,-180deg);
            transform: perspective(1400px) rotate3d(0,1,0,-180deg);
            opacity: 0;
        }
    }
    @keyframes fadeOutrotate{
        from{
            -webkit-transform: perspective(1400px) rotate3d(0,1,0,180deg);
            transform: perspective(1400px) rotate3d(0,1,0,180deg);
            opacity: 0;
        } 
        40%{
            -webkit-transform: perspective(1400px) rotate3d(0,1,0,90deg);
            transform: perspective(1400px) rotate3d(0,1,0,90deg);
            opacity: 0;
        }
        50%{
            -webkit-transform: perspective(100px) rotate3d(0,1,0,60deg);
            transform: perspective(1400px) rotate3d(0,1,0,60deg);
            opacity: 1;
        }
        to{
            -webkit-transform: perspective(1400px);
            transform: perspective(1400px);
            opacity: 1;
        }
    }
    @-webkit-keyframes fadeInrotate{
            from{
                -webkit-transform: perspective(1400px);
                transform: perspective(1400px);
            } 
            40%{
                -webkit-transform: perspective(1400px) rotate3d(0,1,0,-60deg);
                transform: perspective(1400px) rotate3d(0,1,0,-60deg);
                opacity: 1;
            }
            50%{
                -webkit-transform: perspective(1400px) rotate3d(0,1,0,-90deg);
                transform: perspective(1400px) rotate3d(0,1,0,-90deg);
                opacity: 0;
            }
            to{
                -webkit-transform: perspective(1400px) rotate3d(0,1,0,-180deg);
                transform: perspective(1400px) rotate3d(0,1,0,-180deg);
                opacity: 0;
            }
        }
        @-webkit-keyframes fadeOutrotate{
            from{
                -webkit-transform: perspective(1400px) rotate3d(0,1,0,180deg);
                transform: perspective(1400px) rotate3d(0,1,0,180deg);
                opacity: 0;
            } 
            40%{
                -webkit-transform: perspective(1400px) rotate3d(0,1,0,90deg);
                transform: perspective(1400px) rotate3d(0,1,0,90deg);
                opacity: 0;
            }
            50%{
                -webkit-transform: perspective(100px) rotate3d(0,1,0,60deg);
                transform: perspective(1400px) rotate3d(0,1,0,60deg);
                opacity: 1;
            }
            to{
                -webkit-transform: perspective(1400px);
                transform: perspective(1400px);
                opacity: 1;
            }
        }
</style>