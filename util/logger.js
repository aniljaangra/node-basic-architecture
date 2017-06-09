/**
 * Created by Anil Jangra on 2/6/17
 */
const winston = require('winston'),
    path = require('path');

let logger;

//======================================= Exports ================================================

module.exports = { configure, getTaggedLogger, getLoggerInstance: () => logger };

//======================================= Implementation =========================================

/**
 * Configure Logger
 * @param logDir : use this directory to store all logs
 */
function configure(logDir) {
    logger = new winston.Logger({
        transports: [
            new winston.transports.File({
                level: 'info',
                name: 'file_logger',
                filename: path.join(logDir, 'all-logs.log'),
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                colorize: true
            }),
            new winston.transports.File({
                level: 'error',
                name: 'error_logger',
                filename: path.join(logDir, 'error-logs.log'),
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                colorize: true
            }),
            new winston.transports.Console({
                level: 'debug',
                name: 'console_logger',
                handleExceptions: true,
                humanReadableUnhandledException: true,
                json: false,
                colorize: true
            })
        ],
        exitOnError: true
    });
    return logger;
}


/**
 * returns custom logger for given tag
 * @param tag
 */
function getTaggedLogger(tag) {
    return new function customLogger() {
        const that = this;
        ['info', 'debug', 'error'].forEach(level => {
            that[level] = (...args) => {
                args.unshift(tag);
                logger[level](...args);
            };
        });
    }();
}

