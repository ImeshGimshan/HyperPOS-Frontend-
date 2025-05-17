import axios from 'axios';
import APILinks from './APILinks';

const getOrgInfo = async () => {
    try {
      const response = await axios.get(APILinks.getOrg, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching organization info:", error);
      throw error;
    }
};

const updateOrgInfo = async (data) => {
    try {
      const response = await axios.put(APILinks.updateOrg, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error updating organization info:", error);
      throw error;
    }
};

export { getOrgInfo, updateOrgInfo };