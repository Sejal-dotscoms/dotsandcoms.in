import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

createRoot(document.getElementById('root')).render(
  <StrictMode>
        {/*<GoogleReCaptchaProvider*/}
        {/*    reCaptchaKey="6LfI8UorAAAAAEYCSGi7M3B_fNgAJlyGbNd7A1Zn"*/}
        {/*>*/}
            <App />
        {/*</GoogleReCaptchaProvider>*/}
  </StrictMode>,
)
