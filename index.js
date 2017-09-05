var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser   = require('body-parser');
var configDB = require('./config/database.js');
var path = require('path');
var cookieSession = require('cookie-session');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

mongoose.connect(configDB.url);

app.use(bodyParser()); // get information from html forms
app.use(cookieSession({ name:'session', secret: "PingFlow" }));


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

require('./app/routes.js')(app);

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});