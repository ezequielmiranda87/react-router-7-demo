import React, { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { advisorAgent } from '../lib/advisor-agent'
import type { ChatMessage, AdvisorState } from '../lib/advisor-types'
import { MessageCircle, X, Minimize2, Maximize2, Send, Bot, User } from 'lucide-react'

const defaultConfig = {
  welcomeMessage: "Hi! I'm your business advisor. Tell me about your project or idea, and I'll help you find the perfect solutions from our services.",
  placeholderText: "Describe your project, idea, or need...",
  maxMessages: 50,
  responseTimeout: 3000
}

export function AdvisorChat() {
  const [state, setState] = useState<AdvisorState>({
    isOpen: false,
    isExpanded: false,
    isLoading: false,
    messages: [],
    sessionId: crypto.randomUUID()
  })

  const [inputValue, setInputValue] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [state.messages])

  // Focus input when chat opens
  useEffect(() => {
    if (state.isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [state.isOpen])

  const toggleChat = () => {
    setState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
      isExpanded: false
    }))
  }

  const toggleExpand = () => {
    setState(prev => ({
      ...prev,
      isExpanded: !prev.isExpanded
    }))
  }

  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: new Date()
    }

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!inputValue.trim() || state.isLoading) return

    const userInput = inputValue.trim()
    setInputValue('')
    setState(prev => ({ ...prev, isLoading: true }))

    // Add user message
    addMessage(userInput, 'user')

    try {
      // Get advisor response
      const response = await advisorAgent.analyzeNeed(userInput)
      
      // Add advisor response
      addMessage(response.message, 'assistant')
    } catch (error) {
      console.error('Advisor error:', error)
      addMessage("I'm sorry, I'm having trouble processing your request right now. Please try again or contact us directly.", 'assistant')
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (!state.isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={toggleChat}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`w-80 max-w-[calc(100vw-2rem)] shadow-xl border-0 bg-white ${state.isExpanded ? 'h-[500px] max-h-[calc(100vh-2rem)]' : 'h-[400px] max-h-[calc(100vh-2rem)]'}`}>
        <CardHeader className="pb-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-white/20 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-semibold">Business Advisor</CardTitle>
                <p className="text-xs text-white/80">How can we help you?</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpand}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                {state.isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <div className="flex flex-col h-[calc(100%-60px)]">
          <ScrollArea className="flex-1 p-4 overflow-hidden" ref={scrollAreaRef}>
            <div className="space-y-4">
              {state.messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 mx-auto text-primary mb-4" />
                  <p className="text-sm text-foreground leading-relaxed">{defaultConfig.welcomeMessage}</p>
                </div>
              )}

              {state.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm break-words ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                    <div className={`text-xs mt-1 opacity-70 ${
                      message.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {state.isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-background flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={defaultConfig.placeholderText}
                className="min-h-[40px] max-h-24 resize-none flex-1"
                rows={1}
                disabled={state.isLoading}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!inputValue.trim() || state.isLoading}
                className="px-3 flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  )
} 