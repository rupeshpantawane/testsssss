import config from "../config/config";
import axios from "axios"
import { getToken } from "../Token";
import * as url from "../helpers/url_helper";


const token = getToken();
export const SimpleCrudApi = {
    fetchSimpleCrudsWithPeginate: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.fetchSimpleCrudsWithPeginate}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data:data
        };

        return await axios(axiosConfig);
    },
    createSimpleCrud: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.createSimpleCrud}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(axiosConfig);
    },
    fetchSimpleCrud: async (simple_crud_id) => {
        var axiosConfig = {
            method: 'get',
            url: `${config.API_URL}${url.fetchSimpleCrud}/${simple_crud_id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        return await axios(axiosConfig);
    },
    updateSimpleCrud: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.updateSimpleCrud}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(axiosConfig);
    },
    deleteSimpleCrud: async (simple_crud_id) => {
        var axiosConfig = {
            method: 'delete',
            url: `${config.API_URL}/api/admin/delete-simple-crud/${simple_crud_id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        return await axios(axiosConfig);
    }
    
}