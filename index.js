const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get("/api", (req, res) => {
    res.json({
        message: "Nodejs and JWT"
    });
});

app.post("/api/login", (req, res) => {
    const user = {
        id: 1,
        nombre: "Giancarlo López",
        email: "glopez@mail.com"
    }

    jwt.sign({user: user}, 'secretkey', (err, token) => {
        res.json({
            token: token
        })
    });
});

app.post("/api/posts", verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post fue creado",
                authData: authData
            })
        }
    });
});


// Authorization: Bearer <token>
function verifyToken(req, res, next) {    
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];    
        req.token = bearerToken;        
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => {
    console.log("Nodejs app running...");
})