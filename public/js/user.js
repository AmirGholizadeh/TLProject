import axios from 'axios';
import { showAlert } from './showAlert'
const editRoleUI = (id, role) => {
    document.getElementById(id).childNodes[6].innerText = role;
    docoument.getElementById('role').value = '';
};
export const editRole = async(id, role) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/users/${id}`,
            data: {
                role
            }
        });
        if (res.data.status === 'success') {
            showAlert('Successfully edited the user.', 'success');
            editRoleUI(id, role);
        }
    } catch (err) {
        showAlert(err.response.data.message, 'fail');
    }
}