/**
 * Created by anil on 6/3/17.
 */
const express = require('express'),
  app = express();

require('./config/db-config');

app.use('/user' , require('./router/user-router'));

app.listen(3005 , () => console.log('Server Started..') );