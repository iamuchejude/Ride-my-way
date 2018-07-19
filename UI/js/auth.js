((a, b, c) => {
    // Login
    let loginForm = b.querySelector('#login_form');
    let loginEmail = b.querySelector('#login_email');
    let loginPassword = b.querySelector('#login_password');

    let validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    let showInputMessage = (status, message, elem) => {
        elem.classList.remove('success', 'error');
        elem.classList.add(status);
        elem.innerHTML = message;
        elem.style.display = 'block';
    }

    // Validate Inputs
    let loginValid = false;
    loginEmail.addEventListener('keyup', (e) => {
        e.preventDefault();
        
        if(e.target.value == null || e.target.value.length < 1) {
            showInputMessage('error', 'Email is required', loginEmail.parentElement.children[2]);
            loginValid = false;
        } else {
            if (validateEmail(e.target.value) !== true) {
                showInputMessage('error', 'Email is invalid', loginEmail.parentElement.children[2]);
                loginValid = false;
            } else {
                loginEmail.parentElement.children[2].innerHTML = '';
                loginEmail.parentElement.children[2].style.display = 'none';
                loginValid = true;
            }
        }
    });

    loginPassword.addEventListener('keyup', (e) => {
        e.preventDefault();
        if(e.target.value == null || e.target.value.length < 1) {
            showInputMessage('error', 'Password is required', loginPassword.parentElement.children[2]);
            loginValid = false;
        } else {
            loginPassword.parentElement.children[2].innerHTML = '';
            loginPassword.parentElement.children[2].style.display = 'none';
            loginValid = true;
        }
    });

    let login = (e) => {
        e.preventDefault();
        if(loginValid == false) {
            showInputMessage('error', 'Error Occured!', loginForm.children[0]);
        } else {
            showInputMessage('success', 'Validated Successfully', loginForm.children[0]);
        }
    }
    
    // Register
    let registerForm = b.querySelector('#register_form');
    let registerName = b.querySelector('#register_name');
    let registerEmail = b.querySelector('#register_email');
    let registerPassword = b.querySelector('#register_password');
    let registerVerifyPassword = b.querySelector('#register_verify_password');

    // Validate Inputs
    let registerValid = false;

    registerName.addEventListener('keyup', e => {
        e.preventDefault();

        if(e.target.value == null || e.target.value.length < 2) {
            showInputMessage('error', 'Name is required', registerName.parentElement.children[2]);
            registerValid = false;
        } else {
            let hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
            if(hasNumberAndSpecialCharacters.test(e.target.value)) {
                showInputMessage('error', 'Name must contain only alphabets and spaces', registerName.parentElement.children[2]);
                registerValid = false;
            } else {
                if(e.target.value.split(' ').length < 2 || e.target.value.split(' ')[0].length < 1 || e.target.value.split(' ')[1].length < 1) {
                    showInputMessage('error', 'Please enter your First and Last Names', registerName.parentElement.children[2]);
                    registerValid = false;
                } else {
                    registerName.parentElement.children[2].innerHTML = '';
                    registerName.parentElement.children[2].style.display = 'none';
                    registerValid = true;
                }
            }
        }
    });

    registerEmail.addEventListener('keyup', e => {
        e.preventDefault();
        
        if(e.target.value == null || e.target.value.length < 1) {
            showInputMessage('error', 'Email is required', registerEmail.parentElement.children[2]);
            registerValid = false;
        } else {
            if (validateEmail(e.target.value) !== true) {
                showInputMessage('error', 'Email is invalid', registerEmail.parentElement.children[2]);
                registerValid = false;
            } else {
                registerEmail.parentElement.children[2].innerHTML = '';
                registerEmail.parentElement.children[2].style.display = 'none';
                registerValid = true;
            }
        }
    });

    registerPassword.addEventListener('keyup', (e) => {
        e.preventDefault();
        if(e.target.value == null || e.target.value.length < 1) {
            showInputMessage('error', 'Password is required', registerPassword.parentElement.children[2]);
            registerValid = false;
        } else {
            if(e.target.value.length < 5) {
                showInputMessage('error', "Password is too short. Password must be greater than 5 characters", registerPassword.parentElement.children[2]);
                registerValid = false;
            } else {
                registerPassword.parentElement.children[2].innerHTML = '';
                registerPassword.parentElement.children[2].style.display = 'none';
                registerValid = true;
            }
        }
    });

    registerVerifyPassword.addEventListener('keyup', (e) => {
        e.preventDefault();
        if(e.target.value == null || e.target.value.length < 1) {
            showInputMessage('error', 'Password is required', registerVerifyPassword.parentElement.children[2]);
            registerValid = false;
        } else {
            if(e.target.value !== registerPassword.value) {
                showInputMessage('error', "Password does not match", registerVerifyPassword.parentElement.children[2]);
                registerValid = false;
            } else {
                registerVerifyPassword.parentElement.children[2].innerHTML = '';
                registerVerifyPassword.parentElement.children[2].style.display = 'none';
                registerValid = true;
            }
        }
    });

    let register = (e) => {
        e.preventDefault();
        if(registerValid == false) {
            showInputMessage('error', 'Error Occured!', registerForm.children[0]);
        } else {
            showInputMessage('success', 'Validated Successfully', registerForm.children[0]);
        }
    }

    // Event Listeners
    loginForm.addEventListener('submit', login)
    registerForm.addEventListener('submit', register)

})(window, document, console);