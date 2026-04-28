// src/pages/SignUpPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ─── Toast Component ──────────────────────────────────────────────────────────
export default function Toast({ message, type, onClose }) {
  if (!message) return null;

  const isError = type === 'error';

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-lg text-[13px] font-medium transition-all
        ${isError
          ? 'bg-[#2A1A1F] text-[#FAF8F4] border border-[rgba(212,137,154,0.3)]'
          : 'bg-[#6B2D3E] text-[#FAF8F4]'
        }`}
      style={{ maxWidth: '85vw' }}
    >
      <span>
        {isError ? '⚠️' : '✓'}
      </span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-1 opacity-60 hover:opacity-100 text-lg leading-none">×</button>
    </div>
  );
}
