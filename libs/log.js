var winston = require('winston');
var appRoot = require('app-root-path');
var ENV = process.env.NODE_ENV;

const { format } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        prettyPrint: true,
        maxsize: 5242880, // 5MB
        maxFiles: 100,
        colorize: true,
    }
};

function getLogger(module){
    return winston.createLogger({
        format: combine(
            label({ label: module.filename }),
            timestamp(),
            colorize(),
            myFormat
          ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File(options.file)
        ]
    });
}

module.exports = getLogger;