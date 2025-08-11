import { Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import News from './pages/News'
import Dashboard from './pages/Dashboard'
import Schedule from './pages/Schedule' // ← NEW
import ProtectedRoute from './components/ProtectedRoute'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />

          {/* Protected pages */}
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/services" replace />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App
