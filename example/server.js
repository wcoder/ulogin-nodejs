const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const ulogin = require('../src');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.post('/callback', (req, res) => ulogin(req, (user) => {
	console.log(user);
	res.redirect('/');
}, (error) => {
	console.log(error);
}));

app.get('/auth', (req, res) => {

	res.send(ulogin.isAuthorized);

});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});