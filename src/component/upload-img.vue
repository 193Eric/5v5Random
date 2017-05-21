<template>
  <div class='finish_room'>
  	   <div class='finish_room2'>
       	   <div v-for='(item ,index ) in imgs' class='room_img'>
       	   	  <img :src="item">
       	   </div>
           <div class='room_add_btn'>
           	    <span>+</span>
           	    <input @change='add_img'  type="file">
           </div>
       </div>
  </div>
</template>
<script >
	module.exports={
          data:function(){
          	  return{
                    imgs:[],
          	  }
          },
          props:{},
          methods:{
		 	  add_img(event){
		 	  	var reader =new FileReader();
		 	  	var img1=event.target.files[0];
                reader.readAsDataURL(img1);
                var that=this;
                reader.onloadend=function(){ 
					iosocket.emit('send-img',{
						img:reader.result
					})
				}  
		 	  }
          }
		  

	}

</script>
<style scoped >
	 .finish_room{
		  width: 100%;
		  height:100%;
          line-height:200px;
	}
     .finish_room2{
   	 width: 100%;
   	 height: 100%;
   	 display: flex;
   	 align-items: center;
   }
   .room_add_btn{
   	width:100%;
	height: 100%;
	position: relative;
	line-height: 200px;
    font-size:150px;
    border:1px solid #fff;
    box-sizing:border-box;
	text-align: center;
	color: #fff;
   }
  .room_add_btn input{
  	  position: absolute;
  	  top: 0px;
  	  left: 0px;
  	  width: 100%;
  	  height: 100%;
  	  z-index: 99999;
  	  opacity: 0;
  }

</style>