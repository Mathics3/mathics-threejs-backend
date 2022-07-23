const express = require('express');

const app = express();

app.use('/docs', express.static(__dirname + '/../docs'));
app.use('/tests', express.static(__dirname + '/../tests'));
app.use('/src', express.static(__dirname + '/../src'));
app.use('/vendors', express.static(__dirname + '/../vendors'));

const PORT = process.argv[2] ?? 8080;

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
	console.log(`See our gallery in http://localhost:${PORT}/tests/`);
	console.log();
	console.log('Hit CTRL-C to stop the server');
});
