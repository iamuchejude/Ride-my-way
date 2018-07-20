((a, b, c) => {
    // Offer A Ride Validation
    const offerRideForm = b.querySelector('#offer-a-ride-form'),
          from = b.querySelector('#from'),
          to = b.querySelector('#to'),
          seats = b.querySelector('#seats'),
          date = b.querySelector('#date'),
          time = b.querySelector('#time');

    

    let showInputMessage = (status, message, elem) => {
        elem.classList.remove('success', 'error');
        elem.classList.add(status);
        elem.innerHTML = message;
        elem.style.display = 'block';
    }

    // Validate Inputs
    let offerRideValid = false;

    from.addEventListener('keyup', e => {
        e.preventDefault();
        if(e.target.value == null || e.target.value.length < 1) {
            showInputMessage('error', 'Start location is required', e.target.nextElementSibling);
            offerRideValid = false;
        } else {
            let hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
            if(hasNumberAndSpecialCharacters.test(e.target.value)) {
                showInputMessage('error', 'Start location must contain only alphabets and spaces', e.target.nextElementSibling);
                offerRideValid = false;
            } else {
                e.target.nextElementSibling.innerHTML = '';
                e.target.nextElementSibling.style.display = 'none';
                offerRide = true;
            }
        }
    });

    to.addEventListener('keyup', e => {
        e.preventDefault();
        if(e.target.value == null || e.target.value.length < 1) {
            showInputMessage('error', 'Destination is required', e.target.nextElementSibling);
            offerRideValid = false;
        } else {
            let hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
            if(hasNumberAndSpecialCharacters.test(e.target.value)) {
                showInputMessage('error', 'Destination must contain only alphabets and spaces', e.target.nextElementSibling);
                offerRideValid = false;
            } else {
                e.target.nextElementSibling.innerHTML = '';
                e.target.nextElementSibling.style.display = 'none';
                offerRide = true;
            }
        }
    });


    seats.addEventListener('keyup', e => {
        e.preventDefault();
        if(e.target.value == null || e.target.value.length < 1) {
            showInputMessage('error', 'Please enter number of seats', seats.parentElement.children[2]);
            offerRideValid = false;
        } else {
            var params = /[a-zA-Z]+.+$/;
            if(params.test(e.target.value)) {
                showInputMessage('error', 'Number of seats must be integer', seats.parentElement.children[2]);
                offerRideValid = false;
            } else {
                if(e.target.value < 1 || e.target.value > 6) {
                    showInputMessage('error', 'Number of seats available must be atleast 1 and at most 6', seats.parentElement.children[2]);
                    offerRideValid = false;
                } else {
                    seats.parentElement.children[2].innerHTML = '';
                    seats.parentElement.children[2].style.display = 'none';
                    offerRideValid = true;
                }
            }
        }
    });

    let offerRide = (e) => {
        e.preventDefault();
        if(offerRideValid == false) {
            showInputMessage('error', 'Error Occured!', offerRideForm.children[0]);
        } else {
            showInputMessage('success', 'Validated Successfully', offerRideForm.children[0]);
        }
    }

    // Event Listeners
    offerRideForm.addEventListener('submit', offerRide)

})(window, document, console);