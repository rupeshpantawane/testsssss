import axios from "axios";
import config from "../config/config";
import * as url from "../helpers/url_helper";


export const AuthAPI = {
    login: async (data) => {
        return await axios.post(`${config.API_URL}${url.POST_ADMIN_LOGIN}`, data);
    },
    forgotPassword: async (data) => {
        return await axios.post(`${config.API_URL}/api/admin/forgot-password`, data);
    },
    resetPassword: async (data) => {
        return await axios.post(`${config.API_URL}/api/admin/reset-password`, data);
    }
}