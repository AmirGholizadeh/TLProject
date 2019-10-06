import axios from 'axios';
import { showAlert } from './showAlert';
export const login = async(name, password) => {
    try {

        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                name,
                password
            }
        });
        if (res.data.status === 'success') {

            showAlert('Successfully logged in.', 'success');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert(err.response.data.message, 'fail');
    }
};
export const logout = async() => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        });
        if ((res.data.status = 'success')) location.reload(true);
    } catch (err) {
        showAlert(err.response, 'fail');
    }
}
export const signup = async(name, password, passwordConfirm, email) => {
    try {
        console.log('hello')
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name,
                password,
                passwordConfirm,
                email
            }
        });
        if (res.data.status === 'success') {
            showAlert('Successfuly signed up.', 'success');
            window.setTimeout(() => {
                location.assign('/');

            }, 1500);
        }
    } catch (err) {
        showAlert(err.response, 'fail');
    }
};
export const updatePassword = async(currentPassword, newPassword, confirmPassword) => {
    document.getElementById('password').textContent = 'Updating..';
    try {

        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/users/updateMyPassword',
            data: {
                currentPassword,
                newPassword,
                confirmPassword
            }
        });

        if (res.data.status === 'success') {
            showAlert('Successfully updated your password.', 'success');
            setTimeout(() => {
                location.assign('/me');
            }, 1500);
        }
    } catch (err) {
        showAlert(err.response.data.message, 'fail');
    }
    document.getElementById('password').textContent = 'Update';
}

export const updateInfo = async(name, email) => {
    document.getElementById('detail').textContent = 'Updating..';
    try {

        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/users/updateMyInfo',
            data: {
                name,
                email
            }
        });
        if (res.data.status === 'success') {
            showAlert('Successfully updated your info.', 'success');
            setTimeout(() => {
                location.assign('/me');
            }, 1500);
        }
    } catch (err) {
        showAlert(err.response.data.message, 'fail');
    }
    document.getElementById('detail').textContent = 'Update';
}