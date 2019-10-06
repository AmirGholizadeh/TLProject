export function showAlert(message, state) {
    const body = document.querySelector('body');
    const divContainer = document.createElement('div');
    divContainer.className = 'alert-container';
    const div = document.createElement('div');
    div.className = `alert alert--${state}`;
    const p = document.createElement('p');
    p.textContent = message;
    p.className = 'alert__paragraph'
    div.appendChild(p);
    divContainer.appendChild(div);
    body.appendChild(divContainer);
    setTimeout(() => {
        divContainer.remove();
    }, 1500);
};