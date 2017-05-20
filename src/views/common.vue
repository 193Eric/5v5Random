<template>
    <div>
        <div class="cardList" v-for='item in arr'>
            <div class="initCard">
                <div :class="[is_rotate ? 'infadeIn' : 'infadeOut']"></div>
            </div>
            <div class="rotateCard">
                <div :class="[is_rotate ? 'infadeOut' : 'infadeIn']">{{item}}</div>
            </div>
        </div>
   </div>
</template>
<script>
    export default {
        data(){
            return{
                is_rotate : false,
                arr :['','','','','','','','','','','']
            }
        },
        mounted(){
            var that = this;
            var iosocket = io.connect('http://localhost:3000/');
            iosocket.on('connect', function () {
                iosocket.on('msg', function(message) {
                    if(message.go=='yes'){
                        that.rotateCard();
                        that.arr = message.arr;
                    }else{
                        that.rotateCardInit();
                    }
                });
            });
        },
        methods:{
            rotateCard(){
                 this.is_rotate = true;
            },
            rotateCardInit(){
                this.is_rotate = false;
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
    .cardList{
        width:200px;
        height:310px;
        float:left;
        margin:10px 15px;
        position:relative;
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