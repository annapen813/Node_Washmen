import infoType from '../types/info.type';
const express = require('express');
const router = express.Router();
const packageFile = require('../package.json');


/**
 * @api {post} /api/info
 * @apiGroup Healthcheck
 * @apiSuccess (200) {Object} data the api information
 */
router.get('/info', (req, res) =>{
    const infoData: infoType =  {
        name: packageFile.name,
        version: packageFile.version,
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now(),
    };

    try {
        res.status(200).json(infoData);
    } catch (e) {
        infoData.message = e;
        res.status(503).json(infoData);
    }
});

export default router;

