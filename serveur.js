const express = require('express');
const app = express();


app.get('/', (req, res) => {
	res.send("ceci est la route utilisant la methode GET");
})


app.listen(3000);
console.log('serveur lancé sur le port 3000')