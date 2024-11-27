const mysql = require('mysql')

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"commentSystem"

})

db.connect((err)=>{
    if(err){
        console.log("Error while connecting to database",err)
        return;
    }
    console.log('Connected to mySQL databse.')
})

module.exports = db;