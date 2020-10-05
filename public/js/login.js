import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
    console.log(email);
    console.log(password);
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
            showAlert('success', 'Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}