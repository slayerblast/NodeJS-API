db = {
    memoryDb: new Map(),
    id:0
  
  }
  
  // populate
  db['memoryDb'].set(db['id']++, { description: "faire un truc", faite: false })
  db['memoryDb'].set(db['id']++, { description: "faire un deuxieme truc", faite: false })
  db['memoryDb'].set(db['id']++, { description: "faire un troisième truc", faite: false })  
  module.exports = db