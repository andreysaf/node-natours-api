import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3001/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        if(res.data.status === 'success') {
            showAlert('success', 'Logged in successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3001/api/v1/users/logout'
        });

        if(res.data.status === 'success') {
            location.reload();
        }
    } catch (error) {
        showAlert('error', 'error logging out');
    }
}