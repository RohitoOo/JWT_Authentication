const express = require('express')

const jwt = require('jsonwebtoken')

const app = express(); 


app.get('/api' , (req,res) => {
res.json({
    message : "Get Request Works",
    authenticated: false
    })
})

app.post('/api' , (req,res) => {
    res.json({
        message : "Post Request Works",
        authenticated: false
    })
})

const port = 5000

app.listen(port, ()=>{
    console.log("Server is live on port : " + port)
})