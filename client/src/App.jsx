import {io} from 'socket.io-client'
//this would be responsible for connection client with the server

function App() {
  const socket = io('http://localhost:3000');
  return (
    
    <>
      <div>
        <h1>Hello World....</h1>
      </div>
    </>
  )
}

export default App
