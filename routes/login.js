/**
 * Created by NarX on 12/6/16.
 */
var express = require('express');
var router = express.Router();
var md5 = require('md5');

var User = require('../models/users');

/* GET users listing. */
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    if (username == undefined || password == undefined) {
        console.log('undefined field');
        res.send({msg: "Invalid username or password"});
    } else {
        User.getUserByUserName(username).then(function (data) {
            var user = data[0];
            if (password === user.password) {
                console.log('login successful');
                var token = md5(username + ''+ Date.now());

                User.updateToken(username, token).then(function (document) {
                    console.log(document);
                }, function (err) {
                    res.send(err);
                });
                res.send({
                    token: token
                });
            } else {
                res.send({
                    msg: "wrong username or password"
                });
            }
        }, function (err) {
            // console.log(err);
            res.send(err);
        });
    }
});

module.exports = router;
