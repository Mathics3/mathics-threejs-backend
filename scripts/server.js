const express = require('express');

const app = express();

app.use(express.static(__dirname + '/../'));

const PORT = process.argv[2] ?? 8080;

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
	console.log(`See our gallery in http://localhost:${PORT}/docs/`);
	console.log();
	console.log('Hit CTRL-C to stop the server');
});
