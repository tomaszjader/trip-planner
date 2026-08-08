import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, MapPin, Calendar, Compass, Users, ArrowRight, Loader2 } from 'lucide-react';
import { ChatMessage, TravelPreferences } from '../types/travel';
import { sendChatMessage } from '../services/geminiService';

interface ChatPlannerProps {
  onGeneratePlan: (preferences: TravelPreferences) => void;
  isGeneratingPlan: boolean;
}

export const ChatPlanner: React.FC<ChatPlannerProps> = ({
  onGeneratePlan,
  isGeneratingPlan
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Cześć! Jestem Twoim inteligentnym asystentem podróżniczym VoyageAI. 🌍✈️\n\nOpowiedz mi o swojej wymarzonej podróży: **dokąd chciałbyś pojechać, na ile dni i jaki styl spędzania czasu najbardziej lubisz?** (np. zabytki, kulinaria, plaża, czy może pieszy trekking?)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        '3 dni w Rzymie dla dwojga z naciskiem na jedzenie',
        'Weekend w Barcelonie – plaża, tapas i Gaudí',
        '5 dni w Tokio – popkultura, ramen i chramy'
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [collectedPreferences, setCollectedPreferences] = useState<Partial<TravelPreferences>>({
    destination: '',
    durationDays: 3,
    pace: 'balanced',
    group: 'couple',
    interests: ['food', 'history'],
    budget: 'medium',
    transport: 'walking_transit',
    dietary: 'traditional'
  });
  const [readyToGenerate, setReadyToGenerate] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputVal).trim();
    if (!messageText || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(messages, messageText, collectedPreferences);

      if (response.extractedPreferences) {
        setCollectedPreferences(prev => ({
          ...prev,
          ...response.extractedPreferences
        }));
      }

      if (response.readyToGenerate !== undefined) {
        setReadyToGenerate(response.readyToGenerate);
      } else if (response.extractedPreferences?.destination) {
        setReadyToGenerate(true);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions,
        extractedPreferences: response.extractedPreferences
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error', err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'assistant',
          text: 'Przepraszam, wystąpił chwilowy błąd podczas przetwarzania. Możesz kontynuować lub od razu wygenerować plan za pomocą przycisku poniżej!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTriggerGenerate = () => {
    const finalPreferences: TravelPreferences = {
      destination: collectedPreferences.destination || 'Rzym',
      durationDays: collectedPreferences.durationDays || 3,
      pace: collectedPreferences.pace || 'balanced',
      group: collectedPreferences.group || 'couple',
      interests: collectedPreferences.interests && collectedPreferences.interests.length > 0
        ? collectedPreferences.interests
        : ['food', 'history'],
      budget: collectedPreferences.budget || 'medium',
      transport: collectedPreferences.transport || 'walking_transit',
      dietary: collectedPreferences.dietary || 'traditional',
      customNotes: 'Wygenerowano na podstawie konwersacji z Asystentem AI'
    };
    onGeneratePlan(finalPreferences);
  };

  let score = 0;
  if (collectedPreferences.destination) score += 40;
  if (collectedPreferences.durationDays) score += 20;
  if (collectedPreferences.pace) score += 20;
  if (collectedPreferences.interests && collectedPreferences.interests.length > 0) score += 20;

  return (
    <div className="chat-planner-container">
      {/* Live Profile Tracker Card */}
      <div className="chat-profile-card glass-panel">
        <div className="profile-header">
          <span className="profile-title">
            <Sparkles size={16} className="text-cyan" />
            Rozpoznane Preferencje Podróży
          </span>
          <span className="profile-score-badge">
            Dopasowanie: {score}%
          </span>
        </div>

        <div className="profile-tags">
          <div className={`profile-tag ${collectedPreferences.destination ? 'active' : ''}`}>
            <MapPin size={13} />
            <span>{collectedPreferences.destination || 'Cel podróży: ?'}</span>
          </div>
          <div className={`profile-tag ${collectedPreferences.durationDays ? 'active' : ''}`}>
            <Calendar size={13} />
            <span>{collectedPreferences.durationDays ? `${collectedPreferences.durationDays} dni` : 'Czas: ?'}</span>
          </div>
          <div className={`profile-tag ${collectedPreferences.pace ? 'active' : ''}`}>
            <Compass size={13} />
            <span>
              {collectedPreferences.pace === 'intense' ? 'Tempo intensywne' : collectedPreferences.pace === 'relaxed' ? 'Tempo spokojne' : 'Tempo zbalansowane'}
            </span>
          </div>
          <div className={`profile-tag ${collectedPreferences.group ? 'active' : ''}`}>
            <Users size={13} />
            <span>{collectedPreferences.group === 'couple' ? 'We dwoje' : collectedPreferences.group === 'solo' ? 'Solo' : collectedPreferences.group === 'family' ? 'Rodzina' : 'Znajomi'}</span>
          </div>
        </div>

        {/* Generate Prompt Banner when ready */}
        {(readyToGenerate || collectedPreferences.destination) && (
          <div className="ready-banner">
            <div className="ready-banner-info">
              <strong>Gotowy do ułożenia trasy dla: {collectedPreferences.destination || 'Wybranej destynacji'}</strong>
              <span>AI skomponuje harmonogram dzień po dniu, mapę, kulinaria i koszty.</span>
            </div>
            <button
              className="btn btn-warm btn-generate-chat"
              onClick={handleTriggerGenerate}
              disabled={isGeneratingPlan}
            >
              {isGeneratingPlan ? (
                <>
                  <Loader2 size={16} className="spinner" />
                  <span>Generuję plan...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Wygeneruj Plan Podróży</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Main Chat Window */}
      <div className="chat-window glass-panel">
        <div className="chat-messages-list">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`chat-bubble-wrapper ${msg.sender === 'user' ? 'user-wrapper' : 'bot-wrapper'}`}
            >
              <div className="chat-avatar">
                {msg.sender === 'user' ? (
                  <User size={18} />
                ) : (
                  <Bot size={18} />
                )}
              </div>

              <div className="chat-bubble-content">
                <div className="chat-bubble">
                  {msg.text.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="chat-paragraph">
                      {paragraph.split('\n').map((line, lIdx) => (
                        <React.Fragment key={lIdx}>
                          {line.startsWith('- ') ? (
                            <span className="chat-list-item">• {line.substring(2)}</span>
                          ) : (
                            line
                          )}
                          {lIdx < paragraph.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  ))}
                </div>

                {/* Quick suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && msg.sender === 'assistant' && (
                  <div className="chat-suggestions">
                    {msg.suggestions.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        className="suggestion-chip"
                        onClick={() => {
                          if (suggestion.includes('Wygeneruj kompletny plan')) {
                            handleTriggerGenerate();
                          } else {
                            handleSendMessage(suggestion);
                          }
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                <span className="chat-timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble-wrapper bot-wrapper">
              <div className="chat-avatar">
                <Bot size={18} />
              </div>
              <div className="chat-bubble typing-bubble">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          className="chat-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            className="chat-input"
            placeholder="Napisz do asystenta (np. Chcę 4 dni w Lizbonie z naciskiem na owoce morza i punkty widokowe...)"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isTyping || isGeneratingPlan}
          />
          <button
            type="submit"
            className="btn btn-primary btn-chat-send"
            disabled={!inputVal.trim() || isTyping || isGeneratingPlan}
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      <style>{`
        .chat-planner-container {
          max-width: 900px;
          margin: 0 auto 60px auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .chat-profile-card {
          padding: 16px 20px;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .profile-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .text-cyan {
          color: var(--accent-cyan);
        }

        .profile-score-badge {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .profile-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .profile-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .profile-tag.active {
          background: rgba(56, 189, 248, 0.12);
          border-color: rgba(56, 189, 248, 0.4);
          color: var(--accent-cyan);
          font-weight: 600;
        }

        .ready-banner {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ready-banner-info {
          display: flex;
          flex-direction: column;
        }

        .ready-banner-info strong {
          font-size: 0.92rem;
          color: var(--text-primary);
        }

        .ready-banner-info span {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .btn-generate-chat {
          padding: 10px 20px;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        /* Chat Window */
        .chat-window {
          height: 520px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-messages-list {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .chat-bubble-wrapper {
          display: flex;
          gap: 14px;
          max-width: 85%;
        }

        .user-wrapper {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .bot-wrapper {
          align-self: flex-start;
        }

        .chat-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .user-wrapper .chat-avatar {
          background: linear-gradient(135deg, #f59e0b, #f43f5e);
          color: #ffffff;
        }

        .bot-wrapper .chat-avatar {
          background: linear-gradient(135deg, #38bdf8, #3b82f6);
          color: #ffffff;
        }

        .chat-bubble-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .chat-bubble {
          padding: 14px 18px;
          border-radius: 18px;
          font-size: 0.95rem;
          line-height: 1.55;
        }

        .user-wrapper .chat-bubble {
          background: var(--gradient-brand);
          color: #ffffff;
          border-bottom-right-radius: 4px;
        }

        .bot-wrapper .chat-bubble {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
        }

        .chat-paragraph {
          margin-bottom: 8px;
        }

        .chat-paragraph:last-child {
          margin-bottom: 0;
        }

        .chat-list-item {
          display: block;
          margin-left: 8px;
          font-weight: 500;
        }

        .chat-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .suggestion-chip {
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: var(--accent-cyan);
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .suggestion-chip:hover {
          background: rgba(56, 189, 248, 0.25);
          transform: translateY(-1px);
        }

        .chat-timestamp {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .user-wrapper .chat-timestamp {
          text-align: right;
        }

        /* Typing Dots */
        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 18px;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-cyan);
          border-radius: 50%;
          animation: pulseGlow 1.2s infinite ease-in-out;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        /* Input Form */
        .chat-input-form {
          padding: 16px 20px;
          background: rgba(10, 15, 29, 0.6);
          border-top: 1px solid var(--border-color);
          display: flex;
          gap: 12px;
        }

        .chat-input {
          flex: 1;
        }

        .btn-chat-send {
          padding: 12px 18px;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
