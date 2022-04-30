import { createLogger, format, transports }  from 'winston';
const { combine, timestamp, json } = format;

require('dotenv').config();
const logLevel = process.env.logLevel || 'error';
const maxSize = Number(process.env.maxSize) || 10485760;

var logger = createLogger({
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    trace: 4,
    debug: 5
  },
  level: logLevel,  
  format: combine(timestamp(), json()),
  transports: [new transports.File({ filename: `app.log`, maxsize: maxSize })],
  exitOnError:false
});

module.exports = logger;
