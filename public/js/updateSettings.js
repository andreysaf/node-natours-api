import axios from 'axios';
import { showAlert } from './alerts';

export const updateNameAndEmail = async (name, email) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3001/api/v1/users/updateMe',
            data: {
                name,
                email
            }
        });

        if(res.data.status === 'success') {
            showAlert('success', 'Information updated');
            window.setTimeout(() => {
                location.assign('/me');
            }, 1000);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}