import axios from 'axios';
import { showAlert } from './showAlert';

const addTodoUI = (id, n, d, t, p) => {
    const tlContainer = document.createElement('div');
    tlContainer.id = id;
    tlContainer.className = 'tl__container';

    const ul = document.createElement('ul');
    ul.className = 'tl__list';

    const item = document.createElement('li');
    item.className = 'tl__item';

    const spanItem = document.createElement('span');
    spanItem.className = 'tl__item--item';
    spanItem.textContent = n;

    const spanDes = document.createElement('span');
    spanDes.className = 'tl__item--description';
    spanDes.textContent = d;

    const time = document.createElement('li');
    time.textContent = t
    time.className = 'tl__item tl__item--time';

    const priority = document.createElement('li');
    priority.textContent = p;
    priority.className = `tl__priority tl__priority--${p}`;


    const divider = "<div class='divider divider--vertical'></div>";
    item.appendChild(spanItem);
    item.appendChild(spanDes);
    console.log(divider);
    ul.appendChild(item);
    ul.innerHTML += divider;
    ul.appendChild(priority);
    ul.innerHTML += divider;
    ul.appendChild(time);




    const actions = document.createElement('div');
    actions.className = 'actions';

    // const edit = document.createElement('button');
    // edit.textContent = 'edit';
    // edit.className = 'btn btn--edit edit-todo';
    // edit.addEventListener('click', e => {
    //     e.preventDefault();
    //     deleteTodo(tlContainer.id);
    // });

    const del = document.createElement('button');
    del.textContent = 'delete';
    del.className = 'btn btn--delete delete-todo';
    del.addEventListener('click', e => {
        e.preventDefault();
        deleteTodo(tlContainer.id);
    });

    // actions.appendChild(edit);
    actions.appendChild(del);



    tlContainer.appendChild(ul);
    tlContainer.innerHTML += divider;
    tlContainer.appendChild(actions);

    document.querySelector('.tl').appendChild(tlContainer);
};

const editTodoUI = (id, data) => {
    const tlContainer = document.getElementById(id);
    tlContainer.childNodes[0].childNodes[0].childNodes[0] = data.name;
    tlContainer.childNodes[0].childNodes[0].childNodes[1].innerText = data.description;
    tlContainer.childNodes[0].childNodes[2].innerText = data.time;
    tlContainer.childNodes[0].childNodes[4].innerText = data.priority;
    document.querySelector('.btn--form').textContent = 'Add';
    document.querySelector('.btn--form').id = '';
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('time').value = '';
    document.getElementById('priority').value = '';

};

const removeTodo = (id) => {
    document.getElementById(id).remove();
};
export const addTodo = async(name, description, time, priority) => {
    try {
        const resTodo = await axios({
            method: 'POST',
            url: '/api/v1/todos/createAndAddTodo',
            data: {
                name,
                description,
                time,
                priority
            }
        });

        if (resTodo.data.status === 'success') {
            showAlert('Successfully added.', 'success');
            addTodoUI(resTodo.data.data.data._id, name, description, time, priority);
        };
    } catch (err) {
        showAlert(err.response.data.message, 'fail');
    }
};

export const deleteTodo = async(id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/todos/${id}`,
            data: null
        });
        if (res.status === 204) {
            showAlert('Successfully deleted.', 'success');
            removeTodo(id);
        }
    } catch (err) {
        showAlert(err.response.data.message, 'fail');

    }
};

export const editTodo = async(id, data) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/todos/${id}`,
            data
        });

        if (res.data.status === 'success') {
            showAlert('Successfully edited.', 'success');
            editTodoUI(id, data);
        }
    } catch (err) {
        showAlert(err.response.data.message, 'fail');
    };
};