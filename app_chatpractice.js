
const express = require('express');
const app=express();
const port=8000;

const http=require("http").Server(app); //http와 소켓통신
const io=require("socket.io")(http); //소켓모듈 부르고 http와 연결

const multer=require('multer'); //모듈 불러오기 require
const path=require('path');//내장모듈
const fs = require('fs');

app.set("view engine","ejs"); //쓰겠다고 선언
app.set("views", __dirname + "/views"); //절대경로로 지정
app.use('/profile',express.static(__dirname+'/uploads'))

app.get('/',(req,res)=>{ //기본루트로 접속을 했을 때 응답
    res.render("chatpractice");
});

class User{
    constructor(id, name){
        this.id=id;
        this.name=name;
        this.color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        this.profile="icon"+Math.floor(Math.random()*4+1)+".png";
    }
    newcolor(){
        this.color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
    }
};
let ulist=[];
io.on("connection",function(socket){
    //클라이언트가 socket이 연결되면 안에서 작업을 한다.
    console.log("socket connected");
    socket.on("nickinput",(data)=>{
        for (let i=0;i<ulist.length;i++){
            if (data.nick==ulist[i].name){
                socket.emit( "error", "이미 존재하는 대화명입니다." );
                return false;
            };
        };
        if(data.nick==null || data.nick==""){
            socket.emit( "error", "값을 입력해야합니다." );
            return false;
        };
        let newuser= new User(socket.id, data.nick);
        ulist.push(newuser);
        //console.log(ulist);
        io.emit( "userlist", {users:ulist} );
        io.emit( "notice", {socketid:data.nick,msg:"님이 입장하였습니다."} );
    });
    //io.emit( "notice", {socketid:socket.id,msg:"님이 입장하였습니다."} );
    socket.emit('skcreated',{socketid:socket.id});
    socket.on( "sendMsg", ( msg ) =>{
        for ( var i = 0; i < ulist.length; i++){
            if (msg['msg'].indexOf("@"+ulist[i].name) > -1 ){
                dm="(속닥속닥)"+msg['msg'].replace("@"+ulist[i].name+' ','');
                io.to(ulist[i].id).emit( "newMsg", {socketid:msg['sender'],msg:dm,profile:ulist[i].profile});
                return false;
            };
        };
        for ( var i = 0; i < ulist.length; i++){
            if ( ulist[i].id === socket.id) { 
                io.emit( "newMsg", {socketid:ulist[i].name,msg:msg['msg'],profile:ulist[i].profile} );
                break;
            };
        };
        //io.emit( "newMsg", {socketid:socket.id,msg:msg});
        //socket.emit("mymsg",{msg:msg});
    });
    socket.on("disconnect",()=>{ //서버에서 연결해제된거 확인하고 새로 연결
        for ( var i = 0; i < ulist.length; i++){ 
            if ( ulist[i].id === socket.id) { 
                io.emit( "notice", {socketid:ulist[i].name,msg:"님이 퇴장하였습니다."} );
                ulist.splice(i, 1);
                if (ulist[i].profile.indexOf("icon")>-1){
                    fs.unlink("uploads/"+ulist[i].profile, err => {
                        if(err.code == 'ENOENT'){
                            console.log("파일 삭제 Error 발생");
                        };
                    });
                };
                break;
            };
        };
        io.emit( "userlist", {users:ulist} );
    });
});

let storage=multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"uploads");
    },
    filename: (req,file,cb) => {
        //console.log(req.body);
        cb(null, "1" + path.extname(file.originalname));
    }
});
let upload_multer = multer({  // 모듈 불러옴
    storage:storage
});

app.post('/changeprofile',upload_multer.single("chpf"), (req,res)=>{ 
    //console.log(req.body);
    res.send("success");
});

http.listen(port,()=>{ //포트로 무엇이 들어오면 실행
    console.log("8000!");
});
