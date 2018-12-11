const mongoose = require('mongoose');

//Connection URL
const url = 'mongodb://localhost:27017'

//Database Name
const dbName = 'tpdb'
console.log(`${url}/${dbName}`);

mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true });

const db = mongoose.connection
    
db.on('error', error => {
console.error('connection error:', error)
})
db.once('open', () => {
console.log("Connected successfully to server")
})