// app/routes.js

var user = require('../app/models/user');

var mongoose = require("mongoose");

var Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyD0qVwMRSIai4yK'
});

var base = Airtable.base('app8nTRhyaTqGhQTl');

module.exports = function(app) {

  app.get('/', function(req, res) {
    var cities = [];
    base('Table 1').select({ view: "Grid view" }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        cities.push({
          "name": record.get('name'),
          "population": record.get('population'),
          "country": record.get('country'),
          "tags": record.get('tags'),
          "id": record.get('id')
        });
      });
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
      if (req.session.user)
        res.render('pages/index', { cities : cities, connected : true, user: req.session.user });
      else
        res.render('pages/index', { cities : cities, connected : false, user: null });
    });
  });

  app.post('/cities', function(req, res) {
    var cities = [];
    base('Table 1').select({ view: "Grid view" }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        cities.push({
          "name": record.get('name'),
          "id": record.get('id')
        });
      });
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
      res.json(cities);
    });    
  });

  app.get('/login', function(req, res) {
    res.render('pages/login');
  });

  app.post('/login', function(req, res) {
    user.findOne({ email: req.body.email, password: req.body.password}, function(err, _user) {
      if (err || !_user) {
        console.log("Login failed!");
        console.log("Err: " + err);
        return (res.render('pages/login'));
      }
      else {
        var cities = [];
        base('Table 1').select({ view: "Grid view" }).eachPage(function page(records, fetchNextPage) {
          records.forEach(function(record) {
            cities.push({
              "name": record.get('name'),
              "population": record.get('population'),
              "country": record.get('country'),
              "tags": record.get('tags'),
              "id": record.get('id')
            });
          });
          fetchNextPage();
        }, function done(err) {
          if (err) { console.error(err); return; }
          req.session.user = _user;
          res.render('pages/index', { cities: cities, connected: true, user: _user});
        });
      }
    }); 
  });
  
  app.get('/signup', function(req, res) {
    res.render('pages/signup');
  });

  app.post('/signup', function(req,res) {
    var newuser = new user({email: req.body.email, password: req.body.password, favoris: []});
    user.findOne({email: newuser.email}).exec(function(err, _user) {
      if (err || _user) {
        return (res.render('pages/login'));
      }
      else {
        newuser.save(function(err) {
          if (err)
            console.log(err);
        });
      }
      req.session.user = newuser;
      res.render('pages/login');
    });
  });

 app.get('/myaccount', function(req, res) {
   res.render('pages/profile', {connected: true, user: req.session.user} );
  });

  app.get('/disconnect', function(req, res) {
    user.findOne({email: req.session.user.email, password: req.session.user.password}).exec(function(err, _user) {
      if (err || !_user) {
        return (res.render('pages/login'));
      }
      else {
        _user.favoris = req.session.user.favoris;
        _user.save(function(err) {
          if (err)
            console.log(err);
        });
      }
      req.session.user = null;
      res.redirect('/');
    });
  });

  app.post('/addfavourite/:city', function(req, res) {
    req.session.user.favoris.push(req.params.city);
    res.json(req.session.user.favoris);
  });

  app.post('/deletefavourite/:city', function(req, res) {
    var i = req.session.user.favoris.indexOf(req.params.city);
    if (i > -1)
      req.session.user.favoris.splice(i, 1);
    res.json(req.session.user.favoris);
  });

}