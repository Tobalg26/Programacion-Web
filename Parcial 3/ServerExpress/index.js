const express = require('express');
const cors = require('cors')
const mysql2 = require('mysql2')
const app = express();

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

app.get('/', (req, res) => {//consulta en el diagonal el nombre de la tabla
    //console.log(req.query.idUsuario);
    connection.query(
        'SELECT * FROM clientes2',
        function (err, results, fields) {
            // if (results.length == 0) {
            //     res.json({
            //         status: 0,
            //         mensaje: "Cliente_ID no existe",
            //         datos: {}
            //     });
            // } else {
            //     res.json({
            //         status: 1,
            //         mensaje: "Usuario Encontrado",
            //         datos: results[0]
            //     });
            // }
             console.log(results);
             console.log(fields);
            res.json(results);
        }
    )
});

app.post('/', (req, res) => {//alta
    res.json({ mensaje: "Servidor Express respondiendo a post" });
});

app.delete('/', (req, res) => {//alta
    res.json({ mensaje: "Servidor Express respondiendo a delete" });
});

app.listen(8082, (req, res) => {
    console.log("Servidor express corriendo en  puerto 8082")
});