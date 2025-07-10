import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple React App</h1>
        <p>Welcome to your new React application!</p>
        
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        
        <div className="features">
          <h2>Features included:</h2>
          <ul>
            <li>⚡️ Vite for fast development</li>
            <li>⚛️ React 18 with hooks</li>
            <li>🎨 Modern CSS styling</li>
            <li>🔥 Hot module replacement</li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default App 