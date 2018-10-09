const express = require('express')

const jwt = require('jsonwebtoken')

const app = express(); 


app.get('/api', verifyToken, (req,res) => {
res.json({
    message : "Get Request Works",
    authenticated: false
    })
})

app.post('/api/posts' , (req,res) => {
    res.json({
        message : "Post Request Works",
        authenticated: false
    })
})

// Get Token 

app.post('/api/login', verifyToken, (req,res) => {

    // Mock User After authentication with Database 
    const user = {
        id: 1,
        userName: "Rohito",
        email: "rohit.m.bhambhani@gmail.com"
    }

    // Synchronously 
    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

    // Aschronously 

    jwt.sign({user : user}, "secretOrPrivateKey" , (err, token) => {
        res.json({
            token: token
        })
    })
})


// Format Of Token
// Authorization: Bearer <access_token>


// Verify Token 

function verifyToken(req,res,next){
    // Get Auth Header Value

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== "undefined"){
        // Split as the space 
        const bearer = bearerHeader.split(' ');
        // bearer = ["Bearer" , "<access_token>"]
        const bearerToken = bearer[1];
        // Set Token
        req.token = bearerToken;
        // Next Middleware 
        next();

    }else{
        res.sendStatus(401);
    }
}

const port = 5000

app.listen(port, ()=>{
    console.log("Server is live on port : " + port)
})

