const mongoose = require('mongoose');

var users = [
    {name:"dev", password:"Mongodb44@!"},
    {name:"prof", password:"Mongodb77@!"},
    {name:"stagiaire", password:"Mongodb90@!"}
]

//Connection URL
const url = 'mongodb://10.44.100.185:27017'

//Database Name
const dbName = 'fac'
console.log(`${url}/${dbName}`);

mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true });

const db = mongoose.connection
    
db.on('error', error => {
console.error('connection error:', error)
})
db.once('open', () => {
console.log("Connected successfully to server")
})