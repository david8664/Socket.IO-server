const io = require ('socket.io')
const server = new io.Server
// const user = {id:name}
io.Server.caller
async function connected (){
    const connection = await server.on('connection',(socket)=> {
        socket.broadcast.emit (`Welcome ${user.id.name} to the Chat`)
    })
    return connection
}
