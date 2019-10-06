import axios from 'axios';
import { showAlert } from './showAlert';

export const sendSingle = async(id, title, message) => {
    try {
        const resMessage = await axios({
            method: 'POST',
            url: '/api/v1/messages',
            data: {
                title,
                message
            }
        });
        if (resMessage.data.status === 'success') {
            const resUser = await axios({
                method: 'PATCH',
                url: `/api/v1/users/${id}`,
                data: {
                    messages: resMessage.data._id
                }
            });
            if (resUser.data.status === 'success') {
                console.log(resUser);
                showAlert(`Successfully sent a message to ${resUser.data.data.data.name}`, 'success')
            }
        }
    } catch (err) {
        showAlert(err.response.data.message, 'fail');
    };
};
export const sendMultiple = async(title, message) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/users/sendMessageAll',
            data: {
                title,
                message
            }
        });
        if (res.data.status === 'success') {
            showAlert('Successfully sent a message to everyone.', 'success');
        };
    } catch (err) {
        showAlert(err.response.data.message, 'fail');
    }
};