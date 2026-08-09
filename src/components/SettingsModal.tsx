import React, { useEffect, useState } from 'react';
import { X, Settings, Key, Cpu, Check, ExternalLink, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { AIProvider } from '../types/travel';
import {
  getAiProvider, setAiProvider,
  getStoredGeminiApiKey, setStoredGeminiApiKey,
  getStoredOpenAiApiKey, setStoredOpenAiApiKey,
  getStoredGeminiModel, setStoredGeminiModel,
  getStoredOpenAiModel, setStoredOpenAiModel
} from '../services/storageService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [provider, setActiveProvider] = useState<AIProvider>(getAiProvider());
  const [geminiApiKey, setGeminiKey] = useState(getStoredGeminiApiKey());
  const [openAiApiKey, setOpenAiKey] = useState(getStoredOpenAiApiKey());
  const [geminiModel, setGeminiModel] = useState(getStoredGeminiModel());
  const [openAiModel, setOpenAiModel] = useState(getStoredOpenAiModel());

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [geminiTestStatus, setGeminiTestStatus] = useState<'idle' | 'testing' | 'valid' | 'invalid'>('idle');
  const [openAiTestStatus, setOpenAiTestStatus] = useState<'idle' | 'testing' | 'valid' | 'invalid'>('idle');

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    setAiProvider(provider);
    setStoredGeminiApiKey(geminiApiKey);
    setStoredOpenAiApiKey(openAiApiKey);
    setStoredGeminiModel(geminiModel);
    setStoredOpenAiModel(openAiModel);

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleTestGemini = async () => {
    if (!geminiApiKey.trim()) {
      setGeminiTestStatus('invalid');
      return;
    }

    setGeminiTestStatus('testing');
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Odpowiedz jednym słowem: OK' }] }]
        })
      });

      if (response.ok) {
        setGeminiTestStatus('valid');
      } else {
        setGeminiTestStatus('invalid');
      }
    } catch {
      setGeminiTestStatus('invalid');
    }
  };

  const handleTestOpenAI = async () => {
    if (!openAiApiKey.trim()) {
      setOpenAiTestStatus('invalid');
      return;
    }

    setOpenAiTestStatus('testing');
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiApiKey.trim()}`
        },
        body: JSON.stringify({
          model: openAiModel || 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Odpowiedz jednym słowem: OK' }],
          max_tokens: 5
        })
      });

      if (response.ok) {
        setOpenAiTestStatus('valid');
      } else {
        setOpenAiTestStatus('invalid');
      }
    } catch {
      setOpenAiTestStatus('invalid');
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="settings-modal-content glass-panel animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-left">
            <Settings size={20} className="text-cyan" />
            <h2 className="modal-title" id="settings-title">Ustawienia Silnika AI</h2>
          </div>
          <button className="btn-close-modal" onClick={onClose} aria-label="Zamknij ustawienia">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="api-info-banner">
            <ShieldCheck size={22} className="text-emerald" />
            <div>
              <strong>Podłącz własny model AI (Google Gemini lub OpenAI)</strong>
              <p>Wybierz preferowanego dostawcę sztucznej inteligencji i podaj klucz API, aby generować precyzyjne plany podróży z dokładnymi współrzędnymi GPS dla każdego zakątka globu.</p>
            </div>
          </div>

          {/* Provider Selection Tabs */}
          <div className="provider-tabs-wrapper">
            <label className="form-label">
              <Sparkles size={16} className="label-icon" />
              Wybierz Aktywnego Dostawcę AI:
            </label>
            <div className="provider-pills">
              <button
                type="button"
                className={`provider-pill ${provider === 'gemini' ? 'active' : ''}`}
                onClick={() => setActiveProvider('gemini')}
              >
                <span className="provider-logo-icon">✨</span>
                <div className="provider-pill-info">
                  <strong>Google Gemini</strong>
                  <span>Gemini 2.5 / 2.0 / 1.5</span>
                </div>
              </button>

              <button
                type="button"
                className={`provider-pill ${provider === 'openai' ? 'active' : ''}`}
                onClick={() => setActiveProvider('openai')}
              >
                <span className="provider-logo-icon">🟢</span>
                <div className="provider-pill-info">
                  <strong>OpenAI (ChatGPT)</strong>
                  <span>GPT-4o / GPT-4.5 / o3-mini</span>
                </div>
              </button>
            </div>
          </div>

          {/* Google Gemini Config Section */}
          {provider === 'gemini' && (
            <div className="provider-settings-card animate-fade-in">
              <div className="form-group">
                <label className="form-label">
                  <Key size={16} className="label-icon" />
                  Klucz Google Gemini API:
                </label>
                <div className="api-input-wrapper">
                  <input
                    type="password"
                    placeholder="Wklej klucz AIzaSy..."
                    value={geminiApiKey}
                    onChange={(e) => {
                      setGeminiKey(e.target.value);
                      setGeminiTestStatus('idle');
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary btn-test-api"
                    onClick={handleTestGemini}
                    disabled={!geminiApiKey.trim() || geminiTestStatus === 'testing'}
                  >
                    {geminiTestStatus === 'testing' ? 'Sprawdzam...' : 'Testuj klucz'}
                  </button>
                </div>

                {geminiTestStatus === 'valid' && (
                  <span className="api-status-msg valid">
                    <Check size={14} /> Klucz Gemini API jest aktywny i poprawny!
                  </span>
                )}
                {geminiTestStatus === 'invalid' && (
                  <span className="api-status-msg invalid">
                    <AlertCircle size={14} /> Błąd połączenia lub nieprawidłowy klucz API.
                  </span>
                )}

                <div className="api-help-link">
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">
                    <span>Pobierz darmowy klucz w Google AI Studio</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Cpu size={16} className="label-icon" />
                  Wybierz Model Gemini:
                </label>
                <select value={geminiModel} onChange={(e) => setGeminiModel(e.target.value)}>
                  <option value="gemini-2.0-flash">Gemini 2.0 Flash (Rekomendowany – Błyskawiczny & Nowoczesny)</option>
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro (Najwyższa jakość & dogłębne planowanie)</option>
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash (Nowość – Wysoka wydajność)</option>
                  <option value="gemini-2.0-pro-exp-02-05">Gemini 2.0 Pro Experimental (Zaawansowane rozumowanie)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Długi kontekst & wysoka precyzja)</option>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Lekki & sprawdzony)</option>
                </select>
              </div>
            </div>
          )}

          {/* OpenAI Config Section */}
          {provider === 'openai' && (
            <div className="provider-settings-card animate-fade-in">
              <div className="form-group">
                <label className="form-label">
                  <Key size={16} className="label-icon" />
                  Klucz OpenAI API:
                </label>
                <div className="api-input-wrapper">
                  <input
                    type="password"
                    placeholder="Wklej klucz sk-proj-..."
                    value={openAiApiKey}
                    onChange={(e) => {
                      setOpenAiKey(e.target.value);
                      setOpenAiTestStatus('idle');
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary btn-test-api"
                    onClick={handleTestOpenAI}
                    disabled={!openAiApiKey.trim() || openAiTestStatus === 'testing'}
                  >
                    {openAiTestStatus === 'testing' ? 'Sprawdzam...' : 'Testuj klucz'}
                  </button>
                </div>

                {openAiTestStatus === 'valid' && (
                  <span className="api-status-msg valid">
                    <Check size={14} /> Klucz OpenAI API jest aktywny i poprawny!
                  </span>
                )}
                {openAiTestStatus === 'invalid' && (
                  <span className="api-status-msg invalid">
                    <AlertCircle size={14} /> Błąd połączenia lub nieprawidłowy klucz OpenAI.
                  </span>
                )}

                <div className="api-help-link">
                  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer">
                    <span>Zarządzaj kluczami API w OpenAI Platform</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Cpu size={16} className="label-icon" />
                  Wybierz Model OpenAI:
                </label>
                <select value={openAiModel} onChange={(e) => setOpenAiModel(e.target.value)}>
                  <option value="gpt-4o-mini">GPT-4o Mini (Szybki, oszczędny & bardzo dokładny)</option>
                  <option value="gpt-4o">GPT-4o (Flagowy, wysoka inteligencja i stylistyka)</option>
                  <option value="gpt-4.5-preview">GPT-4.5 Preview (Najnowocześniejszy i najpotężniejszy)</option>
                  <option value="o3-mini">o3-mini (Nowoczesne logiczne rozumowanie)</option>
                  <option value="o1">o1 (Głębokie planowanie wieloetapowe)</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo (Sprawdzony standard)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Zamknij
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            {savedSuccess ? (
              <>
                <Check size={16} />
                <span>Zapisano pomyślnie!</span>
              </>
            ) : (
              <span>Zapisz ustawienia</span>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .settings-modal-content {
          max-width: 620px;
          width: 100%;
          max-height: min(85vh, 760px);
          display: flex;
          flex-direction: column;
          padding: 28px;
        }

        .api-info-banner {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          margin-bottom: 20px;
        }

        .api-info-banner strong {
          font-size: 0.9rem;
          color: #a7f3d0;
          display: block;
          margin-bottom: 4px;
        }

        .api-info-banner p {
          font-size: 0.8rem;
          color: #94a3b8;
          line-height: 1.45;
        }

        .provider-tabs-wrapper {
          margin-bottom: 20px;
        }

        .provider-pills {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 8px;
        }

        .provider-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .provider-pill:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
        }

        .provider-pill.active {
          background: rgba(56, 189, 248, 0.12);
          border-color: var(--accent-cyan);
          color: var(--text-primary);
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.2);
        }

        .provider-logo-icon {
          font-size: 1.5rem;
        }

        .provider-pill-info {
          display: flex;
          flex-direction: column;
        }

        .provider-pill-info strong {
          font-size: 0.92rem;
        }

        .provider-pill-info span {
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .provider-settings-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 18px;
          margin-bottom: 16px;
        }

        .api-input-wrapper {
          display: flex;
          gap: 10px;
        }

        .btn-test-api {
          white-space: nowrap;
          padding: 10px 16px;
          font-size: 0.84rem;
        }

        .api-status-msg {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          margin-top: 6px;
        }

        .api-status-msg.valid {
          color: var(--accent-emerald);
        }

        .api-status-msg.invalid {
          color: var(--accent-rose);
        }

        .api-help-link {
          margin-top: 8px;
        }

        .api-help-link a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--accent-cyan);
          text-decoration: underline;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
        }

        @media (max-width: 600px) {
          .provider-pills {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
