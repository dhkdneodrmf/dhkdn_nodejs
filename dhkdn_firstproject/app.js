const express = require('express');
const app=express();
const port=7000;
const body = require( 'body-parser' );
const { Session } = require('inspector');
app.use( body.urlencoded( { extended:false } ) );
app.use( body.json() );
app.use('/aaa',express.static(__dirname+'/static'))
app.set("view engine","ejs"); //쓰겠다고 선언
app.set("views", __dirname + "/views"); //절대경로로 지정

app.get('/',(req,res)=>{ //기본루트로 접속을 했을 때 응답
    res.render("main",{req:req});
});

app.listen(port,()=>{ //포트로 무엇이 들어오면 실행
    console.log("7000!");
});
