var express = require('express');
var app = express();
app.listen(process.env.PORT || 5000, function(){
    console.log('listening on port 5000');
});
var users = [];
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://amegol.github.io");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.get('/newUser', function(req, res){
    var prename = req.query.prename;
    var lastname = req.query.lastname;
    //check if prename is empty
    if(prename == '' || lastname == '' || prename == undefined || lastname == undefined || prename == null || lastname == null){
        res.json('Please enter a name');
    }
    else{
        if(users.length == 0){
            res.json('no user');
        }
        else{
            var randomUser = Math.floor(Math.random() * users.length);
            while(prename == users[randomUser] || lastname == users[randomUser]){
                randomUser = Math.floor(Math.random() * users.length);
            }
            //send the new user and the random user
            res.json(users[randomUser]);
        }
    }
});
app.get('/addUser', function(req, res){
    var prename = req.query.prename;
    //check if prename is empty
    if(prename == ''){
        res.json('Please enter a name');
    }
    else{
        //check if user already exists
        if(users.indexOf(prename) == -1){
            users.push(prename);
            res.json('User added');
        }
        else{
            var json = {
                'error': 'User already exists'
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
    res.json(users);
});
app.get('/deleteUser', function(req, res){
    var prename = req.query.prename;
    if(prename == '' || prename == undefined || prename == null){
        var json = {
            'error': 'Please enter a name'
        };
        res.json(json);
    }
    else{
        if(users.indexOf(prename) == -1){
            var json = {
                'status': 'OK',
                'message': 'User does not exist'
            };
            res.json(json);
        }
        else{
            users.splice(users.indexOf(prename), 1);
            var json = {
                'status': 'OK',
                'message': 'User deleted'
            };
            res.json(json);
        }
    }
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
            '/newUser',
            '/addUser',
            '/getUsers',
            '/deleteUser'
        ],
        'description': 'This is a server for the Amegol',
        'author': 'Ezrabro',
    };
    res.json(data);
});