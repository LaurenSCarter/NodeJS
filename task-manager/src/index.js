const express = require('express')
require('./db/mongoose')
const User = require('./models/users')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) //will parse any incoming requests to JSON

app.post('/users', (req, res) => {
   const user = new User(req.body)
   user.save().then(() => {
       res.send("successfully added \n" + user)
   }).catch((e) => {
       res.status(400).send("unsuccessful \n" + e)
   })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
