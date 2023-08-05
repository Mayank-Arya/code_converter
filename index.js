const express = require('express')
const app = express()
const cors = require('cors')
const {codeRouter} = require('./Routes/converter.routes');
require('dotenv').config()
app.use(express.json())
app.use(cors())

app.get('/',(req,res) => {
    res.send('Home Page!')
})

app.use('/code',codeRouter)

app.listen(process.env.PORT || 8000,()=>{
    console.log('Server Running at',process.env.PORT)
})