import apiService from "../../../helpers/apiService";

export default {
    getUserDetails: async (id) => {
        const response = await apiService.get(`users/${id}`);
        return response.data;
    }
}