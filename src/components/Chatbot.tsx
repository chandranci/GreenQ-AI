import { useState, useRef, useEffect, useMemo } from 'react'
import type { KeyboardEvent } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'
import type { IFuseOptions, FuseResult } from 'fuse.js'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'

type Sender = 'user' | 'bot'

interface Message {
  id: string
  text: string
  sender: Sender
  timestamp: Date
}

type Intent =
  | 'greeting'
  | 'services'
  | 'pricing'
  | 'schedule'
  | 'recycling'
  | 'contact'
  | 'account'
  | 'status'
  | 'next'
  | 'last'
  | 'missed'
  | 'fallback'

interface QuickReply {
  id: string
  label: string
  payload?: string
  action?:
    | 'goto-login'
    | 'goto-register'
    | 'goto-dashboard'
    | 'goto-services'
    | 'goto-schedule'
    | 'goto-contact'
}

type FAQ = {
  q: string
  a: string
  intent: Intent
}

const faqs: FAQ[] = [
  { q: 'How do I schedule a pickup?', a: 'Log in and go to the Schedule page. I can open it for you.', intent: 'schedule' },
  { q: 'What are your prices?', a: 'Residential $29/mo, Commercial $199/mo, Recycling Plus $49/mo add-on.', intent: 'pricing' },
  { q: 'What items can I recycle?', a: 'Paper, plastic, glass, metals; electronics/hazardous via Recycling Plus.', intent: 'recycling' },
  { q: 'How can I contact support?', a: 'Use the Contact page. I can open it now.', intent: 'contact' },
  { q: 'Where can I see my pickup status?', a: 'Your Dashboard shows recent and upcoming pickups.', intent: 'status' },
]

const fuseOptions: IFuseOptions<FAQ> = {
  includeScore: true,
  threshold: 0.4,
  keys: ['q', 'a', 'intent'],
}

// ---------- Supabase helpers ----------
type Pickup = {
  id: string
  user_id: string
  pickup_date: string // 'YYYY-MM-DD'
  pickup_time: string
  address: string
  service_type: string
  status: string
  notes: string | null
  created_at: string
}

const todayISO = () => new Date().toISOString().slice(0, 10)

async function getNextPickup(userId: string): Promise<Pickup | null> {
  const { data, error } = await supabase
    .from('pickups')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['scheduled', 'in_progress'])
    .gte('pickup_date', todayISO())
    .order('pickup_date', { ascending: true })
    .limit(1)
  if (error) throw error
  return (data && data[0]) || null
}

async function getLastCompletedPickup(userId: string): Promise<Pickup | null> {
  const { data, error } = await supabase
    .from('pickups')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('pickup_date', { ascending: false })
    .limit(1)
  if (error) throw error
  return (data && data[0]) || null
}

async function getMissedPickups(userId: string): Promise<Pickup[]> {
  const { data, error } = await supabase
    .from('pickups')
    .select('*')
    .eq('user_id', userId)
    .lt('pickup_date', todayISO())
    .in('status', ['scheduled', 'in_progress'])
    .order('pickup_date', { ascending: false })
  if (error) throw error
  return data || []
}

function fmtPickup(p: Pickup) {
  const date = new Date(p.pickup_date)
  const dateStr = date.toLocaleDateString()
  return `${p.service_type[0].toUpperCase() + p.service_type.slice(1)} on ${dateStr} at ${p.pickup_time} — ${p.address}`
}

