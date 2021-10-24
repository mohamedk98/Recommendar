
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

var session = require('express-session');
const bcrypt = require('bcrypt');

let connection = require('../back/routes/connection')

let indexRouter = require('./routes/index');
let placesRouter = require('./routes/places');
let registerRouter = require('./routes/register');
let aboutUsRouter = require('./routes/about_us');
let contactUsRouter = require('./routes/contact_us');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/', placesRouter);
app.use('/', registerRouter);
app.use('/', contactUsRouter);
app.use('/', aboutUsRouter);

app.use(session({
	secret: 'recomendar',
	resave: true,
	saveUninitialized: true
}));

app.post('/auth', function(req,res,next){

	var email = req.body.email;
	var password = req.body.password;

		connection.query(`SELECT * FROM user WHERE email = '${email}'`, function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				bcrypt.compare(password, results[0].password, function(err, result) {
					if (err) throw err;
					if (!result) {
						res.send ("Incorrect Password, Please Check it ")
					}
					else {
						req.session.loggedin = true;
						req.session.email = email;
						res.redirect('/places')
						
					}
				
				});
			
			} 
			else {
				res.send({error:'Please Check your Login Credentials'})
			}
		});
	
})
app.listen(8000)






module.exports = app;
