require('dotenv').config()
const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const showdown = require('showdown')

const app = express()
const PORT = 5000
const convertor = new showdown.Converter({breaks: true})
convertor.setOption('simpleLineBreaks', true);
convertor.setOption('simplifiedAutoLink', true);

app.use(cors())

app.get('/', (req,res)=>{
    res.json({'status':'healthy'})
})

const server = app.listen(PORT,()=>{
    console.log(`Sever is running on port ${PORT}`)
})

const io = socket(server,{
    pingTimeout:6000,
    cors:{
        origin:process.env.FRONTEND_ENDPOINT
    }
})

io.on("connection",(socket)=>{
    console.log(`socketID ${socket.id} connected`)
    socket.on("convertHTML",(data)=>{
        const HTMLContents = convertor.makeHtml(data)
        socket.emit('HTMLContents',HTMLContents)
    })
})
