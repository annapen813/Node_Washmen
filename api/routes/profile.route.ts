const express = require('express');
const router = express.Router();
import { createUser, validateUser } from '../dataAccess/profile';
import IProfileType from '../types/profile.type';
import ILoginType from '../types/login.type';
import responseTokenType from '../types/responseToken.type';
import responseType from '../types/response.type';
import {responseStatus, erroMessage, successMessage} from '../constants/response';


/**
 * @api {post} /api/profile/register
 * @apiGroup Profile
 * @apiSuccess (200) {Object} data the register user
 */
router.post('/register', async(req, res) => {
    console.log(req.body);
    if (req && req.body && Object.keys(req.body).length > 0) {
        let data: IProfileType = {
            user_name: req.body.user_name,
            password: req.body.password,
            email_address: req.body.email_address,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        };

        let status = await createUser(data);
         
        if(status == responseStatus.success) {
            let resData: responseType = { status: status, message: successMessage.createdMessage, data: null };
            res.status(200).json(resData);
        } else {
            let resData: responseType = { status: status, message: erroMessage.failure, data: null };
            res.status(200).json(resData);
        }
   

    }
    else {
        let errorData: responseType = { status: responseStatus.error, message: erroMessage.invalidData, data: null };
        res.status(400).json(errorData);
    }



});

/**
 * @api {post} /api/profile/login
 * @apiGroup Profile
 * @apiSuccess (200) {Object} validate the register user
 */
 router.post('/login', async(req, res) => {
    if (req && req.body && Object.keys(req.body).length > 0) {
        let data: ILoginType = {
            user_name: req.body.user_name,
            password: req.body.password
        };

        let response = await validateUser(data);
         
        if(response.status == responseStatus.success) {
            let resData: responseTokenType = { status: response.status, token: response.token };
            res.status(200).json(resData);
        } else {
            let resData: responseType = { status: response.status, message: erroMessage.failure, data: null };
            res.status(200).json(resData);
        }
    }
    else {
        let errorData: responseType = { status: responseStatus.error, message: erroMessage.invalidData, data: null };
        res.status(400).json(errorData);
    }



});

export default router;

