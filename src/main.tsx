import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './globals.css'
import App from './App'
import SpeakerDetail from './SpeakerDetail'
import ExmaBecomeASpeaker from './ExmaBecomeASpeaker'
import ExmaSpeakerDirectory from './ExmaSpeakerDirectory'
import ExmaPlanes from './ExmaPlanes'
import ExmaCursor from './ExmaCursor'
import './exma-planes.css'
import './exma-hero-nav.css'

function RootLayout() {
  return (
    <>
      <ExmaCursor />
      <Outlet />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/speaker/:id" element={<SpeakerDetail />} />
          <Route path="/become-a-speaker" element={<ExmaBecomeASpeaker />} />
          <Route path="/speakers" element={<ExmaSpeakerDirectory />} />
          <Route path="/planes" element={<ExmaPlanes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
