function fetchData() {

    fetch('http://localhost:5500/task')
        .then(response => {
            return response.json()
        })
        .then(data => {
            const html = data
                .map(todo => {
                    return `<p> Title:  ${todo.title} 
                        <br>
                        Done: ${todo.done}
                        <br>
                        Created: ${todo.created}
                        <br>
                        Urgent: ${todo.urgent}
                        </p>
                        <hr>`
                })
                .join('')
            document.querySelector('.todos').innerHTML = html
        })
        .catch(error => {
            console.log(error)
        })
}

function displayLogin() {
    var login = document.querySelector('.login');

    if (login.style.display == 'block')
        login.style.display = 'none';
    else
        login.style.display = 'block';
}

function displayRegister() {
    var register = document.querySelector('.register');

    if (register.style.display == 'block')
        register.style.display = 'none';
    else
        register.style.display = 'block';
}

fetchData()