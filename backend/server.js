// import express from 'express';
var express = require('express')
// import data from './data';
var data = require('./data')
const app = express();

app.get("/api/products",(req,res)=>{
    res.send(data.products);
})

app.listen(9000, ()=>{console.log("Serever started at http://localhost:9000")})