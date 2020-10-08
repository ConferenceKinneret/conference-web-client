var express = require('express')
var app = express()

var mysql = require('mysql')
var config = require('../config')
var dbConnection = mysql.createConnection({
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
});
dbConnection.connect(function(error) {
    if(!!error) {
        console.log('Error connection to mySql');
        console.log(error);
    } else {
        console.log('connect successfully to mySql');
    }
});

app.get('/', function(req, res, next) {
    console.log("hellow world");    
});

// log in
app.post('/login', function(req, res, next) {
    login = {
      'email': req.body.email,
      'password': req.body.password
    }
    console.log('HERE');
    console.log(login);
    var sqlString = 'SELECT token FROM  users WHERE email="'+req.body.email+'" AND password="'+req.body.password+'"';

    dbConnection.query(sqlString, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {
          console.log("log in successfully");				
          res.send(JSON.stringify(result));
        }
    });
});

app.post('/register', function(req, res, next) {
  user = {
    'name': req.body.name,
    'email': req.body.email,
    'role': req.body.role,
    'password': req.body.password,
    'token': req.body.name+req.body.role
  }

  dbConnection.query('INSERT INTO users SET ?', user, function(err, result) {
      //if(err) throw err
      if (err) {
          res.send(JSON.stringify(err));
          console.log(err);
      } else {
        console.log("success user added successfully");				
        res.send(JSON.stringify(result));
      }
  });
});

module.exports = app