//Подключение к mongodb
var mongoose = require('mongoose');
var config = require('../config/index');
var log = require('../libs/log')(module);


mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'), function(err){
    if(err){
        log.info(err);
    } else{
        log.info('MongoDB connected sucessfully')
    }
});

module.exports = mongoose;