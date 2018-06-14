(function() {
    'use strict';
    document.querySelector("#date").innerHTML = new Date().getFullYear(); // Set year in footer copyright text

    let menuIcon = document.querySelector('#burger a');
    menuIcon.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#menu').classList.toggle('active');
    })
})();