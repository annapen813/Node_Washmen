const log = require('../log');
import IPartnerRequestType from '../types/partnersRequest.type';
import partners from '../database/schema/partners';
import responseType from '../types/response.type';
const jwt = require('jsonwebtoken');
import {responseStatus, erroMessage, successMessage} from '../constants/response';
import IPartnerResponseType from '../types/partersResponse.type';
import {getRangeKms} from '../Utils/common';
const jwtKey = process.env.JWTKEY;
const _ = require('lodash');

export async function getPartners(partnersRequest: IPartnerRequestType) {
    try {
        let { token, lat, lon } = partnersRequest;
        let partnerResponses = Array<IPartnerResponseType>();
        if (token && lat && lon) {
            try {
                let decoded = jwt.verify(token, jwtKey);
                if (decoded) {
             
                    try {

                        let data = await partners.aggregate([
                            {
                                $unwind: {
                                    path: "$offices"
                                }
                            },
                            {
                                $match: {
                                    "offices": {
                                        "$geoWithin": {
                                            "$centerSphere": [
                                                [Number(lon), Number(lat)], 5 / 3963.2]
                                        }
                                    }
                                }
                            }

                        ]);

                        if(data) {
                            data.forEach(async(element)=>{
                                if(element) {
                                    let distance = await getRangeKms(Number(lon), Number(lat), element.offices.coordinates[0], element.offices.coordinates[1]);
                                    //console.log('coordinate: ',element.offices.coordinates);
                                    //console.log('distance: ', distance);
                                    //console.log('name: ', element.organization);
                                    //console.log('address: ', element.offices.address);
                                    let officeInfo: IPartnerResponseType = {
                                                                            officeName: element.organization, 
                                                                            officeAddress: element.offices.address, 
                                                                            latitude: element.offices.coordinates[1], 
                                                                            longitude: element.offices.coordinates[0], 
                                                                            totaldistance: distance };
                                    partnerResponses.push(officeInfo);  
                                }
                            })
                        }

                    } catch (e) {
                        console.log(e)
                    }
                    let response: responseType = { status: responseStatus.success, message: "", data:  partnerResponses};
                    return response;
                }
            } catch (e) {
                log.error(`Error invalid token - ${e} - ${token}`);
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