const server = require('./server');
const log = require('../log');
require('dotenv').config();

const port = process.env.PORT || 5000;

const database = require('../database/mongodb');


database.createConnection().then(() =>{
    server.listen(port, () => {
        log.info('Connected to database!')
        log.info(`Listening on port ${port}`);
        console.log(`Connected to database and listening on port ${port}`);
    })
}).catch((e) =>{
    log.error('Unable to connect database');
    process.exit();
});

