import express from 'express'
const app = express()
import mysql from 'mysql'

const port = 3001
var connection = mysql.createConnection({
    host: 'jura-coffee-1.cw7hhrixt5qj.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: '12345678',
    port: '3306',
    database: 'company'
});

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});
app.get('/create-database',(req,res)=>{
    connection.query('create database inventory',(err,result)=>{
        if(err)res.send(err)
        res.send(result)
    })
})
app.get('/use-database',(req,res)=>{
    connection.query('use inventory',(err,result)=>{
        if(err)res.send(err)
        res.send(result)
    })
})
// connection.end();
app.get('/', (req, res) => {
    res.send('success')
})

app.get('/create-table', (req, res) => {
    connection.query('create table user3 (name varchar(20),age int)', function(err,result) {
        if(err) {
            res.send(err)
        }
        else{
            res.send(result)
        }
    });
    // res.send()
})
app.get('/insert-table', (req, res) => {
    connection.query("insert into user3 values ('cuong',12)", function(err,result) {
        if(err) throw err
        else{
            res.send(result)
        }
    });
    // res.send()
})
app.get('/get', (req, res) => {
    connection.query("select * from user3", function(err,result) {
        if(err) throw err
        else{
            res.send(result)
        }
    });
    // res.send()
})

app.listen(port, () => console.log(`listen on ${port} !!!`))
