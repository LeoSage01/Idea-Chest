import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {IdeasContextProvider} from "./context/IdeasContext"
import {AuthContextProvider} from "./context/AuthContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <IdeasContextProvider>
    <App />
    </IdeasContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
