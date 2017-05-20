<template>
    <div>
        <div class="cardList">
            <div class="initCard">
                <div :class="[is_rotate ? 'infadeIn' : 'infadeOut']"></div>
            </div>
            <div class="rotateCard">
                <div :class="[is_rotate ? 'infadeOut' : 'infadeIn']"></div>
            </div>
        </div>
   </div>
</template>
<script>
    export default {
        data(){
            return{
                is_rotate : true
            }
        },
        mounted(){
            var iosocket = io.connect('http://localhost:3000/');
            iosocket.on('connect', function () {
			    iosocket.emit("news",'123');
                iosocket.on('msg', function(message) {
					
                });
            });
        },
        methods:{
            rotateCard(){
                 
            }
        },
    }
</script>
<style>
    body,html{ margin:0; padding:0;}
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
        background:url(../images/card.jpg) no-repeat;
        background-size:100%;
        position:absolute;
        top:0;
        left:0;
    }
    .rotateCard > div{
        width:200px;
        height:310px;
        background:url(../images/bg.jpg) no-repeat;
        background-size:cover;
        border-radius:10px;
    }
    .infadeIn{ -webkit-animation:fadeInrotate .7s linear; animation: fadeInrotate .7s linear; -moz-animation:fadeInrotate .7s linear;-webkit-animation-fill-mode: both;
        animation-fill-mode: both;}
    .infadeOut{-webkit-animation:fadeOutrotate .7s linear; animation: fadeOutrotate .7s linear; -moz-animation:fadeOutrotate .7s linear; -webkit-animation-fill-mode: both;
        animation-fill-mode: both;}
    @keyframes fadeInrotate{
        from{
            -webkit-transform: perspective(1400px);
            transform: perspective(1400px);
        } 
        40%{
            -webkit-transform: perspective(1400px) rotate3d(0,1,0,60deg);
            transform: perspective(1400px) rotate3d(0,1,0,60deg);
            opacity: 1;
        }
        50%{
            -webkit-transform: perspective(1400px) rotate3d(0,1,0,90deg);
            transform: perspective(1400px) rotate3d(0,1,0,90deg);
            opacity: 0;
        }
        to{
            -webkit-transform: perspective(1400px) rotate3d(0,1,0,180deg);
            transform: perspective(1400px) rotate3d(0,1,0,180deg);
            opacity: 0;
        }
    }
    @keyframes fadeOutrotate{
        from{
            -webkit-transform: perspective(1400px) rotate3d(0,1,0,-180deg);
            transform: perspective(1400px) rotate3d(0,1,0,-180deg);
            opacity: 0;
        } 
        40%{
            -webkit-transform: perspective(1400px) rotate3d(0,1,0,-90deg);
            transform: perspective(1400px) rotate3d(0,1,0,-90deg);
            opacity: 0;
        }
        50%{
            -webkit-transform: perspective(100px) rotate3d(0,1,0,-60deg);
            transform: perspective(1400px) rotate3d(0,1,0,-60deg);
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
                -webkit-transform: perspective(1400px) rotate3d(0,1,0,60deg);
                transform: perspective(1400px) rotate3d(0,1,0,60deg);
                opacity: 1;
            }
            50%{
                -webkit-transform: perspective(1400px) rotate3d(0,1,0,90deg);
                transform: perspective(1400px) rotate3d(0,1,0,90deg);
                opacity: 0;
            }
            to{
                -webkit-transform: perspective(1400px) rotate3d(0,1,0,180deg);
                transform: perspective(1400px) rotate3d(0,1,0,180deg);
                opacity: 0;
            }
        }
        @-webkit-keyframes fadeOutrotate{
            from{
                -webkit-transform: perspective(1400px) rotate3d(0,1,0,-180deg);
                transform: perspective(1400px) rotate3d(0,1,0,-180deg);
                opacity: 0;
            } 
            40%{
                -webkit-transform: perspective(1400px) rotate3d(0,1,0,-90deg);
                transform: perspective(1400px) rotate3d(0,1,0,-90deg);
                opacity: 0;
            }
            50%{
                -webkit-transform: perspective(100px) rotate3d(0,1,0,-60deg);
                transform: perspective(1400px) rotate3d(0,1,0,-60deg);
                opacity: 1;
            }
            to{
                -webkit-transform: perspective(1400px);
                transform: perspective(1400px);
                opacity: 1;
            }
        }
</style>