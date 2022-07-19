import apiService from "../../../helpers/apiService";

export default {
    fetchAll: async () => {
        const response = await apiService.getWithoutAuthHeader(`api/featureToggles`);
        return response.data;
    }
}