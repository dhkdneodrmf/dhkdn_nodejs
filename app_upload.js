
const express = require('express');
const app=express();
const port=8000;

const http=require("http").Server(app); //http와 소켓통신
const io=require("socket.io")(http); //소켓모듈 부르고 http와 연결

const multer=require('multer'); //모듈 불러오기 require
const path=require('path');//내장모듈
/*
var upload_multer = multer({  // 모듈 불러옴
    dest:"uploads/"   // 파일 저장위치 설정
});*/
var storage=multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"uploads");
    },
    filename: (req,file,cb) => {
        //console.log(file);
        //path라는 모듈을 사용해서 이 파일의 확장자를 가져올 수 있다. 내장된 모듈
        //extname 이라는 함수를 사용하면 .확장자가 나옵니다.
        //ex) path.extname("1.txt"); -->txt
        //var newname="1.png";
        //basename 이름 추출 1.txt에서 1추출
        //date.now() 1970년 1월 1일 0시 0분 0초부터 지금까지 경과된 밀리초
        //var extname=path.extname(file.originalname);
        //cb(null,newname);
        cb(null,file.originalname);
        //cb(null,Date.now()+extname);
    }
});
var upload_multer = multer({  // 모듈 불러옴
    storage:storage
});

app.set("view engine","ejs"); //쓰겠다고 선언
app.set("views", __dirname + "/views"); //절대경로로 지정

app.get('/',(req,res)=>{ //기본루트로 접속을 했을 때 응답
    res.render("uploads");
});

app.post('/upload',upload_multer.single("userfile"), (req,res)=>{ 
    //upload_multer.single : 단일 파일처리
    //upload_multer.array : 다중 파일 처리
    //upload_multer.flied :: 여러 input file이 있을 경우 name속성 따로 지정하여 설정
    console.log(req.file);
    res.send("success");
});

app.post('/upload-multiple',upload_multer.array("userfile"), (req,res)=>{ 
    //upload_multer.single : 단일 파일처리
    //upload_multer.array : 다중 파일 처리
    //upload_multer.flied :: 여러 input file이 있을 경우 name속성 따로 지정하여 설정
    console.log(req.files);
    res.send("success");
});

http.listen(port,()=>{ //포트로 무엇이 들어오면 실행
    console.log("8000!");
});
