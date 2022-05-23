const express = require('express');
const app = express();


app.post('/', (req, res) => {
	console.log('test')
})

app.listen(3000);