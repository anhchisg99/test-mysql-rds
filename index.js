import express from 'express'
const app = express()
import mysql from 'mysql'

const port = 3001
let connection = mysql.createConnection({
    host: '172.16.4.154',
    user: 'root',
    password: '123456',
    database: 'company'
})




app.get('/',(req,res)=>{
    res.send('success')
})
app.get('/api',(req,res)=>{
    connection.connect(function(err){
        if(err){
            return console.error('error: ' + err.message);
        }
        // let createTable  = `create table admin (name varchar(20),age int)`;
        let showUserTable = `select * from users`;
        connection.query(showUserTable,function(err,results){
            if(err){
                console.log({err})
            }else{
                res.send(results)
            }
        })
        connection.end(function(err){
            if(err){
                return console.log(err)
            }
        })
    })
    // res.send()
})

app.listen(port, () => console.log(`listen on ${port} !!!`))
