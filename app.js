const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const methodOverride=require('method-override');

const ip='127.0.0.1';
const port=3000;

app.listen(port,ip, () => {
  console.log('ip : '+ip+' port number : '+port);
  console.log('HealthCare Server');
  app.use('/HealthCare_API',require('./apps/api/api_bunch')); 
});

//Middleware
app.locals.pretty=true;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded or false..? 
app.use('/',express.static('src'));
app.use(methodOverride('_method'));
app.set('view engine','ejs');
//app.set('views','/views');


