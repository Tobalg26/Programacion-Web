const express = require('express');
const cors = require('cors')
const mysql2 = require('mysql2')
const app = express();

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//create connection database
const connection = mysql2.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'Cristobal',
    database: 'tallerbd'
})
connection.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('CONEXION EXITOSA');
    }
})

app.get('/', (req, res) => {
    let consulta = '';
    if (req.query.Cliente_ID == '0') {
        consulta = 'select * FROM clientes2'
    } else {
        consulta = `select * FROM clientes2 WHERE Cliente_ID =${req.query.Cliente_ID}`
    }
    connection.query(
        consulta,
        function (err, results, fields) {
            res.json(results);
        }
    )
});

app.post('/', upload.none(), (req, res) => {  
        let consulta = '';
        consulta = `insert into clientes2 (Cliente_ID, Nombre, Email, Fecha_Registro) values ('${req.body.Cliente_ID}', '${req.body.Nombre}', '${req.body.Email}', '${req.body.Fecha_Registro}')`
        console.log(consulta)
        connection.query(
            consulta,
            function (err, results, fields) {
                res.json(results);
            }
        )

});

app.delete('/', (req, res) => {
    let consulta = '';
    consulta = `delete FROM clientes2 WHERE Cliente_ID =${req.query.Cliente_ID}`
    connection.query(
        consulta,
        function (err, results, fields) {
            res.json(results);
        }
    )
});

app.listen(8082, (req, res) => {
    console.log("Servidor express corriendo en  puerto 8082")
});