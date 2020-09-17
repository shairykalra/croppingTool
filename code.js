let cropInstance = {};
let background_img_src = "";
let cropped_url = "";

function loadFile(event)
  {     //console.log("image 1")
        var image = document.getElementById('simg');
        image.src = URL.createObjectURL(event.target.files[0]);
        cropInstance = new Cropper(image);
        $("#crop").css("visibility", "visible");  
  }

function loadFile1(event)
  {
      //console.log("image 2")
      var image1 = document.getElementById('bimg');
      image1.src = URL.createObjectURL(event.target.files[0]);
      background_img_src = image1.src;

  }

$("#crop").click(function()
{
     // console.log(cropInstance.getCroppedCanvas().toDataURL());
      cropped_url = cropInstance.getCroppedCanvas().toDataURL();
      $('#cropped_img').attr('src',cropped_url);
      $('#cropped_img').removeClass('d-none');
      $("#cr").css("visibility", "visible");
      $("#combine").css("visibility", "visible");   
});
var canvas = new fabric.Canvas('merge'); 
$("#combine").click(function()
{
      $(".background-img").css("background-image", "url('"+background_img_src+"')");
      fabric.Image.fromURL(cropped_url, function(oImg)
       {
            canvas.add(oImg);
       });
});

var coordinates = {};
var finalCanvas = document.getElementById("final");
canvas.on("after:render", function(){
var ao = canvas.getActiveObject();
console.log(ao);
if (ao) {
    var bound = ao.getBoundingRect();
	  coordinates=bound;
			 ftx = finalCanvas.getContext("2d");
			 ftx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);
			 backFinalImg = new Image();
			 aboveFinalImg = new Image();
			 backFinalImg.src = background_img_src;
			 backFinalImg.onload = function(){
				ftx.globalAlpha = 1;
				ftx.drawImage(backFinalImg, 0, 0, 500, 500);
				ftx.save();
				aboveFinalImg.src = cropped_url;
				aboveFinalImg.onload = function(){
					if(ao.angle){
						ftx.rotate(ao.angle * Math.PI/180);
					}
					ftx.drawImage(aboveFinalImg, coordinates.left, coordinates.top, coordinates.width, coordinates.height);
					ftx.restore();
        }
        $("#finalbtn").css("visibility", "visible"); 
			 }
  }		
})
$('#finalbtn').click(function() 
{
   download(final.toDataURL(),"fabric.png","image/png");
});