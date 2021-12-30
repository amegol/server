var express = require('express');
var app = express();
app.listen(process.env.PORT || 5000, function(){
    console.log('listening on port 5000');
});
var users = [];
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.get('/deleteAllUsers', function(req, res){
    users = [];
    res.json('Users deleted');
});
app.get('/', function(req, res){
    var data = {
        'status': 'OK',
        'name': 'Amegol Server',
        'version': '1.0.0',
        'commands': [
            '/joinLobby?name=<name>',
            '/leaveLobby?name=<name>',
            '/deleteAllUsers',
            '/getUsers',
            '/requestUser?name=<name>&previousUser=<previousUser>',
        ],
        'description': 'This is a server for the Amegol',
        'author': 'Ezrabro',
    };
    res.json(data);
});
app.get('/joinLobby', function(req, res){
    var thisUser = req.query.user;
    if(thisUser == '' || thisUser == undefined || thisUser == null){
        var json = {
            'error': 'Please enter a name'
        };
        res.json(json);
    }
    else{
        if(users.indexOf(thisUser) == -1){
            users.push(thisUser);
            var json = {
                'status': 'OK',
                'message': 'User added'
            };
            res.json(json);
        }
        else{
            var json = {
                'error': 'User already exists'
            };
            res.json(json);
        }
    }
});
app.get('/requestUser', function(req, res){
    var thisUser = req.query.user;
    var previousUser = req.query.previousUser;
    if(thisUser == '' || thisUser == undefined || thisUser == null){
        var json = {
            'error': 'Please enter a name'
        };
        res.json(json);
    }
    else{
        //chose a random user
        if(users.length == 1){
            var json = {
                'status': 'OK',
                'message': 'You are the only user'
            };
            res.json(json);
        }
        else{
            var randomUser = Math.floor(Math.random() * users.length);
            while(thisUser == users[randomUser] || previousUser == users[randomUser]){
                randomUser = Math.floor(Math.random() * users.length);
            }
            var json = {
                'status': 'OK',
                'message': users[randomUser]
            };
            res.json(json);
            //remove both users
            users.splice(users.indexOf(thisUser), 1);
            users.splice(users.indexOf(previousUser), 1);
        }
    }
});
app.get('/leaveLobby', function(req, res){
    var thisUser = req.query.user;
    if(thisUser == '' || thisUser == undefined || thisUser == null){
        var json = {
            'error': 'Please enter a name'
        };
        res.json(json);
    }
    else{
        if(users.indexOf(thisUser) == -1){
            var json = {
                'status': 'OK',
                'message': 'User does not exist'
            };
            res.json(json);
        }
        else{
            users.splice(users.indexOf(thisUser), 1);
            var json = {
                'status': 'OK',
                'message': 'User deleted'
            };
            res.json(json);
        }
    }
});
app.get('/getUsers', function(req, res){
    var json = {
        'status': 'ok',
        'users': users
    };
    res.json(json);
});