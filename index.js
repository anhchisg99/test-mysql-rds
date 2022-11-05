import express from 'express'
const app = express()
import mysql from 'mysql'

const port = 3001
let connection = mysql.createConnection({
    host: 'company.cw7hhrixt5qj.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: '12345678',
    database: 'company'
})




app.get('/',(req,res)=>{
    res.send('success')
})
app.get('/create-table',(req,res)=>{
    connection.connect(function(err){
        if(err){
            return console.error('error: ' + err.message);
        }
        // let createTable  = `create table admin (name varchar(20),age int)`;
        let showUserTable = `create table users (name varchar(20),age int)`;
        connection.query(showUserTable,function(err,results){
            if(err){
                console.log({err})
            }else{
                res.send({results,'state':'success'})
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
app.get('/insert-table',(req,res)=>{
    connection.connect(function(err){
        if(err){
            return console.error('error: ' + err.message);
        }
        // let createTable  = `create table admin (name varchar(20),age int)`;
        let showUserTable = `insert into users values('cuong',12))`;
        connection.query(showUserTable,function(err,results){
            if(err){
                console.log({err})
            }else{
                res.send({results,'state':'success'})
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
app.get('/get-table',(req,res)=>{
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
