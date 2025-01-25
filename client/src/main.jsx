import { createRoot } from 'react-dom/client'
import {CssBaseline} from "@mui/material"
import App from './App.jsx'
import './index.css'; 
createRoot(document.getElementById('root')).render(
 <>
    <CssBaseline />
    <App />
    </>
)
