import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])

  // Intentional bug: undefined variable
  const handleBuggyClick = () => {
    console.error('This is a test error for the bug reporter!')
    // This will cause an error
    const undefinedVar = undefinedVar.property
  }

  // Intentional bug: array access error
  const handleArrayBug = () => {
    console.error('Array access error test')
    const arr = [1, 2, 3]
    console.log(arr[10]) // Accessing non-existent index
  }

  // Intentional bug: type error
  const handleTypeError = () => {
    console.error('Type error test')
    const num = 42
    num.toUpperCase() // Number doesn't have toUpperCase method
  }

  const addItem = () => {
    if (name.trim()) {
      setItems([...items, name])
      setName('')
    }
  }

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🐛 Bug Reporter Test App</h1>
        <p>This app has intentional bugs to test the bug reporter widget!</p>
        
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
          
          <div className="bug-tests">
            <h3>Test Bug Reporter:</h3>
            <button onClick={handleBuggyClick} style={{backgroundColor: '#ff4757', color: 'white', margin: '5px'}}>
              Trigger Undefined Error
            </button>
            <button onClick={handleArrayBug} style={{backgroundColor: '#ffa502', color: 'white', margin: '5px'}}>
              Trigger Array Error
            </button>
            <button onClick={handleTypeError} style={{backgroundColor: '#2ed573', color: 'white', margin: '5px'}}>
              Trigger Type Error
            </button>
          </div>
        </div>
        
        <div className="features">
          <h2>Features:</h2>
          <ul>
            <li>🐛 Bug reporter widget (bottom-right corner)</li>
            <li>⚡️ Vite for fast development</li>
            <li>⚛️ React 18 with hooks</li>
            <li>🎨 Modern CSS styling</li>
            <li>🔥 Hot module replacement</li>
          </ul>
        </div>

        <div className="item-manager">
          <h3>Item Manager:</h3>
          <div style={{marginBottom: '10px'}}>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Add new item"
              style={{padding: '5px', marginRight: '5px'}}
            />
            <button onClick={addItem}>Add Item</button>
          </div>
          <ul style={{textAlign: 'left', maxWidth: '300px', margin: '0 auto'}}>
            {items.map((item, index) => (
              <li key={index} style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
                {item}
                <button onClick={() => removeItem(index)} style={{backgroundColor: '#ff4757', color: 'white', border: 'none', padding: '2px 8px'}}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  )
}

export default App 