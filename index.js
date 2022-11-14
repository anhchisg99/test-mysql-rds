import express from 'express'
const app = express()
import mysql from 'mysql'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const port = 8080
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'))
var connection = mysql.createConnection({
    host: 'tim-cook.cw7hhrixt5qj.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: '12345678',
    port: '3306',
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
    connection.query('create table user (name varchar(20),age int)', function(err,result) {
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
    connection.query("insert into user values ('cuong',12)", function(err,result) {
        if(err) throw err
        else{
            res.send(result)
        }
    });
    // res.send()
})
app.get('/get', (req, res) => {
    connection.query("select * from user", function(err,result) {
        if(err) throw err
        else{
            res.send(result)
        }
    });
    // res.send()
})

app.listen(port, () => console.log(`listen on ${port} !!!`))
