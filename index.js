// built in Nodemodules
const path = require('path');
const fs = require('fs');
// libraries and frameworks
const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
var rfs = require('rotating-file-stream');
const globalErrorHandler = require('./middleware/errors');

// declaring the port variable
const PORT = process.env.PORT || 8001;
console.log(process.env.NODE_ENV)

// to parse the incoming requests with JSON payloads
app.use(express.json());
// to parse the incoming requests in urlencodedform
app.use(express.urlencoded({ extended: true }));
// to serve the static files
app.use(express.static(`${__dirname}/public`))

// get node_env variable and do not forget to set it in production (export NODE_ENV=production)
const NODE_ENV = process.env.NODE_ENV;

// middlewares
// to get requestIp in case you use a proxy behind
app.enable("trust proxy");
// save logs only in production
if (NODE_ENV === "production") {
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    // // create a daily changing write stream
    // var accessLogStream = rfs.createStream("access.log", {
    //     interval: '1d', // rotate daily
    //     compress: "gzip",
    //     path: path.join(__dirname, 'log')
    // });

    app.use(morgan(
        ':remote-addr * :remote-user * [:date[clf]] * :method * :url * HTTP/:http-version * :status * :res[content-length] * :user-agent * :response-time ms',
        { stream: accessLogStream }
    ));
} else {
    app.use(morgan(
        ':remote-addr * :remote-user * [:date[clf]] * :method * :url * HTTP/:http-version * :status * :res[content-length] * :response-time ms',
    ));
};

// redirect incoming requests to api.js
app.use("/api/v1", require("./api"));

// global error handler
app.use(globalErrorHandler);

// setting up the express server
app.listen(PORT, () => {
    console.log(`Server is awake on port ${PORT}`);
});