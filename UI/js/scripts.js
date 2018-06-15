(function() {
    'use strict';
    document.querySelector("#date").innerHTML = new Date().getFullYear(); // Set year in footer copyright text

    let menuIcon = document.querySelectorAll('a.trigger-menu');
    menuIcon.forEach(function(el) {
        el.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector('#menu').classList.toggle('active');
        })
    });
})();