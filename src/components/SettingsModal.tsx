import React, { useState } from 'react';
import { X, Settings, Key, Cpu, Check, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey, getStoredModel, setStoredModel } from '../services/storageService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [model, setModel] = useState(getStoredModel());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'valid' | 'invalid'>('idle');

  if (!isOpen) return null;

  const handleSave = () => {
    setStoredApiKey(apiKey);
    setStoredModel(model);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleTestApiKey = async () => {
    if (!apiKey.trim()) {
      setTestStatus('invalid');
      return;
    }

    setTestStatus('testing');
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Odpowiedz jednym słowem: OK' }] }]
        })
      });

      if (response.ok) {
        setTestStatus('valid');
      } else {
        setTestStatus('invalid');
      }
    } catch {
      setTestStatus('invalid');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="settings-modal-content glass-panel animate-fade-in">
        <div className="modal-header">
          <div className="modal-header-left">
            <Settings size={20} className="text-cyan" />
            <h2 className="modal-title">Ustawienia Silnika AI</h2>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="api-info-banner">
            <ShieldCheck size={20} className="text-emerald" />
            <div>
              <strong>Aplikacja działa w 100% od razu bez klucza API!</strong>
              <p>Posiada wbudowany inteligentny generator i szablony dla topowych kierunków. Podanie własnego klucza Google Gemini API umożliwia generowanie planów dla absolutnie każdego zakątka globu w czasie rzeczywistym.</p>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Key size={16} className="label-icon" />
              Klucz Google Gemini API (opcjonalny):
            </label>
            <div className="api-input-wrapper">
              <input
                type="password"
                placeholder="Wklej klucz AIzaSy..."
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setTestStatus('idle');
                }}
              />
              <button
                type="button"
                className="btn btn-secondary btn-test-api"
                onClick={handleTestApiKey}
                disabled={!apiKey.trim() || testStatus === 'testing'}
              >
                {testStatus === 'testing' ? 'Sprawdzam...' : 'Testuj klucz'}
              </button>
            </div>

            {testStatus === 'valid' && (
              <span className="api-status-msg valid">
                <Check size={14} /> Klucz API jest poprawny i aktywny!
              </span>
            )}
            {testStatus === 'invalid' && (
              <span className="api-status-msg invalid">
                <AlertCircle size={14} /> Nieprawidłowy klucz API lub brak połączenia.
              </span>
            )}

            <div className="api-help-link">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
              >
                <span>Pobierz bezpłatny klucz Gemini API w Google AI Studio</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Cpu size={16} className="label-icon" />
              Model Gemini:
            </label>
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Szybki & Rekomendowany)</option>
              <option value="gemini-2.0-flash">Gemini 2.0 Flash (Najnowsza generacja)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Głębokie wnioskowanie)</option>
            </select>
          </div>
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
          max-width: 580px;
          width: 100%;
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
      `}</style>
    </div>
  );
};
