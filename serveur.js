const express = require('express');
const app = express();
const db = require("./db");

app.use(express.json());

const mapToObj = (m) => {
    return Array.from(m).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  };

  
app.post('/', (req, res) => {
	const payload = req.body;
  db.memoryDb.set(db['id']++, payload);
  res.status(201).json(payload);
})

app.get('/', (req, res) => {
	res.json(mapToObj(db.memoryDb));
})

app.get('/id/:id', (req, res)=>{
    let id = parseInt(req.params.id)
  res.json(db.memoryDb.get(id));

})

app.delete('/id/:id', function (req, res) {
    let id = parseInt(req.params.id)
    delete db[id];
    res.send('tache effacé');
  });

app.listen(3000);
console.log('serveur lancé sur le port 3000')