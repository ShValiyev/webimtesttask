var config = require('../config/index');
var passport = require('passport');
var request = require('request');
var AuthVKStrategy = require('passport-vkontakte').Strategy;


//Авторизация приложения и получение accessToken
passport.use('vk', new AuthVKStrategy({
        clientID: config.get("vk:appId"),
        clientSecret: config.get("vk:secretKey"),
        callbackURL: config.get("appURL") + "/auth/vk/callback",
        profileFields: ['bdate', 'photo_200']
    },
    function (accessToken, refreshToken, profile, done) {
        var gender;
        if(profile._json.sex == 2){
            gender = 'Мужской'
        } else if(profile._json.sex == 1){
            gender = 'Женский'
        } else {
            gender = 'Пол не указан'
        }
        //Запрос на получение списка друзей
        request('https://api.vk.com/method/friends.get?user_id=' + profile.id + '&fields=city,photo_50&order=random&count=5&access_token=' + accessToken + '&v=5.8', function (error, response, body) {
            if(error){
                return next(error);
            }
            var obj = JSON.parse(body);
            // console.log(obj.response.items);
            return done(null, {
                username: profile.displayName,
                photoUrl: profile.photos[1].value,
                sex: gender,
                birthday: profile.birthday,
                friends: obj.response.items
            });
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});


passport.deserializeUser(function (data, done) {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err)
    }
});

module.exports = function (app) {
};