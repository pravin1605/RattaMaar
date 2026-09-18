import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

import App from './App'
import './index.css'


import { pwaService } from "./services/pwaService";

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  pwaService.setInstallPrompt(event);
  window.dispatchEvent(new Event("pwa-install-available"));
});

window.addEventListener("appinstalled", () => {
  pwaService.setInstallPrompt(null);
  window.dispatchEvent(new Event("pwa-installed"));
});

registerSW({
  immediate: true,

  onNeedRefresh() {
    console.log('New version available.')
  },

  onOfflineReady() {
    console.log('Notes Web is ready for offline use.')
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)