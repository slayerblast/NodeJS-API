const express = require('express');
const app = express();


app.get('/', (req, res) => {
	res.send("ceci est la route utilisant la methode GET");
})

app.get('/id:arg1', (req, res)=>{
	console.log(req.params)
	res.send(req.params)

})

app.listen(3000);
console.log('serveur lancé sur le port 3000')