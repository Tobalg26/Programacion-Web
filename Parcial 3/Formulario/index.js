const express = require('express');
const cors = require('cors')
const mysql2 = require('mysql2')
const app = express();
const { jsPDF } = require('jspdf');
const path =require('path');

const multer = require('multer');
const upload = multer();

app.use(cors());


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

app.get('/usuarios/formato', (req, res) => {
    const doc = new jsPDF();
    doc.text("Hello World", 10, 10);
    let archivoPDF=path.join(__dirname,'a4.pdf')
    doc.save(archivoPDF);
    res.sendFile(archivoPDF);
    
})


app.get('/', (req, res) => {
    let consulta = '';
    if (req.query.Cliente_ID == '') {
        consulta = 'select * FROM clientes2'
    } else {
        consulta = `select * FROM clientes2 WHERE Cliente_ID =${req.query.Cliente_ID}`
    }
    console.log(consulta);
    connection.query(
        consulta,
        function (err, results, fields) {
            if (err != null) {
                res.json(err);
            }
            else {
                res.json(results);
            }
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
            if (err != null) {
                res.json(err);
            }
            else {
                res.json(results);
            }
        }
    )

});

app.delete('/', (req, res) => {
    let consulta = '';
    consulta = `delete FROM clientes2 WHERE Cliente_ID =${req.query.Cliente_ID}`
    console.log(consulta);
    connection.query(
        consulta,
        function (err, results, fields) {
            if (err != null) {
                res.json(err);
            }
            else {
                res.json(results);
            }
        }
    )
});

app.put('/', upload.none(), (req, res) => {
    let consulta = '';
    if (req.body.Nombre != '' && req.body.Email != '' && req.body.Fecha_Registro != '') {
        consulta = `UPDATE clientes2 SET NOMBRE = '${req.body.Nombre}', EMAIL = '${req.body.Email}', FECHA_REGISTRO = '${req.body.Fecha_Registro}' 
        WHERE Cliente_ID =  '${req.body.Cliente_ID}'`
    }
    console.log(consulta)
    connection.query(
        consulta,
        function (err, results, fields) {
            if (err != null) {

                res.json({ Mensaje: err.message });
            }
            else {
                res.json(results);
            }
        }
    )
})


app.listen(8082, (req, res) => {
    console.log("Servidor express corriendo en  puerto 8082")
});