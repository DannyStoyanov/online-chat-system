// Sign up
var storage = window.localStorage;

const signUpFormElement = document.getElementById('sign-up-form');
const signUpButtonElement = document.getElementById('sign-up-button');
const signUpUsernameElement = document.getElementById('sign-up-username');
const signUpEmailElement = document.getElementById('sign-up-email');
const signUpPasswordElement = document.getElementById('sign-up-password');
const signUpConfPassElement = document.getElementById('sign-up-conf-pass');

const loginFormElement = document.getElementById('login-form');
const loginEmailElement = document.getElementById('login-email');
const loginPasswordElement = document.getElementById('login-password');


function checkEmailAndPass(user) {
    const email = user[1];
    const password = user[2];
    for (let index = 0; index < storage.length; index++) {
        var record = storage.getItem();
        if ((record['email'] === email) && (record['password'] === password)) {
            return true;
        }
    }
    return false;
}

function existingEmailAddress() {
    const email = signUpEmailElement.value.trim();
    if (storage.getItem(`${email}`) === null) {
        return false;
    }
    return true;
}

function checkUsername() {
    const inputUsername = signUpUsernameElement.value.trim();
    if (inputUsername === '') {
        setErrorFor(signUpUsernameElement, 'Username cannot be blank');
    }
    else {
        setSuccessFor(signUpUsernameElement);
    }
}

// Regex email checking function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkEmail() {
    const inputEmail = signUpEmailElement.value.trim();
    if ((validateEmail(inputEmail) === false) || (inputEmail === '')) {
        setErrorFor(signUpEmailElement, 'Email address is not valid');
    }
    else {
        if (existingEmailAddress() === true) {
            setErrorFor(signUpEmailElement, 'This email address is already used');
        }
        else {
            setSuccessFor(signUpEmailElement);
        }
    }
}

function checkPassword() {
    const inputPassword = signUpPasswordElement.value.trim();
    if (inputPassword.length < 6) {
        setErrorFor(signUpPasswordElement, 'Password cannot be less than 6 characters');
    }
    else {
        setSuccessFor(signUpPasswordElement);
    }
}

function checkConfPass() {
    const inputPassword = signUpPasswordElement.value.trim();
    const inputConfPass = signUpConfPassElement.value.trim();
    // alert(`${inputPassword} - ${inputConfPass}  result: ${inputPassword === inputConfPass}`);
    if (inputPassword !== inputConfPass) {
        setErrorFor(signUpConfPassElement, 'Passwords do not match');
    }
    else {
        setSuccessFor(signUpConfPassElement);
    }
}

function setErrorFor(input, message) {
    const inputControl = input.parentElement; // .input-control - div
    const small = inputControl.querySelector('small'); // small - tag
    // adding message inside small
    small.innerHTML = `${message}`;

    // add error class and remove success class
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccessFor(input) {
    const inputControl = input.parentElement; // .input-control - div
    const small = inputControl.querySelector('small'); // small - tag
    small.innerHTML = '';

    // add success class and remove error class
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

signUpUsernameElement.addEventListener('change', event => {
    event.preventDefault();
    checkUsername();
});

signUpEmailElement.addEventListener('change', event => {
    event.preventDefault();
    checkEmail();
});

signUpPasswordElement.addEventListener('change', event => {
    event.preventDefault();
    if (signUpPasswordElement.value.trim() != '') {
        if (signUpConfPassElement.value !== '') {
            checkConfPass();
        }
    }
    checkPassword();
});

signUpConfPassElement.addEventListener('change', event => {
    event.preventDefault();
    checkConfPass();
});

function successInputControl() {
    const inputControlList = document.getElementById('sign-up-user-info').querySelectorAll('.input-control');
    var counter = 0;
    for (let index = 0; index < inputControlList.length; index++) {
        if (inputControlList[index].classList.contains('success') === true) {
            counter++;
        }
    }
    return counter === inputControlList.length;
}

signUpButtonElement.addEventListener('click', event => {
    event.preventDefault();
    if (successInputControl() === true) {
        signUpFormElement.submit();
        const username = signUpUsernameElement.value.trim();
        const email = signUpEmailElement.value.trim();
        const password = signUpPasswordElement.value.trim();
        storage.setItem(email, JSON.stringify([username, email, password]));
    }
    else {
        alert("Incorrect input fields!");
    }
});