const express = require('express')

const jwt = require('jsonwebtoken')

const app = express(); 


app.get('/api', verifyToken, (req,res) => {
res.json({
    message : "Get Request Works",
    authenticated: false
    })
})

// Send Key Value Pair ( "Authorization" : "Bearer <access_token>" )

app.post('/api/posts' , verifyToken, (req,res) => {

    jwt.verify(req.token, "secretOrPrivateKey", (err, authData) => {
        if(err){
            res.sendStatus(403)
        }else {
            res.json({
                message : "Post Request Works",
                authenticated: true,
                authData: authData,
                date: Date.now()
            })
        }
    })

    res.json({
        message : "Post Request Works",
        authenticated: false
    })
})

// Get Token 

app.post('/api/login',  (req,res) => {

    // Mock User After authentication with Database 
    const user = {
        id: 1,
        userName: "Rohito",
        email: "rohit.m.bhambhani@gmail.com"
    }

    // Synchronously 
    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

    // Aschronously 

// Set Expiry 

    jwt.sign({user : user}, "secretOrPrivateKey" ,{ expiresIn: '20s' }, (err, token) => {
        res.json({ token: token, test: "Test" })
    })
})


// Format Of Token
// Authorization: Bearer <access_token>


// Verify Token And Add To Req Object

function verifyToken(req,res,next){
    // Get Auth Header Value

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== "undefined"){
        // Split as the space 
        const bearer = bearerHeader.split(' ');
        // bearer = ["Bearer" , "<access_token>"]
        const bearerToken = bearer[1];

        // Set Token ( NOW AVAILABLE in Req Object )
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

