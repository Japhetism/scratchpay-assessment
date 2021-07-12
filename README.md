# Getting Started

This project was bootstrapped with Express.js.

# Installing Node Modules

To step up this project, install all the dependencies using

### `yarn install`

## Available Scripts

In the project directory, you can run:

### `node server.js`

or install nodemon to automatically restarts the application 
when file changes in the directory are detected

### `npm install -g nodemon`

You can run with nodemon:

### `nodemon server.js`

Runs the app in the development mode.
Server will be running on [http://0.0.0.0:9000](http://0.0.0.0:9000).

This project has one endpoint that can be use to get all clinics and search for clinics
The endpoint is [http://0.0.0.0:9000/api/v1/clinics](http://0.0.0.0:9000/api/v1/clinics).

## Clinic Responses

The clinic response payload from the endpoint is modified to have uniform responses irrespective of the clinic provider,
the clinic response has the following entities;
- provider: the clinic provider name [ex: "Dental Clinic" or "Vet Clinic"]
- name: the clinic name [ex: "Good Health Home"]
- state: the state location of the clinic [ex: "California"]
- stateCode: the state code location of the clinic [ex: "CA"]
- availability: the opening and closing time of the clinic [ex: from: 09:00, to: 20:00]

The clinics response payload is default to page size of 10. 
Pagination was implemented incase of large datasets.

## Clinic Query Params

The query parameters for the endpoint are;
- name [ex: "Good Health Home"]
- state [ex: "CA" or "California"]
- availabilityFrom [ex: 09:00]
- availabilityTo [ex: 20:00]
- currentPage [ex: 1]
- pageSize [ex: 5]
These query parameters are optional, user must supply availabilityFrom when availabilityTo is not null.

## API Documentation 

API documentation was done with swagger and can be found on 
[http://localhost:9000/api-docs](http://localhost:9000/api-docs).

## Test

This project used mocha and chai test suite.

In the project directory, you can run the test with:

### `yarn test`

