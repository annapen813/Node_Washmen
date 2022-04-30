import IProfileType from '../types/profile.type';
import ILoginType from '../types/login.type';
import userProfile from '../database/schema/userProfile';
const log = require('../log');
import { responseStatus } from '../constants/response';
import responseToken from '../types/responseToken.type';
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWTKEY;

export async function createUser(profileRequest: IProfileType) {
    try {
        const profileData = new userProfile({
            user_name: profileRequest.user_name,
            password: profileRequest.password,
            first_name: profileRequest.first_name,
            last_name: profileRequest.last_name,
            email_address: profileRequest.email_address
        });

        await profileData.save();
        return responseStatus.success;
    } catch (e) {
        log.error(`Error occured while creating new user - ${profileRequest.user_name} - ${e}`);
        return responseStatus.error;
    }
}

export async function validateUser(loginRequest: ILoginType) {
    try {
        const profileData = await userProfile.find({
            user_name: loginRequest.user_name,
            password: loginRequest.password,
            status: 'active'
        });

        console.log(profileData.length)
        if (profileData && profileData.length > 0) {
            const data:IProfileType = {
                user_name: profileData[0].user_name,
                first_name: profileData[0].first_name,
                last_name: profileData[0].last_name,
                email_address: profileData[0].email_address
            };
            console.log(data);
            const token: string = jwt.sign({data: data}, jwtKey, { expiresIn: "1h" });
            let response: responseToken = { status: responseStatus.success, token: token };

            return response;
        }
        else {
            log.error(`Error Invalid user - ${loginRequest.user_name}`);
            let response: responseToken = { status: responseStatus.error, token: "" };
            return response;
        }
    } catch (e) {
        log.error(`Error occured while validating the user - ${loginRequest.user_name} - ${e}`);
        let response: responseToken = { status: responseStatus.error, token: "" };
        return response;
    }
}