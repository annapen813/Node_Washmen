const packageFile = require('../package.json');
import infoType from '../types/info.type';

const info = async (req, res, next) => {
    const infoData: infoType = await {
        name: packageFile.name,
        version: packageFile.version,
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now(),
    };

    try {
        res.status(200).json(infoData);
        next();
    } catch (e) {
        infoData.message = e;
        res.status(503).json(infoData);
        next(e);
    }
}

export = info;