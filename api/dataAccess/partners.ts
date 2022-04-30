const log = require('../log');
import IPartnerRequestType from '../types/partnersRequest.type';
import partners from '../database/schema/partners';
import responseType from '../types/response.type';
const jwt = require('jsonwebtoken');
import {responseStatus, erroMessage, successMessage} from '../constants/response';
const jwtKey = process.env.JWTKEY;

export async function getPartners(partnersRequest: IPartnerRequestType) {
    try {
        let { token, lat, lon } = partnersRequest;
        if (token && lat && lon) {
            try {
                let decoded = jwt.verify(token, jwtKey);
                if (decoded) {
                    const data = await partners.find({
                        //id: 10
                    });
                    let response: responseType = { status: responseStatus.success, message: "", data: data };
                    return response;
                }
            } catch (e) {
                log.error(`Error invalid token -  ${token}`);
                let response: responseType = { status: responseStatus.error, message: erroMessage.invalidData, data: null };
                return response;
            }
        } else {
            log.error(`Error occured while retrieving partners - ${partnersRequest.token}`);
            let response: responseType = { status: responseStatus.error, message: erroMessage.invalidData, data: null };
            return response;
        }


    } catch (e) {
        log.error(`Error occured while retrieving partners - ${partnersRequest.token} - ${e}`);
        let response: responseType = { status: responseStatus.error, message: erroMessage.invalidData, data: null };
        return response;
    }
}