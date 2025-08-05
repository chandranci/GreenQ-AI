import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const botResponses = {
  greeting: [
    "Hello! I'm your Greencycle assistant. How can I help you with waste management today?",
    "Hi there! I'm here to help with any questions about our services. What can I assist you with?",
    "Welcome to Greencycle! I'm your virtual assistant. How may I help you today?"
  ],
  services: [
    "We offer residential pickup (starting at $29/month), commercial services (starting at $199/month), and specialized recycling programs. Which service interests you?",
    "Our main services include weekly residential pickup, daily commercial collection, and eco-friendly recycling programs. Would you like details about any specific service?"
  ],
  pricing: [
    "Our residential service starts at $29/month with weekly pickup and recycling included. Commercial services start at $199/month. Would you like a custom quote?",
    "Pricing varies by service type: Residential ($29/month), Commercial ($199/month), and Recycling Plus ($49/month add-on). Contact us for personalized pricing!"
  ],
  schedule: [
    "You can schedule a pickup by visiting our Services page or calling 1-800-GREENCYCLE. Would you like me to guide you through the scheduling process?",
    "To schedule a pickup, simply log in to your account and visit the Services page. You can choose your preferred date, time, and service type. Need help getting started?"
  ],
  recycling: [
    "We accept paper, plastic, glass, metals, electronics, and hazardous materials. Our Recycling Plus service handles specialized items. What would you like to recycle?",
    "Our recycling program covers standard materials plus electronics and hazardous waste through our specialized services. What specific items do you need to dispose of?"
  ],
  contact: [
    "You can reach us at 1-800-GREENCYCLE, email info@greencycle.com, or visit our Contact page. We're available 24/7 for emergencies. How would you prefer to get in touch?",
    "We're here to help! Call us at 1-800-GREENCYCLE, email support@greencycle.com, or use our contact form. What's the best way for us to assist you?"
  ],
  default: [
    "I'm here to help with waste management questions! You can ask me about our services, pricing, scheduling, recycling, or how to contact us.",
    "I can help you with information about our pickup services, recycling programs, pricing, or scheduling. What would you like to know?",
    "Feel free to ask me about Greencycle services, environmental tips, scheduling pickups, or anything else related to waste management!"
  ]
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Greencycle assistant. How can I help you with waste management today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)]
    }
    
    if (message.includes('service') || message.includes('pickup') || message.includes('collection')) {
      return botResponses.services[Math.floor(Math.random() * botResponses.services.length)]
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('rate')) {
      return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)]
    }
    
    if (message.includes('schedule') || message.includes('book') || message.includes('appointment')) {
      return botResponses.schedule[Math.floor(Math.random() * botResponses.schedule.length)]
    }
    
    if (message.includes('recycle') || message.includes('recycling') || message.includes('waste') || message.includes('disposal')) {
      return botResponses.recycling[Math.floor(Math.random() * botResponses.recycling.length)]
    }
    
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('support')) {
      return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)]
    }
    
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)]
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 rounded-t-lg flex items-center">
            <Bot className="h-6 w-6 mr-2" />
            <div>
              <h3 className="font-semibold">Greencycle Assistant</h3>
              <p className="text-sm text-emerald-100">Online now</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === 'bot' && (
                      <Bot className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    )}
                    {message.sender === 'user' && (
                      <User className="h-4 w-4 ml-2 mt-0.5 flex-shrink-0 order-2" />
                    )}
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-xs px-4 py-2 rounded-lg">
                  <div className="flex items-center">
                    <Bot className="h-4 w-4 mr-2" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}