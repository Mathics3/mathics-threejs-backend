const backstop = require('backstopjs');
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/../'));

const server = app.listen(8080, async () => {
	await backstop('test');

	server.close();
});
