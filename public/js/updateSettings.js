import axios from 'axios';
import { showAlert } from './alerts';

export const updateNameAndEmail = async (data) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/users/updateMe',
            data
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

export const updatePassword = async (passwordCurrent, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/users/updateMyPassword',
            data: {
                passwordCurrent,
                password,
                passwordConfirm
            }
        });

        if(res.data.status === 'success') {
            showAlert('success', 'Password updated');
            window.setTimeout(() => {
                location.assign('/me');
            }, 1000);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}