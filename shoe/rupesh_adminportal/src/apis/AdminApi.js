import config from "../config/config";
import axios from "axios"
import { getToken } from "../Token";

const token = getToken();
export const AdminApi = {
    getAllModule: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.API_URL}/api/admin/fetch-role-modules`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(axiosConfig);
    }
}