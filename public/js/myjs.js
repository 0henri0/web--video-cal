var socket;
var x="";
var k=0;
var checklog;
// -------------------------------------------------------------------------
$("#submit").click(function(){
	var nameuser = $("#uname").val()
	if(nameuser==""){
		alert("bạn chưa nhập tên")
	}
	else{
		socket = io("http://localhost:3000/");
		$("#ten").text(nameuser);
		$("#sub").val(nameuser);
		socket.emit("tenuser",nameuser);		
		socket.on("checkvideoonstream",function(){
		k=1;
		console.log(k)			
		})

		
		checklog =1;


		socket.on("server gui kq dk", function(data){
			if(data==0){
				$("#formdk").css("display","block")
				$("#list").css("display","none")
				$("#streaming").css("display","none")
				alert("ten dang nhap da ton tai");		
			}
			else {
				$("#formdk").css("display","none")
				$("#nameuser").css("display","block")
				$("#list").css("display","block")
			}
		});
		socket.on("listuser", function(data){
			x="";
			data.forEach( function(i) {
				x += 	"<tr><td>"+i+"</td></tr>";
			});
			x= "<table><tr><th>Danh sách user online</th></tr>" +x;
			x = x + "</table>"
			if(x!="")$("#table").html(x);
			
		})
		socket.on("disconnectvideo", function(data){
			$("#createroom").css("display","block")
			$("#streaming").css("display","none")
			
		})
		socket.on("disablebutton", function(data){
			$("#createroom").css("display","none")
			
		})

$("#createroom").click(function(){
	socket.emit('create');
	$("#canvas").css("display","none")
	$("#video").css("display","none")
	$("#streaming").css("display","block")
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

context.width = canvas.width;
context.height = canvas.height;
var video = document.getElementById('video');


navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
   navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
      function(stream) {
         
         video.srcObject = stream;
         video.onloadedmetadata = function(e) {
           video.play();
         };
      },
      function(err) {
         console.log("The following error occurred: " + err.name);
      }
   );
} else {
   console.log("getUserMedia not supported");
}


video.addEventListener("play", function() {i = window.setInterval(function() {context.drawImage(video,5,5,700,400)
var outputStream = canvas.toDataURL('image/jpeg', .2)
socket.emit('streaming', outputStream)

},20);


}, false);
video.addEventListener("pause", function() {window.clearInterval(i);}, false);
video.addEventListener("ended", function() {clearInterval(i);}, false); 
         
	
});
socket.on('play stream', function (image){
	if(checklog==1){
		$("#streaming").css("display","block")
		document.getElementById('streaming').src = image;
	}
	
});

	}
});


$("#logout").click(function(){
	$("#formdk").css("display","block")
	$("#nameuser").css("display","none")
	$("#list").css("display","none")
	socket.disconnect();
	$("#video").css("display","none")
	$("#streaming").css("display","none")
	checklog==0;
});
	

