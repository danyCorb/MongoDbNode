const mongoose = require('mongoose');

var users = [
    {name:"dev", password:"Mongodb44@!"},
    {name:"prof", password:"Mongodb77@!"},
    {name:"stagiaire", password:"Mongodb90@!"}
]

//Connection URL
//const url = 'mongodb://10.44.100.185:27017'

//local URL
const url = 'mongodb://127.0.0.1:27017' // port 2290 for Antonin server
const options = {
    user: "stagiaire",
    pass: "Mongodb90@!",
    useNewUrlParser: true
  };
  

//Database Name
const dbName = 'fac'
console.log(`${url}/${dbName}`);

mongoose.connect(`${url}/${dbName}`, options);

const db = mongoose.connection
    
db.on('error', error => {
console.error('connection error:', error)
})
db.once('open', () => {
console.log("Connected successfully to server")
})

module.exports ={db};