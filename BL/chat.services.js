const io = require ('socket.io')
const server = new io.Server
// const user = {id:name}

async function connected (){
    const connection = await server.on('connection',(socket)=> {
        // socket.broadcast.emit (`Welcome to the Chat`)
        console.log ('Welcome to the chat')
    })
    return connection
}