// ---------- Component ----------
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I can check your pickup status, scheduling, pricing, and more. What do you need?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { user } = useAuth()

  const fuse = useMemo(() => new Fuse<FAQ>(faqs, fuseOptions), [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const detectIntent = (raw: string): Intent => {
  const msg = raw.toLowerCase()

  // most specific first
  if (/\b(next|upcoming|when is my pickup|what time is my pickup)\b/.test(msg)) return 'next'
  if (/\b(last|previous|past pickup|last time)\b/.test(msg)) return 'last'
  if (/\b(missed|i missed|no one came)\b/.test(msg)) return 'missed'
  if (/\b(status|track|tracking|dashboard)\b/.test(msg)) return 'status'

  // then other clear intents
  if (/\b(schedule|book|appointment)\b/.test(msg)) return 'schedule'
  if (/\b(price|cost|fee|rate|plan|pricing)\b/.test(msg)) return 'pricing'
  if (/\b(recycle|recycling|electronics|hazardous|waste|disposal)\b/.test(msg)) return 'recycling'
  if (/\b(contact|support|email|phone)\b/.test(msg)) return 'contact'
  if (/\b(login|account|register|sign in|sign up)\b/.test(msg)) return 'account'

  // generic services LAST, and note: no 'pickup' here
  if (/\b(service|services|collection|residential|commercial|recycling)\b/.test(msg)) return 'services'

  // pleasant greeting last, or fallback
  if (/\b(hi|hello|hey|good (morning|afternoon|evening))\b/.test(msg)) return 'greeting'

  return 'fallback'
}


  // ---------- Replies ----------
  const staticReply = (intent: Intent, loggedIn: boolean): { text: string; qrs: QuickReply[] } => {
    switch (intent) {
      case 'greeting':
        return {
          text: 'Hi! Ask me about services, pricing, scheduling, or your pickup status.',
          qrs: [
            { id: 'qr_s1', label: 'Next pickup', payload: 'when is my next pickup?' },
            { id: 'qr_s2', label: 'Schedule', action: 'goto-schedule' as const },
            { id: 'qr_s3', label: 'Pricing', payload: 'pricing' },
          ],
        }
      case 'services':
        return {
          text: 'We offer Residential ($29/mo), Commercial ($199/mo), and Recycling Plus ($49 add-on).',
          qrs: [
            { id: 'qr_s4', label: 'Schedule', action: 'goto-schedule' as const },
            { id: 'qr_s5', label: 'Contact', action: 'goto-contact' as const },
          ],
        }
      case 'pricing':
        return {
          text: 'Residential $29/mo, Commercial $199/mo, Recycling Plus $49/mo add-on.',
          qrs: [{ id: 'qr_s6', label: 'Schedule', action: 'goto-schedule' as const }],
        }
      case 'recycling':
        return {
          text: 'Paper/plastic/glass/metals, plus electronics & hazardous via Recycling Plus.',
          qrs: [
            { id: 'qr_s7', label: 'Schedule Recycling', action: 'goto-schedule' as const },
            { id: 'qr_s8', label: 'Contact', action: 'goto-contact' as const },
          ],
        }
      case 'contact':
        return {
          text: 'I can open the Contact page for you.',
          qrs: [{ id: 'qr_s9', label: 'Open Contact', action: 'goto-contact' as const }],
        }
      case 'account':
        return loggedIn
          ? {
              text: 'You are logged in. Want the dashboard?',
              qrs: [{ id: 'qr_s10', label: 'Open Dashboard', action: 'goto-dashboard' as const }],
            }
          : {
              text: 'Please log in (or register) to access account details.',
              qrs: [
                { id: 'qr_s11', label: 'Log in', action: 'goto-login' as const },
                { id: 'qr_s12', label: 'Register', action: 'goto-register' as const },
              ],
            }
      case 'schedule':
        return loggedIn
          ? {
              text: 'Great! Choose your slot on the Schedule page.',
              qrs: [{ id: 'qr_s13', label: 'Open Schedule', action: 'goto-schedule' as const }],
            }
          : {
              text: 'Please log in to schedule.',
              qrs: [{ id: 'qr_s14', label: 'Log in', action: 'goto-login' as const }],
            }
      default:
        return {
          text: 'I can help with services, pricing, scheduling, or your pickup status (next/last/missed).',
          qrs: [
            { id: 'qr_s15', label: 'Next pickup', payload: 'when is my next pickup?' },
            { id: 'qr_s16', label: 'Last pickup', payload: 'what was my last pickup?' },
            { id: 'qr_s17', label: 'Missed pickup', payload: 'I missed my pickup' },
          ],
        }
    }
  }

  const craftBotReply = async (userText: string): Promise<{ text: string; qrs: QuickReply[] }> => {
    // Try FAQ match first
    const results: FuseResult<FAQ>[] = fuse.search(userText)
    if (results.length && (results[0].score ?? 1) <= 0.35) {
      const top = results[0].item
      const sr = staticReply(top.intent as Intent, !!user)
      return { text: top.a, qrs: sr.qrs }
    }

    const intent = detectIntent(userText)

    // Account-specific intents require login
    const needsAuth: Intent[] = ['status', 'next', 'last', 'missed']
    if (needsAuth.includes(intent) && !user) {
      return {
        text: 'To check your pickups, please log in.',
        qrs: [
          { id: 'qr_a1', label: 'Log in', action: 'goto-login' as const },
          { id: 'qr_a2', label: 'Register', action: 'goto-register' as const },
        ],
      }
    }

    try {
      if (user && intent === 'next') {
        const next = await getNextPickup(user.id)
        if (next) {
          return {
            text: `Your next pickup: ${fmtPickup(next)}.`,
            qrs: [
              { id: 'qr_n1', label: 'Open Dashboard', action: 'goto-dashboard' as const },
              { id: 'qr_n2', label: 'Reschedule', action: 'goto-schedule' as const },
            ],
          }
        }
        return {
          text: "I couldn't find any upcoming pickups. Want to schedule one?",
          qrs: [{ id: 'qr_n3', label: 'Schedule', action: 'goto-schedule' as const }],
        }
      }

      if (user && intent === 'last') {
        const last = await getLastCompletedPickup(user.id)
        if (last) {
          return {
            text: `Your last pickup: ${fmtPickup(last)}.`,
            qrs: [{ id: 'qr_l1', label: 'Open Dashboard', action: 'goto-dashboard' as const }],
          }
        }
        return {
          text: "I couldn't find a completed pickup yet. Want to schedule your first?",
          qrs: [{ id: 'qr_l2', label: 'Schedule', action: 'goto-schedule' as const }],
        }
      }

      if (user && intent === 'missed') {
        const missed = await getMissedPickups(user.id)
        if (missed.length) {
          const top = missed[0]
          return {
            text: `Looks like you may have missed: ${fmtPickup(top)}. You can reschedule a new slot.`,
            qrs: [
              { id: 'qr_m1', label: 'Reschedule', action: 'goto-schedule' as const },
              { id: 'qr_m2', label: 'Open Dashboard', action: 'goto-dashboard' as const },
            ],
          }
        }
        return {
          text: 'I don’t see any missed pickups. Need help scheduling a new one?',
          qrs: [{ id: 'qr_m3', label: 'Schedule', action: 'goto-schedule' as const }],
        }
      }

      if (user && intent === 'status') {
        const [next, last, missed] = await Promise.all([
          getNextPickup(user.id),
          getLastCompletedPickup(user.id),
          getMissedPickups(user.id),
        ])
        const parts: string[] = []
        if (next) parts.push(`Next: ${fmtPickup(next)}.`)
        if (last) parts.push(`Last completed: ${fmtPickup(last)}.`)
        if (missed.length) parts.push(`Missed (most recent): ${fmtPickup(missed[0])}.`)
        const text = parts.length ? parts.join(' ') : 'No history found yet. Want to schedule your first pickup?'
        const qrs: QuickReply[] = parts.length
          ? [{ id: 'qr_s18', label: 'Open Dashboard', action: 'goto-dashboard' as const }]
          : [{ id: 'qr_s19', label: 'Schedule', action: 'goto-schedule' as const }]
        return { text, qrs }
      }
    } catch (e: any) {
      console.error(e)
      return {
        text: `Sorry, I hit an error fetching your data: ${e?.message || e}`,
        qrs: [{ id: 'qr_err1', label: 'Open Dashboard', action: 'goto-dashboard' as const }],
      }
    }

    // Static intents (pricing/services/etc) or fallback
    const sr = staticReply(intent, !!user)
    return { text: sr.text, qrs: sr.qrs }
  }

  // ---------- Quick reply navigation ----------
  const handleQuickReply = (qr: QuickReply) => {
    if (qr.payload) {
      handleSendMessage(qr.payload)
      return
    }
    switch (qr.action) {
      case 'goto-login': navigate('/login'); break
      case 'goto-register': navigate('/register'); break
      case 'goto-dashboard': navigate('/dashboard'); break
      case 'goto-services': navigate('/services'); break
      case 'goto-schedule': navigate('/schedule'); break
      case 'goto-contact': navigate('/contact'); break
      default: break
    }
  }

  // ---------- Send / Reply ----------
  const pushMessage = (m: Message) => setMessages(prev => [...prev, m])

  const handleSendMessage = (textOverride?: string) => {
    const text = (textOverride ?? inputText).trim()
    if (!text) return

    const userMessage: Message = {
      id: `${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date(),
    }
    pushMessage(userMessage)
    setInputText('')
    setIsTyping(true)
    setQuickReplies([])

    setTimeout(async () => {
      const { text: botText, qrs } = await craftBotReply(text)
      const botMessage: Message = {
        id: `${Date.now() + 1}`,
        text: botText,
        sender: 'bot',
        timestamp: new Date(),
      }
      pushMessage(botMessage)
      setQuickReplies(qrs)
      setIsTyping(false)
    }, 400 + Math.random() * 400)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
        <div className="fixed bottom-24 right-6 w-96 h-[28rem] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 rounded-t-lg flex items-center">
            <Bot className="h-6 w-6 mr-2" />
            <div>
              <h3 className="font-semibold">Greencycle Assistant</h3>
              <p className="text-sm text-emerald-100">{isTyping ? 'Typing…' : (user ? 'Signed in' : 'Guest')}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === 'bot' && <Bot className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />}
                    {message.sender === 'user' && <User className="h-4 w-4 ml-2 mt-0.5 flex-shrink-0 order-2" />}
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
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

          {/* Quick replies */}
          {quickReplies.length > 0 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map(qr => (
                <button
                  key={qr.id}
                  onClick={() => handleQuickReply(qr)}
                  className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full hover:bg-emerald-100 transition"
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={user ? 'Type your message…' : 'Type your message (log in for account info)…'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
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
