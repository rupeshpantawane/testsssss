import config from "../config/config";
import axios from "axios"
import { getToken } from "../Token";
import * as url from "../helpers/url_helper";


const token = getToken();
export const EmployeeApi = {
    createEmp: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.POST_CREATE_EMP}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(axiosConfig);
    },
    getEmpById: async (emp_id) => {
        var axiosConfig = {
            method: 'get',
            url: `${config.API_URL}${url.POST_FETCH_EMP}/${emp_id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        return await axios(axiosConfig);
    },
    updateEmp: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.POST_UPDATE_EMP}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(axiosConfig);
    },
    deleteEmp: async (emp_id) => {
        var axiosConfig = {
            method: 'delete',
            url: `${config.API_URL}/api/admin/delete-emp/${emp_id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        return await axios(axiosConfig);
    },
    getAllEmps: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.POST_FETCH_ALL_EMPS}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data:data
        };

        return await axios(axiosConfig);
    },
    sold: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}${url.POST_SOLD}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(axiosConfig);
    },
}