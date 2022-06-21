
const express = require('express')
const path = require('path')
const app = express()
var mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "restaurant",
    password: "12345"
}); 

contacts = []

connection.connect()
var queryString = 'SELECT * FROM restaurants'; //получаем данные из бд

connection.query(queryString, function(err, rows, fields) { //преобразуем их в массив
    if (err) throw err;
    for (let i = 0; i < rows.length; i++){
        contacts.push(rows[i])
    }
});

app.get('/api/contacts', (req, res) => { //возвращаем клиенту
    res.status(200).json(contacts)
})

app.use(express.static(path.resolve(__dirname, 'client'))) //папка клиент - статическая

app.get('*', (req, res) =>{ //запрос гет на вывод данных
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
    console.log(contacts)
})
app.listen(2000) //запускаем сервер