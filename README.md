# Ride-my-way 
[![Build Status](https://travis-ci.org/iamuchejude/Ride-my-way.png?branch=master)](https://travis-ci.org/iamuchejude/Ride-my-way)
[![Coverage Status](https://coveralls.io/repos/github/iamuchejude/Ride-my-way/badge.svg?branch=master)](https://coveralls.io/github/iamuchejude/Ride-my-way?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/93011290af245f1ba90a/maintainability)](https://codeclimate.com/github/iamuchejude/Ride-my-way/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/93011290af245f1ba90a/test_coverage)](https://codeclimate.com/github/iamuchejude/Ride-my-way/test_coverage)  

  
> Ride-my App is a carpooling application that provides drivers with the ability to create ride offers and passengers to join available ride offers.

## Project Overview  
A Template for Ride-my-way application with the features below. 

## Required Features
1. Users can create an account and log in.  
2. Drivers can add ride offers..  
3. Passengers can view all available ride offers.  
4. Passengers can see the details of a ride offer and request to join the ride. E.g What time  
the ride leaves, where it is headed e.t.c  
5. Drivers can view the requests to the ride offer they created.  
6. Drivers can either accept or reject a ride request.  

## Optional Features
1. Users can only see and respond to ride offers from their friends on the application .  
2. Passengers get real time notifications when their request is accepted or rejected(Added)  

## Technologies
* Nodejs
* Express
* Eslint, Babel, Mocha, Chai  

## API Endpoints
| Verb     | Endpoint                  | Action                         | Description                   |
| :------- | :------------------------ | :----------------------------- | :---------------------------- |
| GET      | /rides                    | Fetch all ride offers          |                               |
| POST     | /rides                    | Create a ride offer            |                               |
| GET      | /rides/\<id>              | Fetch a single ride offer      | `id` should be ride offer id  |
| POST     | /rides/\<id>/requests     | Make a request to join a ride  | `id` should be ride offer id  |

## Setting up locally
1. Clone this repository to your local machine  
2. Cd to directory `cd Ride-my-way`
3. Run `npm install` to install dependencies
4. Start app with `npm start`
  
## Test
Run `npm test`

## Live API
API is currently live at [https://ride-my-way-andela.herokuapp.com/api/v1](https://ride-my-way-andela.herokuapp.com/api/v1)

## Discovered an issue
Did you find anything that you think should be fixed or added? Kindly create an issue so they can be resolved as soon as possible

## Author
Uche Jude