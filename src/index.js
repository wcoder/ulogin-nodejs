"use strict"

const http = require('http');

const ulogin = (req, success, error) => {

	const token = req.body.token;
	const host = req.hostname;

	const url = 'http://ulogin.ru/token.php?token=' + token + '&host=' + host;

	http.get(url, (res) => {
		let rawData = '';

		res.setEncoding('utf8');
		res.on('data', (chunk) => { rawData += chunk; });
		res.on('end', () => {
			try {
				const user = JSON.parse(rawData);

				success(user);
			} catch (e) {
				error(e.message);
			}
		});
	});

};

module.exports = ulogin;