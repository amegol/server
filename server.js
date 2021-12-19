//Access-Control-Allow-Origin: https://amegol.herokuapp.com
// Access-Control-Allow-Credentials: true
var express = require('express');
var app = express();
app.listen(process.env.PORT || 5000, function(){
    console.log('listening on port 5000');
});
var users = [];
app.get('/newUser', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', 'https://amegol.herokuapp.com/*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
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
    res.setHeader('Access-Control-Allow-Origin', 'https://amegol.herokuapp.com/*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
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
            res.json('User already exists');
        }
    }
});
app.get('/getUsers', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', 'https://amegol.herokuapp.com/*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //send in json format
    res.json(users);
});
app.get('/deleteUsers', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', 'https://amegol.herokuapp.com/*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //delete prenmae and lastname from users
    var prename = req.query.prename;
    var lastname = req.query.lastname;
    if(prename == '' || lastname == '' || prename == undefined || lastname == undefined || prename == null || lastname == null){
        res.json('Please enter a name');
    }
    else{
        if(users.indexOf(prename) == -1 || users.indexOf(lastname) == -1){
            res.json('User does not exist');
        }
        else{
            users.splice(users.indexOf(prename), 1);
            users.splice(users.indexOf(lastname), 1);
            res.json('Users deleted');
        }
    }
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
            '/deleteUsers'
        ],
        'description': 'This is a server for the Amegol',
        'author': 'Ezrabro',
    };
    //header
    res.setHeader('Access-Control-Allow-Origin', 'https://amegol.herokuapp.com/*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.json(data);
});