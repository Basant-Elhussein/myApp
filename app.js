if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const defRoutes = require('./routes/index');

const app = express();

/*Set View Engine*/
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

/*Setting Mongodb */
//const url = process.env.DATABASE_URL || 'mongodb://localhost/my_app';
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
});
db.once('open', () => {
  console.log('connected to Mongoose');
});

/*Routes*/
app.use('/', defRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('App is linstening on port 3000');
});
