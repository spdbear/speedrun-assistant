import WebSocket from "ws";

const url = "ws://localhost:6357"
const client = new WebSocket(url)

client.on("open", () => {
  console.log(`Success to connect ${url}`)
})

client.on("message", (message) => {
  console.log(`Received: ${message}`)
})
console.log(`Started WS Client to ${url}`)
