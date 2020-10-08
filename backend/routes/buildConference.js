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

// Save conference deatils
app.post('/addConference', function(req, res, next) {
    conference = {
        'name': req.body.conference.name,
        'location': req.body.conference.place,
        'date': req.body.conference.date,
        'description': req.body.conference.description
    };
    logo = req.logo;
    var conferenceID;

    dbConnection.query('INSERT INTO conference SET ?', conference, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {				
            //res.send(JSON.stringify(result));
            console.log("success conference added successfully");
        }
    });

    dbConnection.query('SELECT id FROM conference WHERE name=?', conference.name, function(err, rows, fields) {
        //if(err) throw err
        if (err) {
            console.log(err);
            res.send(JSON.stringify(rows));

        } else {
            conferenceID = rows[0].id;
        }
    });
});

// Save lectures deatils
app.post('/addLectures', function(req, res, next) {
    var lectures = req.body.lecture;
    var authors;
    var lecture;

    for(var i = 0; i< lectures.length; i++) {
        lecture = {
            'name': lectures[i].lectureName,
            'start time': lectures[i].lectureStartTime,
            'end time': lectures[i].lectureEndTime,
            'description': lectures[i].lectureDescription,
            'room': lectures[i].lectureClass,
            'file': lectures[i].lectureFile,
            'conferenceId':'0'
        };
        authors = createAuthors(lectures[i].authors,i+1);

        dbConnection.query('INSERT INTO lectures SET ?', lecture, function(err, result) {
            //if(err) throw err
            if (err) {
                res.send(JSON.stringify(err));
                console.log(err);
            } else {				
                //res.send(JSON.stringify(result));
                console.log("success lectures added successfully");
            }
        });

        dbConnection.query('INSERT INTO authors SET ?', authors, function(err, result) {
            //if(err) throw err
            if (err) {
                res.send(JSON.stringify(err));
                console.log(err);
            } else {				
                //res.send(JSON.stringify(result));
                console.log("success authors added successfully");
            }
        });
    }

});

// Save sessions deatils
app.post('/addsessions', function(req, res, next) {
    sessions = req.body.session;

    for(var i = 0; i< sessions.length; i++) {
        session = {
            'name': sessions[i].name,
            'category': sessions[i].category,
            'location': sessions[i].location,
            'lead': sessions[i].lead
        };

        
        dbConnection.query('INSERT INTO sessions SET ?', session, function(err, result) {
            //if(err) throw err
            if (err) {
                res.send(JSON.stringify(err));
                console.log(err);
            } else {				
                //res.send(JSON.stringify(result));
                console.log("success session added successfully");
            }
        });
    }
});

function createAuthors(reqAuthors, lectureId) {
    var authors;
    for(var i = 0; i < reqAuthors.length; i++) {
        authors = {
            'name': reqAuthors[i].lecturerName,
            'company': reqAuthors[i].lecturerCompany,
            'role': reqAuthors[i].lecturerRole,
            'cv': reqAuthors[i].lecturerCV,
            'isLecturer': reqAuthors[i].isLecturer,
            'lectureId': lectureId
        };
    }
    return authors;
}

module.exports = app