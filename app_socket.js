
const express = require('express');
const app=express();
const port=8000;

const http=require("http").Server(app); //http와 소켓통신
const io=require("socket.io")(http); //소켓모듈 부르고 http와 연결

app.set("view engine","ejs"); //쓰겠다고 선언
app.set("views", __dirname + "/views"); //절대경로로 지정

app.get('/',(req,res)=>{ //기본루트로 접속을 했을 때 응답
    res.render("socket");
});

io.on("connection",function(socket){
    //클라이언트가 socket이 연결되면 안에서 작업을 한다.
    console.log("socket connected");
    //socket과 관련한 통신작업을 모두 처리
    //보낼 때는 socket.emit
    socket.on("event",(data)=>{
        console.log(data);
    });
    socket.on("a",(data)=>{
        console.log(data);
        socket.emit("send","hi");
    });
    
    /*
    socket.on("aaa",()=>{
        console.log("aaa");
    });
    socket.on("bbb",()=>{
        console.log("bbb");
    });*/
    socket.emit("ccc");
    socket.on("disconnect",()=>{ //서버에서 연결해제된거 확인하고 새로 연결
        console.log("disconnected")
    });
});

http.listen(port,()=>{ //포트로 무엇이 들어오면 실행
    console.log("8000!");
});


