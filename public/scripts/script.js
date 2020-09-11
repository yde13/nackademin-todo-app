




function login() {
    let form = document.getElementById('loginform')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        let formData = new FormData(form)
        let data = {
            username: formData.get("username"),
            password: formData.get('password')
        }
        fetch('/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)

        })
            .then(response => response.json())
            .then(result => {
                console.log(result);

                document.getElementById("error").innerHTML = result.error;

                if (typeof (Storage) !== undefined) {
                    // Store
                    sessionStorage.setItem("token", result.data.token);
                    sessionStorage.setItem('id', result.data.user._id)
                    // Retrieve
                    // document.getElementById("result").innerHTML = sessionStorage.getItem("token");
                    document.getElementById("granted").innerHTML =
                        `Username: ${result.data.user.username}
                      <br>  
                      Role: ${result.data.user.role}
                      <br>
                      Password: ${result.data.user.password}
                      <br>
                      Token: ${result.data.token} `

                    if(result.data.user.role !== 'Admin'){
                        console.log('ej admin');
                        
                    } else {
                        console.log('fetchar ändå');
                        
                        fetchData()
                    }

                    

                    // headers.append('Authorization', `Bearer ${result.data.token}`) //detta funkar tydligen inte

                } else {
                    console.log('Something went wrong!');
                }
            })

    })
}


function fetchData() {
    let token = sessionStorage.getItem("token");

    fetch('http://localhost:5500/task', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);

            const html = data

                .map(todo => {
                    return `<p> Title:  ${todo.title} 
                        <br>
                        Done: ${todo.done}
                        <br>
                        Created: ${todo.created}
                        <br>
                        Urgent: ${todo.urgent}
                        <br>
                        List id: ${todo.listID}
                        </p>
                        <hr>`
                })
                .join('')
            document.querySelector('.todos').innerHTML = html
            console.log('Fick access');

        })
        .catch(error => {
            console.log(error)
        })
}

// function fetchOneData() {
//     let id = sessionStorage.getItem("id");

//     fetch(`http://localhost:5500/task/${id}`, {
//         method: 'GET',
//         headers: {
//             'content-type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//     })
//         .then(response => {
//             return response.json()
//         })
//         .then(data => {
//             console.log(data);

//             const html = data

//                 .map(todo => {
//                     return `<p> Title:  ${todo.title} 
//                         <br>
//                         Done: ${todo.done}
//                         <br>
//                         Created: ${todo.created}
//                         <br>
//                         Urgent: ${todo.urgent}
//                         <br>
//                         List id: ${todo.listID}
//                         </p>
//                         <hr>`
//                 })
//                 .join('')
//             document.querySelector('.todos').innerHTML = html
//             console.log('Fick access');

//         })
//         .catch(error => {
//             console.log(error)
//         })
// }


function register() {
    let form = document.getElementById('registerform')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        let formData = new FormData(form)
        let data = {
            username: formData.get("username"),
            password: formData.get('password'),
            role: formData.get('role')
        }
        fetch('/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)

        })
            .then(response => response.json())
            .then(result => {
                console.log(result);

            })
    })
}

function logout() {
    sessionStorage.removeItem('token');
    console.log('removed token from session storage');

}

//create fetch for delete

//create fetch for edit


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

login()
register()
