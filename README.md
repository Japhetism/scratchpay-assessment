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
The endpoint is [http://0.0.0.0:9000/api/v1/clinics][http://0.0.0.0:9000/api/v1/clinics]

The query parameters for the endpoint are;
name [ex: "Good Health Home"]
state [ex: "CA" or "California"]
availabilityFrom [ex: 09:00]
availabilityTo [ex: 20:00]

API documentation can be found on 
[http://localhost:9000/api/docs](http://localhost:9000/api/docs).

