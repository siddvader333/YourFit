module.exports = (app) => {
	const EmailValidator = require('email-validator');
	const bcrypt = require('bcryptjs');
	const passport = require('passport');
	const User = require('../models/User');

	app.post('/users/login', (req, res) => {
		const response = { registerStatus: false, errorMessage: '' };
		const { username, password } = req.body;
		let errors = [];
		//console.log(req.body);

		/* Perform Input Validation*/
		/*Check if Fields Empty */
		if (!username || !password) {
			errors.push('Make sure all fields are completed');
		}
		/*Check if email is correct form */
		if (!EmailValidator.validate(username)) {
			errors.push('Make sure email is a vaild email.');
		}

		if (errors.length > 0) {
			response.errorMessage = errors[0];
			res.send(response);
			return;
		}
		passport.authenticate('local', {
			successRedirect: '/users/login_success',
			failureRedirect: '/users/login_failure'
		})(req, res);
	});

	app.get('/users/login_success', (req, res) => {
		const response = { loginStatus: true, errorMessage: '' };
		res.send(response);
	});

	app.get('/users/login_failure', (req, res) => {
		const response = { registerStatus: false, errorMessage: 'An error occured. Make sure login info is correct.' };
		res.send(response);
	});

	app.get('/auth', (req, res) => {
		if (req.isAuthenticated()) {
			res.send({ loggedIn: true });
		} else {
			res.send({ loggedIn: false });
		}
	});

	app.get('/users/current', (req, res) => {
		res.send(req.user);
	});

	app.get('/users/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.post('/users/register', (req, res) => {
		const response = { registerStatus: false, errorMessage: '' };
		const { name, email, password, confirm_password } = req.body;
		let errors = [];

		/* Perform Input Validation*/
		/*Check if Fields Empty */
		if (!name || !email || !password || !confirm_password) {
			errors.push('Make sure all fields are completed');
		}
		/*Check if email is correct form */
		if (!EmailValidator.validate(email)) {
			errors.push('Make sure email is a vaild email.');
		}
		/*Check if Passwords match */
		if (password !== confirm_password) {
			errors.push('Make sure passwords match.');
		}
		/*Check if user already exists and add user otherwise*/
		User.findOne({ email: email }).then((user) => {
			if (user) {
				errors.push('The user already exists.');
			} else {
				if (errors.length === 0) {
					/*Create a new User and hash the password */
					const newUser = new User({
						name: name,
						email: email.toLowerCase(),
						password: password,
						date: Date.now()
					});

					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							newUser.password = hash;
							newUser.save();
						});
					});
				}
			}

			if (errors.length > 0) {
				response.errorMessage = errors[0];
			} else {
				response.registerStatus = true;
				response.errorMessage = 'Registered! You will now be redirected to the login page!';
			}

			res.send(response);
		});
	});
};
