# SSAC 3기 Nodejs 프로젝트 결과물

* nodejs설치 후 npm 패키지 설치
* express 모듈, ejs엔진 사용
* 기본 사용 포트 8000
* 현재 데모사이트로 모두의 채팅 프로그램 실습 사이트 http://jyr.ideadream.co.kr:8000/ 으로 접속 가능

### app_chatpractice.js
채팅 프로그램 모두의 채팅 실습 결과물
* socket.io 모듈 설치 및 http통신모듈 연결
* 접속 시 닉네임 설정하여 닉네임으로 입장. 입장한 사람의 수가 표시됨.
* 입장, 퇴장이 있을 시 공지알림으로 전체에게 보여짐
* 채팅을 입력할 시 접속한 사용자 모두에게 표시됨.
* 타 사용자 입장시 하단 상자에 표시되며, 목록에서 닉네임을 클릭하고 메세지를 입력 후 발송하면 해당사용자에게만 발송됨(DM)
* 내가 입력한 메세지는 노란색으로 표시되어 오른쪽에 배치되어 구분 가능
* 채팅이 길어지면 스크롤바가 아래로 향함.
* 채팅에 보낸 시간이 표시됨.
* 입장시에 기본 아이콘이 임의로 설정된 몇개의 아이콘으로 설정되며 내 닉네임을 클릭하여 이미지를 업로드하면 그에 맞게 프로필 사진 변경되어 표시됨
* 차후 채팅저장기능, 파일첨부, 이미지 업로드, 방 구분하여 접속하기, 디자인 변경 등 예정

### app.js
* body-parser 모듈 사용
* 기본루트로 접속시 응답메세지
* /test 접속시 인자값을 넘기기 실습
* /form 접속시 post값 넘기기 실습
* /myfirstform 에서 입력한 양식에 따라 폼 양식에 동적인 정보 표시

### app_upload.js
* multer 모듈과 path 내장모듈 사용
* 기본루트에서 파일 업로드
* 단일 파일과 다중 파일 각각 서버에 업로드 가능
* 저장되는 파일은 올린 원본파일이름으로 표시됨

### app_upload.js
* multer 모듈과 path 내장모듈 사용
* 기본루트에서 파일 업로드
* 단일 파일과 다중 파일 각각 서버에 업로드 가능
* 저장되는 파일은 올린 원본파일이름으로 표시됨

### mysql_test.js
* Mysql을 설치하여 nodejs와 연동
* Mysql db명령어를 입력하여 실제로 DB에 CRUD(Create, Read, Update, Delete)되는지 확인

### app_socket.js
* socket.io 모듈 설치 및 http통신모듈 연결
* 클라이언트와 서버간의 통신 여부 확인, 메세지 확인
