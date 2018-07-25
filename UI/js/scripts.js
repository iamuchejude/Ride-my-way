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

// Tab for Ride Offers
document.querySelectorAll('.ride-offers-tab li a').forEach((el) => {
    el.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.ride-offers-tab li').forEach($element => { $element.classList.remove('active') });
        document.querySelectorAll('.offers').forEach($element => { $element.classList.remove('active') });
        e.target.parentElement.classList.add('active');
        document.querySelector(`.offers${e.target.getAttribute('data-elem')}`).classList.add('active');
    });
});

// View Ride Offer
document.querySelectorAll('.single-offer').forEach((el) => {
    el.addEventListener('click', e => {
        e.preventDefault();
        let rideId = e.target.getAttribute('data-rideid');
        document.querySelector('#single-offer').classList.toggle('active');
    });
});

// View My Ride Offer
document.querySelectorAll('.my-ride-offer').forEach((el) => {
    el.addEventListener('click', e => {
        e.preventDefault();
        let rideId = e.target.getAttribute('data-rideid');
        document.querySelector('#my-single-offer').classList.toggle('active');
    });
});