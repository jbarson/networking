// Chat Server

// Client Telnet
//Server Node
// Create a server
// Server needs to listen
// Listen to incoming users (event connection)
// Listen to the messages of those users
// Parrot function (we want to send back the message they sent)

const net = require('net');

const clientList = []

const spaceJam = net.createServer()
const parrotBack= (client, data) => {
    client.write(`⛹️‍♂️: ${data}`)
}

const broadcastMessage= (client, data, list) => {
    list.forEach(
        member => {
            if (member !== client) member.write(`from server: ${data}`)
        }
    )
}


spaceJam.on('connection', (client) => {
    clientList.push(client)
    // console.log("connecting!", client)
    console.log('new client connected')
    client.setEncoding('utf-8')
    client.write('🧺 Jam \n')
    client.on('data', data => console.log(data))
    // client.on('data', data => parrotBack(client, data))
    client.on('data', data => broadcastMessage(client, data, clientList))
})

spaceJam.listen(1337, () => console.log('running'))
