const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
	console.log(req.body)
	res.send(req.body);
})

app.get('/', (req, res) => {
	res.send("ceci est la route utilisant la methode GET");
})

app.get('/id/:id', (req, res)=>{
	console.log(req.params)
	res.send(req.params)

})


app.listen(3000);
console.log('serveur lancé sur le port 3000')