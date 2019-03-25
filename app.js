const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const methodOverride=require('method-override');

/*workspace setting : coders http://122.39.157.16:21003/HealthCare/main */
const ip='192.168.0.100';
/*local vm settings*/
//const ip='127.0.0.1';
//const ip='192.168.56.1';
const port=80;

app.listen(port,ip, () => {
  console.log('ip : '+ip+' port number : '+port);
  console.log('HealthCare Server');
  app.use('/HealthCare',require('./apps/api/api_bunch')); 
});

//Middleware
app.locals.pretty=true;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded or false..? 
app.use('/src',express.static(__dirname+'/src'));
app.use(methodOverride('_method'));
app.set('views','./views');
app.set('view engine','pug');
//app.set('view engine','ejs');
//app.set('views','/views');


