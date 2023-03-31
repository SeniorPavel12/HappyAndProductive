const buttonForm = document.querySelectorAll('.form__button')[0];
const logoutButtonForm = document.querySelectorAll('.form__button_logout')[0];
const testButtonForm = document.querySelectorAll('.form__button_test')[0];
const inputName = document.getElementById('formName');
const inputPass = document.getElementById('formPass');
const URLRegistration = 'http://127.0.0.1:8000/my_user/api/create_user/';
const URLLogin = 'http://127.0.0.1:8000/my_user/api/login_user/';
const URLUpdate = 'http://127.0.0.1:8000/my_user/api/update_token/';
const URLTest = 'http://127.0.0.1:8000/my_user/api/test/';
const arr = [];
const URLLogout = 'http://127.0.0.1:8000/my_user/api/logout_user/'

function sendForm(URLRegistration, URLLogin, button, inputName, inputPass, buttonLogout, buttonTest) {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const valueInputName = inputName.value;
        const valueInputPass = inputPass.value;
        console.log("start")
        createUsers(URLRegistration, valueInputName, valueInputPass);
    })
    buttonLogout.addEventListener('click', (e) => {
        logoutUser(URLLogout);
        console.log(localStorage);
        localStorage.clear()
        console.log(localStorage);
    })
    buttonTest.addEventListener('click', (e) => {
        const accessToken = localStorage.getItem('accessToken')
        console.log('test_url')
        testUser(URLTest, accessToken)
    })
}

const logoutUser = async (URL) => {
    await fetch(URL, {
        method: 'POST',

    })
        // .then((data) => data.json())
        // .then((userData) => arr.push(userData))
};


const createUsers = async (URL, valueInputName, valueInputPass) => {
    await fetch(URL, {
        method: 'POST',
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify({username: `${valueInputName}`, password: `${valueInputPass}`})
    })
        .then((data) => data.json())
        .then((userData) => arr.push(userData))

        console.log('create_user');
        giveTokens(URLLogin, valueInputName, valueInputPass);
        console.log('login_user');
        console.log(localStorage);
}

const giveTokens = async (URL, valueInputName, valueInputPass) => {
    await fetch(URL, {
        method: 'POST',
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify({username: `${valueInputName}`, password: `${valueInputPass}`})
    })
        .then((data) => data.json())
        .then((userData) => {
            localStorage.setItem('accessToken', userData.access);
            localStorage.setItem('refreshToken', userData.refresh);
        })


}

const testUser = async (URL, token) => {
    await fetch(URL, {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${token}`
        },
    })
        // .then((data) => data.json())
        // .then((userData) => arr.push(userData))
};

sendForm(URLRegistration, URLLogin, buttonForm, inputName, inputPass, logoutButtonForm, testButtonForm);


