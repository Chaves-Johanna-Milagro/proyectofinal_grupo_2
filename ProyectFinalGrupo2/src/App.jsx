import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import JuegoPhaser from './Components/JuegoPhaser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JuegoPhaser/>
    </>
  )
}

export default App
