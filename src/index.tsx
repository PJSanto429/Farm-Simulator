import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainGame } from './Components/MainGame'
import { Navigate } from './Navigate'
import "."
import { Testing } from './Components/Testing'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate />} />
                <Route path="/home" element={<App />} />
                <Route path="/game" element={<MainGame />} />
                <Route path="/testing" element={<Testing />} />
                <Route path="*" element={<App />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)