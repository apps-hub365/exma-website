import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './globals.css'
import App from './App'
import SpeakerDetail from './SpeakerDetail'
import ExmaBecomeASpeaker from './ExmaBecomeASpeaker'
import ExmaSpeekerDirectory from './ExmaSpeekerDirectory'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/speaker/:id" element={<SpeakerDetail />} />
        <Route path="/become-a-speaker" element={<ExmaBecomeASpeaker />} />
        <Route path="/speekers" element={<ExmaSpeekerDirectory />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
