import config from "../config/config";
import axios from "axios"
import { getToken } from "../Token";
import * as url from "../helpers/url_helper";


const token = getToken();
export const RoleApi = {
    createRole: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.POST_CREATE_ROLE}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(axiosConfig);
    },
    getRoleById: async (role_id) => {
        var axiosConfig = {
            method: 'get',
            url: `${config.API_URL}${url.POST_FETCH_ROLE}/${role_id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        return await axios(axiosConfig);
    },
    updateRole: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.POST_UPDATE_ROLE}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(axiosConfig);
    },
    deleteRole: async (role_id) => {
        var axiosConfig = {
            method: 'delete',
            url: `${config.API_URL}/api/admin/delete-role/${role_id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        return await axios(axiosConfig);
    },
    getAllRoles: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.POST_FETCH_ALL_ROLES}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data:data
        };

        return await axios(axiosConfig);
    }
}