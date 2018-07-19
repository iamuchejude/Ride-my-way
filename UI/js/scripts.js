'use strict';

document.querySelector("#date").innerHTML = new Date().getFullYear(); // Set year in footer copyright text

// Trigge Menu on Mobile
document.querySelectorAll('a.trigger-menu').forEach((el) => {        
    el.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#menu').classList.toggle('active');
    })
});

// Notification Trigger
let notificationTrigger = document.querySelector('#show-notification a');
if(notificationTrigger != null || notificationTrigger != undefined) {
    notificationTrigger.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#notifications').classList.toggle('active');
    });
}

// Upload Profile Photo
document.querySelectorAll('#uploadPhoto').forEach((el) => {
    el.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#photo').click();
    })
});
