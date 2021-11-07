var express = require('express');
var app = express();
var mysql = require( 'mysql' );

var conn = mysql.createConnection({
	user: 'root',
	password: '!qnpfrtls1*!',
	database: 'ssac'
});
/*
app.listen( 8000, function () {
	console.log( conn );
    console.log( "Listening on *:3000" );
});*/
/*
app.listen( 8000, function () {
	console.log(conn.state);
	if ( conn ) console.log( "Listening on *:3000" );
	else console.log( "DB connection error" );
});*/
/*
app.listen( 8000, function () {
	var sql = "INSERT INTO member VALUES('tom', '톰', '2021-10-21' );";
	
	conn.query(sql, function(err) {
        if( err ){
			console.log( 'failed!! : ' + err );
		}
		else {
			console.log( "data inserted!" );
		}
    });
});*/
app.listen( 8000, function () {
	conn.connect( ( err ) => {
		if ( err ) console.log( err );
		else console.log( "DB connected successfully!" );
    });
});