const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config/keys');

/* Express middle ware */
const app = express();
require('./services/passport')(passport);

mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));
mongoose.set('useNewUrlParser', true);
app.use(
	session({
		secret: 'Insert randomized text here',
		resave: false,
		saveUninitialized: false
	})
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
console.log('initialized');
app.use(passport.session());
console.log('session initialized');

/*Adds the react production build to serve react requests*/
//app.use(express.static(path.join(__dirname, "../../YoutFitFrontend/build")));

app.post('/api/test', (req, res) => {
	console.log('Test Route');
});

require('./routes/authRoutes')(app);
require('./routes/diagnosticRoutes')(app);

app.listen(process.env.PORT || 5000, () => {
	console.log('starting listening');
});
