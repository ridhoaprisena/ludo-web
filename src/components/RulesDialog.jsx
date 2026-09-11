import React from 'react';
import { sound } from '../utils/audio';

export default function RulesDialog({ onClose }) {
  const rules = [
    {
      icon: 'casino',
      title: 'Kocok Angka 6 untuk Keluar Base',
      desc: 'Bidak yang berada di dalam base hanya bisa keluar ke kotak awal jika kamu melempar dadu bernilai 6.',
    },
    {
      icon: 'sync',
      title: 'Bonus Giliran Dadu 6',
      desc: 'Setiap kali mendapatkan angka 6, kamu mendapatkan 1 kali kesempatan lempar dadu tambahan.',
    },
    {
      icon: 'swords',
      title: 'Menangkap & Mengeliminasi Lawan',
      desc: 'Mendarat tepat di kotak bidak lawan akan mengirim bidak tersebut pulang kembali ke base-nya.',
    },
    {
      icon: 'shield',
      title: 'Zona Aman (Bintang)',
      desc: 'Kotak dengan lambang Bintang dan kotak start adalah zona aman di mana bidak terlindungi dan tidak bisa dimakan.',
    },
    {
      icon: 'military_tech',
      title: 'Jalur Kemenangan & Home',
      desc: 'Masukkan semua 4 bidakmu ke Segitiga Tengah (Home) dengan angka dadu yang tepat untuk memenangkan permainan!',
    },
  ];

  return (
    <div className="md-dialog-backdrop" onClick={onClose}>
      <div className="md-dialog-card rules-dialog-card" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div className="dialog-icon-badge">
            <span className="material-symbols-outlined">help_outline</span>
          </div>
          <h2 className="dialog-title">Aturan & Cara Bermain</h2>
          <p className="dialog-subtitle">Pelajari dasar permainan Ludo klasik</p>
        </div>

        <div className="rules-list">
          {rules.map((rule, idx) => (
            <div key={idx} className="rule-item-card">
              <div className="rule-icon-box">
                <span className="material-symbols-outlined">{rule.icon}</span>
              </div>
              <div className="rule-text-content">
                <h4 className="rule-item-title">{rule.title}</h4>
                <p className="rule-item-desc">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dialog-footer">
          <button
            type="button"
            className="md-btn-filled full-width"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
          >
            Mengerti, Ayo Main!
          </button>
        </div>
      </div>
    </div>
  );
}
