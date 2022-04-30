
/**
 * @class mongodb
 * @description Initialize database connection with Mongodb using mongoose package
 */

import { connect } from 'mongoose';
require('dotenv').config();
const host = process.env.DB_HOST || 'mongodb://localhost:27017/washmen';
const logger = require('../../log');

/***
 * @method createConnection
 * @description connect to the database and exit in case of any error.
 */
export async function createConnection() {

    await connect(host, {useNewUrlParser:true, useUnifiedTopology:true, connectTimeoutMS: 30000, maxPoolSize:10, useCreateIndex: true }, (err) => {
        if (err) {
            logger.error(`Unable to connect database ${err}`);
            process.exit(1);
        }
        logger.info('Successfully connected to database');
    });
    
}