const express = require('express');

const app = express();

app.use(express.static(__dirname + '/../'));

app.listen(8080, () => {
	console.log('Server running at http://localhost:8080/');
	console.log('See our gallery in http://localhost:8080/docs/');
	console.log();
	console.log('Hit CTRL-C to stop the server');
});
