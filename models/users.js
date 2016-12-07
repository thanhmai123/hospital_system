/**
 * Created by NarX on 12/6/16.
 */
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
var uri = 'mongodb://localhost/hospital';
// mongoose.connect(uri);

console.log("OK");
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String
    },
    _type: {
        type: String
    },
    token: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByUserName = function (username) {
    var query = { username : username };
    return new Promise(function (resolve, reject) {
        User.find(query).then(function (data) {
            if (data.length == 0)
                reject({
                    msg: "user doesn't exists."
                });
            else
                resolve(data);
        }, function (err) {
            reject(err);
        });
  });  
};


/*
* this function will save token once user login
* */
module.exports.updateToken = function (username, token) {
    var query = { username : username };
    return new Promise(function (resolve, reject) {
        User.find(query).then(function (data) {
            current_user = data[0];
            current_user.token = token;
            current_user.save().then(function (document) {
                resolve(document);
            }, function (err) {
                console.log(err);
                reject(err);
            });
        }, function (err) {
            reject(err);
        })
    });
};
/*
User.find({}).then(function (data) {
    console.log(data);
}, function (err) {
    console.log(err)
});
*/
