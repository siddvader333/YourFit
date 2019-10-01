module.exports = (app) => {
	const User = require('../models/User');
	app.get('/api/diagnostic/complete', (req, res) => {
		User.findOneAndUpdate({ email: req.user.email }, { diagnosticComplete: true }, { new: true }, (err, doc) => {
			if (err) {
				console.log('Something wrong when updating data!');
			}
			console.log(doc);
		});
	});

	app.get('/api/diagnostic/isCompleted', (req, res) => {
		User.findOne({ email: req.user.email }).then((user) => {
			res.send(user.diagnosticComplete);
		});
	});
};
