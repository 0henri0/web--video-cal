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
		socket.emit("tenuser",nameuser);

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

	}
	
});



$("#logout").click(function(){
	$("#formdk").css("display","block")
	$("#nameuser").css("display","none")
	$("#list").css("display","none")
	socket.disconnect();
});

