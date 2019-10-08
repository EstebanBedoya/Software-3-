import mongojs from 'mongojs'
let jwt = require("jsonwebtoken")

const db = mongojs('DatabaseS3', [
    'usuarios'
])

module.exports = app => {

    app.get('/usuarios', (req, res) => {
        db.usuarios.find((err, usuario) => {
            res.json({
                usuario: usuario
            })
        });
    })
    app.post('/login/auth/', (req, res) => {

        db.usuarios.find({
            $and: [
                {
                    'email': new RegExp(`${req.body.email}`)
                },
                {
                    'password': new RegExp(`${req.body.password}`)
                }
            ]
        }, (err, response) => {

            if (response.length > 0) {

                let tokenData = {
                    email: req.body.email
                    // ANY DATA
                }
                let token = jwt.sign(tokenData, 'Secret Password', {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours 
                })
                res.send({
                    token: token,
                    response: response
                })
            } else {

                res.send({
                    error: "email o contraseña invalidos"
                })
            }

        })
    })

    app.post('/usuarios', (req, res) => {

        let newUser = req.body;

        db.usuarios.insert(newUser, (err, usuario) => {
            res.json({
                usuario: usuario
            })
        })
    })
}

