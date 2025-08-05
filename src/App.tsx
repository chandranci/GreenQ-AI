import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import News from './pages/News'
import Dashboard from './pages/Dashboard'
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
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App