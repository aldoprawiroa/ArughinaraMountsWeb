import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { game, gameMetadata } from './data/game'
import './styles.css'

document.title = gameMetadata.title
document.querySelector('meta[name="description"]')?.setAttribute('content', gameMetadata.description)
document.querySelector('meta[property="og:title"]')?.setAttribute('content', gameMetadata.title)
document.querySelector('meta[property="og:description"]')?.setAttribute('content', gameMetadata.description)
document.querySelector('meta[property="og:image"]')?.setAttribute('content', gameMetadata.image)
document.querySelector('link[rel="icon"]')?.setAttribute('href', game.artwork.icon)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
