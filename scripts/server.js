const express = require('express');

const app = express();

app.use('/docs', express.static(__dirname + '/../docs'));
app.use('/examples', express.static(__dirname + '/../examples'));
app.use('/src', express.static(__dirname + '/../src'));
app.use('/vendors', express.static(__dirname + '/../vendors'));

const PORT = process.argv[2] ?? 8080;

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
	console.log(`See our gallery in http://localhost:${PORT}/examples/`);
	console.log();
	console.log('Hit CTRL-C to stop the server');
});
