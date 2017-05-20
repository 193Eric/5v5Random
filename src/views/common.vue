<template>
    <div>hellow world
    <button>go</button>
    </div>
    
</template>
<script>
    export default {
        data(){
            return{

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

        },
    }
</script>