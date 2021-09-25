import WebSocket, { Server } from 'ws';

const port = 6357
const server = new Server({ port });

let timer: NodeJS.Timer | null = null

function broadcast(clients: Set<WebSocket>) {
  clients.forEach(client => {
    client.send(JSON.stringify({
      timestamp: (new Date()).toString()
    }))
  })
}

server.on("connection", (conn) => {
  if (timer != null) {
    console.log("Reset timer")
    clearInterval(timer)
  }
  console.log("Set timer")
  timer = setInterval(broadcast, 2000, server.clients)
  conn.on("message", (message) => {
    conn.send(JSON.stringify({
      received: message.toString()
    }))
  })
})
console.log(`Started WS Server on :${port}`)
