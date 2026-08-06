'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '@/types/menu';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type} animate-fade-in`}>
          <div className="toast-icon">
            {toast.type === 'success' && <CheckCircle2 size={20} color="#34d399" />}
            {toast.type === 'error' && <AlertCircle size={20} color="#f87171" />}
            {toast.type === 'info' && <Info size={20} color="#60a5fa" />}
          </div>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => onDismiss(toast.id)}>
            <X size={16} />
          </button>
        </div>
      ))}

      <style jsx>{`
        .toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 380px;
          width: calc(100% - 48px);
        }
        .toast {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          color: var(--text-main);
          font-size: 0.9rem;
        }
        .toast-success {
          border-left: 4px solid #10b981;
        }
        .toast-error {
          border-left: 4px solid #ef4444;
        }
        .toast-info {
          border-left: 4px solid #3b82f6;
        }
        .toast-message {
          flex: 1;
          line-height: 1.4;
        }
        .toast-close {
          background: transparent;
          color: var(--text-muted);
          border: none;
          padding: 4px;
          border-radius: 4px;
        }
        .toast-close:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.1);
        }
        @media (max-width: 640px) {
          .toast-container {
            bottom: 80px;
            right: 16px;
            left: 16px;
            width: auto;
          }
        }
      `}</style>
    </div>
  );
};
