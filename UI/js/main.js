((a, b, c) => {
    // Login
    let loginBtn = b.querySelector('#login_btn');
    let loginEmail = b.querySelector('#login_email');
    let loginPassword = b.querySelector('#login_password');

    let validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    let showInputMessage = (status, message, elem) => {
        b.querySelectorAll('.input-message').forEach((el) => {
            el.classList.remove('success', 'error');
            el.style.display = 'none';
        });
        elem.classList.add(status);
        elem.innerHTML = message;
        elem.style.display = 'block';
    }

    // Validate Inputs
    loginEmail.addEventListener('keyup', (e) => {
        e.preventDefault();
        
        if(e.target.value == null || e.target.value.length < 1) {
            showInputMessage('error', 'Email is required', loginEmail.parentElement.children[2]);
        } else {
            if (validateEmail(e.target.value) !== true) {
                showInputMessage('error', 'Email is invalid', loginEmail.parentElement.children[2]);
            } else {
                loginEmail.parentElement.children[2].innerHTML = '';
                loginEmail.parentElement.children[2].style.display = 'none';
            }
        }
    });

    loginPassword.addEventListener('keyup', (e) => {
        e.preventDefault();
        if(e.target.value == null || e.target.value.length < 1) {
            showInputMessage('error', 'Password is required', loginPassword.parentElement.children[2]);
        } else {
            loginPassword.parentElement.children[2].innerHTML = '';
            loginPassword.parentElement.children[2].style.display = 'none';
        }
    });

    let login = () => {

        form.submit();
    }
    
    // Register

})(window, document, console);