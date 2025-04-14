import config from "../config/config";
import axios from "axios"
import { getToken } from "../Token";
import * as url from "../helpers/url_helper";

const token = getToken();
export const ProfileApi = {
    updateProfile: async (data) => {
        var axiosConfig = { 
            method: 'post',
            url: `${config.API_URL}${url.POST_UPDATE_USER_PROFILE}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(axiosConfig);
    },
    changePassword: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.POST_UPDATE_USER_PASSWORD}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(axiosConfig);
    },
    updateLanguage: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.POST_UPDATE_USER_LANGUAGE}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(axiosConfig);
    },
}

