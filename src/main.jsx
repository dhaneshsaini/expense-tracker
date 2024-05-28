import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MyContext>
        <App />
      </MyContext>
    </BrowserRouter>
  </React.StrictMode>,
)

export const Context = createContext()

function MyContext({ children }) {
  const [selectedOption, setSelectedOption] = useState('Day')

  return (
    <Context.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </Context.Provider>
  )
}