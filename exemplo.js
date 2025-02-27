const express = require('express');
const fetch = require('node-fetch');
const path = require ('path');


const app = express();
const PORT = 3000;


app.get('/filmes',async (req,res)=>{
    try{
        const response = await fetch(``);
        const data = await response.json();

    res
    }catch(error) {
        console.error('erro nao ');
        res.status(500).send(error ao buscar);


    }
});

app.listen(PORT,()=>{
    Console.log(`´servidro em http://localhost:${PORT} ")
})