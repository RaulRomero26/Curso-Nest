import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client </h2>
    <input id="jwToken" placeholder="JWT Token" />
    <button id="connect">Connect</button>

    <br/>
   
    <span id="server-status">Offline</span>
  </div>
  <ul id="clients-ul"></ul>

  <form id="message-form">
    <input placeholder="message" id="message-input" />
  </form>

  <h3>Messages</h3>

  <ul id="messages-ul"></ul>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

//connectToServer()


const inputJwt = document.querySelector<HTMLInputElement>('#jwToken')!
const connectButton = document.querySelector<HTMLButtonElement>('#connect')!

connectButton.addEventListener('click', () => {

  if(inputJwt.value.trim().length <= 0) return alert('Please enter a valid JWT Token');

  connectToServer(inputJwt.value)
})