const backstop = require('backstopjs');
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/../'));

const server = app.listen(8080, () => {
	backstop('test')
		.then(() => {
			server.close();
		})
		.catch(() => {
			// We catch the error to NodeJS don't show it (BackstopJS already does that)
			server.close();

			// If the exit code be 0 (what it is by default), the tests are going to pass in GitHub Actions.
			process.exit(1);
		})
});
