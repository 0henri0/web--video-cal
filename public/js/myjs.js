var socket;
var x="";
$("#submit").click(function(){
	var nameuser = $("input").val()
	if(nameuser==""){
		alert("bạn chưa nhập tên")
	}
	else{

		socket = io("http://localhost:3000/");
		$("#ten").text(nameuser);
		$("#sub").val(nameuser);
		socket.emit("tenuser",nameuser);
		socket.on('play stream', function (image){
				document.getElementById('streaming').src = image;
				
				});

		socket.on("server gui kq dk", function(data){
			if(data==0){
				$("#formdk").css("display","block")
				$("#list").css("display","none")
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
			
		})
		socket.on("disablebutton", function(data){
			$("#createroom").css("display","none")
			
		})

	}
	
});

$("#createroom").click(function(){
	socket.emit('create');

});




$("#logout").click(function(){
	$("#formdk").css("display","block")
	$("#nameuser").css("display","none")
	$("#list").css("display","none")
	socket.disconnect();
});


(function (d, w, n, io){
			'use strict'

			var io = io(),
				startCamera = false,
				video = d.querySelector('#video'),
				canvas = d.querySelector('#canvas'),
				context = canvas.getContext('2d')

			n.streaming = (
				n.getUserMedia ||
				n.webkitGetUserMedia ||
				n.mozGetUserMedia ||
				n.msGetUserMedia
			)

			n.streaming({
				video : true,
				audio : false
			}, function (stream){
				startCamera = true
				video.src = w.URL.createObjectURL(stream)
			}, function (err){
				alert('error al acceder a la camara web: ' + err)
			})

			w.playVideo = (function (cb){
				return w.requestAnimationFrame ||
					w.webkitRequestAnimationFrame ||
					w.mozRequestAnimationFrame ||
					w.msRequestAnimationFrame ||
					function (cb) {
						w.setTimeout(cb, 1000/100)
					}
			})()

			function streamVideo(context, canvas, video)
			{
				var outputStream = canvas.toDataURL('image/jpeg', .2)
				context.drawImage(video, 0, 0)

				if(startCamera)
					io.emit('streaming', outputStream)

				playVideo(function (){
					streamVideo(context, canvas, video)
				})
			}

			w.addEventListener('load', function (){
				video.autoplay = true
				video.style.display = 'none'
				streamVideo(context, canvas, video)
			})
		})(document, window, navigator, io)
