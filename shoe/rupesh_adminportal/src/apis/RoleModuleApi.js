import config from "../config/config";
import axios from "axios"
import { getToken } from "../Token";
import * as url from "../helpers/url_helper";


const token = getToken();
export const RoleModuleApi = {
    getAllModule: async () => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.POST_FETCH_MODULES}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            //data: data
        };
        return await axios(axiosConfig);
    },
    getAllModulesByRoleAPI: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.POST_FETCH_MODULES_BY_ROLE}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(axiosConfig);
    }
    
}