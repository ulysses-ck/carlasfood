// exppress app
const express = require("express");
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios');
const morgan = require('morgan')

var routes = require('./routes/index');

// init app
const app = express();
//set port
app.set('port', process.env.PORT || 4000);

//load view engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({
    extended: false
}));

//set path to public folder
app.use(express.static(path.join(__dirname, 'public/')));
//routes
app.use('/', routes);

app.use(morgan('dev'));


//start server
app.listen(app.get('port'), () => {
    console.log('El servidor esta en el puerto', app.get('port'))
})

module.exports = app