

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mysql = require('mysql');

// routers
const account = require('./api/routes/account');

// morgan routes
app.use(morgan('dev'));

// border parser.
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
//cors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
         'Origin, X-Requested-With,Content-Type,Accept,Authorization'
    );

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET,PUT,DELETE,POST,PATCH');
        return res.status(200).json({});
    }
    
    next();
});
 
// middlewares
app.use('/account',account);




// Handle errors from non-existant router.
app.use((req,res,next) => {
    const error = new Error('path not found');
    error.status = 404;
    next(error);
});
app.use((error,req, res,next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
});

// export express application.
module.exports = app;