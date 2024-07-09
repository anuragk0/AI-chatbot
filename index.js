const express = require('express')
const { Server } = require('socket.io')
const app = express()
const http = require('http');
const server = http.createServer(app);
const run = require('./utils/ai')

const io = new Server(server, {}) 

app.use(express.static('public'))
app.use(express.static('views'))

app.get('/', (req, res)=>{
    res.sendFile('index.html')
})
 
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', async (msg) => {
        var data = await run(msg)
        socket.emit('message', data)
      })
    socket.on('disconnect', () => {
        console.log('user disconnected');
      })
  });

const port = process.env.PORT || 3000
server.listen(port, ()=>{
    console.log('server is up on the port ' + port)
}) 
