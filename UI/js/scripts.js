'use strict';

document.querySelector("#date").innerHTML = new Date().getFullYear(); // Set year in footer copyright text

// Trigge Menu on Mobile
let menuIcon = document.querySelectorAll('a.trigger-menu');
menuIcon.forEach(function(el) {        
    el.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#menu').classList.toggle('active');
    })
});

// Notification Trigger
document.querySelector('#show-notification a').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#notifications').classList.toggle('active');
});
console.log(document.querySelector('#notifications'));