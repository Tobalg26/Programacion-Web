const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.get('/',(req,res)=>{//consulta
    console.log(req.query);
    res.json({ mensaje:"Servidor Express respondiendo a get"});
});

app.post('/',(req,res)=>{//alta
    res.json({ mensaje:"Servidor Express respondiendo a post"});
});

app.delete('/',(req,res)=>{//alta
    res.json({ mensaje:"Servidor Express respondiendo a delete"});
});

app.listen(8082,(req,res)=>{
    console.log("Servidor express corriendo en  puerto 8082")
});