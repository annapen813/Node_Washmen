const express = require('express');
const router = express.Router();
import {responseStatus, erroMessage, successMessage} from '../constants/response';
import IPartnerRequestType from '../types/partnersRequest.type';
import responseType from '../types/response.type';
import {getPartners} from '../dataAccess/partners';

/**
 * @api {post} /api/profile/login
 * @apiGroup Profile
 * @apiSuccess (200) {Object} validate the register user
 */
 router.get('/get', async(req, res) => {


    if (req && req.query) {
        let {lat, lon} = req.query;
        let token = req.headers["authorization"];

        let data: IPartnerRequestType = {
            token,
            lat,
            lon
        };

        let response = await getPartners(data);
         
        if(response.status == responseStatus.success) {
            let resData: responseType = { status: response.status,message: "", data: response.data  };
            res.status(200).json(resData);
        } else {
            let resData: responseType = { status: response.status, message: erroMessage.failure, data: null };
            res.status(200).json(resData);
        }
    }
    else {
        let errorData: responseType = { status: responseStatus.error, message: erroMessage.invalidData, data: null };
        res.status(400).json("errorData");
    }
});

export default router;