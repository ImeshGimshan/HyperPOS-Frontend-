import axios from 'axios';
import  APILinks from './APILinks';


const getOrgInfo = async () => {
        const response = await axios.get(APILinks.getOrg,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data;
};

const updateOrgInfo = async (data) => {
    const response = await axios.post(getOrg, data, {
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response.data;
};

export {getOrgInfo, updateOrgInfo};