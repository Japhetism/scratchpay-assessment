const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err);
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

// Start the server
const port = process.env.PORT;
const hostName = process.env.HOSTNAME;
app.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!! shutting down...');
    console.log(err.name, err.message);
});