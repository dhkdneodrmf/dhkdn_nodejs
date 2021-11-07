//exppess
//Node.js를 위한 빠르고 개발적인 웹 프레임워크
const express = require('express');
const app=express();
const port=8000;
const body = require( 'body-parser' );
app.use( body.urlencoded( { extended:false } ) );
app.use( body.json() );
app.use('/aaa',express.static(__dirname+'/static'))

app.set("view engine","ejs"); //쓰겠다고 선언
app.set("views", __dirname + "/views"); //절대경로로 지정

app.get('/',(req,res)=>{ //기본루트로 접속을 했을 때 응답
    res.send("안녕");
});
/*
app.get('/',(req,res)=>{ //기본루트로 접속을 했을 때 응답
    res.render("a.html",{id:1,name:'코딩온'});
});
*/

app.post('/',(req,res)=>{ //post
    res.send("안녕2");
});
/*
app.get('/test',(req,res)=>{ //post
    res.send("test");
});*/
app.get('/test',(req,res)=>{ //값 넘김
    res.render("test",{parameter1:5,parameter2:"코딩온"});
});

app.post('/form', (req,res)=>{ //post로 폼 값 넘어온거 정보 표시
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.age);
    console.log("폼 값 넘어옴"); // 아직 웹브라우저에 응답을 보내지 않은 상태.
    res.send("hi");
});

app.get('/form',(req,res)=>{ //form루트로 접속을 했을 때 응답
    console.log(req.query.id);
    res.render("form");
});

app.get('/myfirstform',(req,res)=>{ 
    res.render("myform");
});

app.post('/myfirstform', (req,res)=>{ //post로 폼 값 넘어온거 정보 표시
    if (req.body.ssacend==1){
        msg="오늘 피곤하셨나봐요. 6시에 조퇴하고 싶으시다니ㅎㅎ";
    } else if(req.body.ssacend==2) {
        msg="정답입니다.ㅎㅎ";
    } else{
        msg="엄청 열공하시나봐요. 저녁 식사도 하시면서 열공하세요~";
    };
    if (req.body.politic>=45 && req.body.politic<=65){
        poli="중도";
    } else if(req.body.politic>60) {
        poli="우파";
    } else{
        poli="좌파";
    };
    //console.log(req.body.politic);
    res.render("result",{msg:msg,color:req.body.colorchoose,politic:poli});
});

app.listen(port,()=>{ //포트로 무엇이 들어오면 실행
    console.log("8000!");
});


