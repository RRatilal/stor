import socketio, {Server} from 'socket.io';

let io;

const setupWebsocket = (server: any) => {
    io = server;
    
    console.log("Socket is on")
    
    io.on('', () => {
    })
}

export default setupWebsocket;