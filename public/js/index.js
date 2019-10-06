import '@babel/polyfill';
import { login, logout, signup, updatePassword, updateInfo } from './account';
import { addTodo, deleteTodo, editTodo } from './todos';
import { showAlert } from './showAlert';
import { sendSingle, sendMultiple } from './sendMessage';
import { editRole } from './user';
const loginForm = document.querySelector('.form--login');
const logoutButton = document.getElementById('logout');
const signupForm = document.querySelector('.form--signup');
const ltForm = document.querySelector('.form--lt');
const deleteButton = document.querySelectorAll('.delete-todo');
const editButton = document.querySelectorAll('.edit-todo');
const name = document.getElementById('name');
const description = document.getElementById('description');
const time = document.getElementById('time');
const title = document.getElementById('title');
const message = document.getElementById('message');
const singleButton = document.querySelectorAll('.message-single');
const multipleButton = document.getElementById('message-multiple');
const editUserButton = document.querySelectorAll('.edit-user');
const editUserRoleButton = document.getElementById('edit-user-role');
const role = document.getElementById('role');
const username = document.getElementById('username');
const email = document.getElementById('email');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const currentPassword = document.getElementById('currentPassword');
const updatePasswordButton = document.getElementById('password');
const updateDetailButton = document.getElementById('detail');
let userID;
if (updatePasswordButton) {
    updatePasswordButton.addEventListener('click', e => {
        e.preventDefault();
        if (currentPassword.value === '' || newPassword.value === '' || confirmPassword.value === '') {
            showAlert('Please fill out the values.', 'fail');
        } else {
            updatePassword(currentPassword.value, newPassword.value, confirmPassword.value);


        }

    });
}
if (updateDetailButton) {
    updateDetailButton.addEventListener('click', e => {
        e.preventDefault();
        updateInfo(username.value, email.value);
    });
}
if (editUserButton) {
    editUserButton.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            role.value = e.target.parentElement.parentElement.childNodes[6].innerText;
            userID = e.target.parentElement.parentElement.id;
        });
    });
}
if (editUserRoleButton) {
    editUserRoleButton.addEventListener('click', e => {
        e.preventDefault();
        editRole(userID, role.value);
    });
}
if (singleButton) {
    singleButton.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            sendSingle(e.target.parentElement.parentElement.id, title.value, message.value);
        });
    });
}
if (multipleButton) {
    multipleButton.addEventListener('click', e => {
        e.preventDefault();
        sendMultiple(title.value, message.value);
    });
}
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(name, password);
    });
}
if (logoutButton) {
    logoutButton.addEventListener('click', e => {
        e.preventDefault();
        logout();
    });
}
if (signupForm) {
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        const email = document.getElementById('email').value;
        signup(name, password, passwordConfirm, email);
    });
}

if (deleteButton) {
    deleteButton.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            deleteTodo(e.target.parentElement.parentElement.id);
        });
    });
}
let id;
if (editButton) {
    editButton.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            name.value = e.target.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[0].innerText;
            description.value = e.target.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[1].innerText;
            time.value = e.target.parentElement.parentElement.childNodes[0].childNodes[1].innerText;
            priority.value = e.target.parentElement.parentElement.childNodes[0].childNodes[2].innerText;
            document.querySelector('.btn--form').textContent = 'Edit';
            document.querySelector('.btn--form').id = 'edit-todo';
            id = e.target.parentElement.parentElement.id;
        });
    });
}
if (ltForm) {
    ltForm.addEventListener('submit', e => {
        e.preventDefault();
        if (document.querySelector('.btn--form').id === 'edit-todo') {
            const data = {
                name: name.value,
                description: description.value,
                time: time.value,
                priority: priority.value
            };
            editTodo(id, data);
        } else {
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const time = document.getElementById('time').value;
            const priority = document.getElementById('priority').value;
            addTodo(name, description, time, priority);
        }
    });
}