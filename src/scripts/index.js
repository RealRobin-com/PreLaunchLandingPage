fetch('https://preregister.realrobin.com/m', {
    method: 'POST'
});

window.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.form');

    for (let form of forms) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            // send user info to api
            const url = event.target.action;
            const data = {};
            for (let element of event.target.elements) {
                const tag = element.tagName.toLowerCase();
                if (!(tag === 'input' || tag === 'textarea') || !element.name) {
                    continue;
                }
                data[element.name] = element.value;
            }

            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });

            const json = await response.json();


            // copy the toast template
            const toasts = document.querySelector('#toasts');
            let template;
            if (json.success) {
                template = document.querySelector('#success-toast-template');
            } else {
                template = document.querySelector('#error-toast-template');
            }
            let toast = document.importNode(template.content, true);


            // set the message
            toast.querySelector('.toast-message').innerHTML = json.message;

            // show it to the user
            toasts.appendChild(toast);

            // close the toast when it's clicked
            toast = toasts.children[toasts.children.length - 1]
            toast.querySelector('.toast-close').addEventListener('click', (event) => {
                toast.classList.add('remove-toast');
                setTimeout(() => {
                    toasts.removeChild(toast);
                }, 300);
            });

            return false;
        });
    }

    // keep all email inputs in sync
    const emailInputs = document.querySelectorAll('input[type="email"');
    for (let emailInput of emailInputs) {
        emailInput.addEventListener('input', (event) => {
            const newValue = event.target.value;
            for (let emailInput of emailInputs) {
                if (emailInput.value !== newValue) {
                    emailInput.value = newValue;
                }
            }
        });
    }
});