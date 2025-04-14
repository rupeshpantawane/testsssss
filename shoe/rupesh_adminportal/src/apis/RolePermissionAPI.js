import config from "../config/config";
import axios from "axios"
import { getToken } from "../Token";
import * as url from "../helpers/url_helper";


const token = getToken();
export const RolePermissionAPI = {
    saveUpdateRolePermissionAPI: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.SAVE_UPDATE_PERMISSION}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(axiosConfig);
    },
}