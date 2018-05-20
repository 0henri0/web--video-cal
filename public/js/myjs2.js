onVideo:(function (d, w, n, io){
			'use strict'
			var io = io("http://localhost:3000/"),
				startCamera = false,
				video = d.getElementById('video'),
				canvas = d.getElementById('canvas'),
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
					w.msRequestAnimationFrame  ||
					function (cb) {
						
						w.setTimeout(cb, 1000/1000)
					}
			})()

			function streamVideo(context, canvas, video)
			{
				var outputStream = canvas.toDataURL('image/jpeg', .2)
				context.drawImage(video, 0, 0)

				if(startCamera){
					$("#createroom").click()
					io.emit('streaming', outputStream)

				}

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

