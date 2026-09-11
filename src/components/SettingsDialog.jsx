import React from 'react';
import { sound } from '../utils/audio';

export default function SettingsDialog({
  soundEnabled,
  onToggleSound,
  botSpeed,
  onChangeBotSpeed,
  theme,
  onToggleTheme,
  onClose,
}) {
  const speedOptions = [
    { id: 'slow', label: 'Santai', speedMs: 1100 },
    { id: 'normal', label: 'Normal', speedMs: 650 },
    { id: 'fast', label: 'Cepat', speedMs: 320 },
  ];

  return (
    <div className="md-dialog-backdrop" onClick={onClose}>
      <div className="md-dialog-card settings-dialog-card" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div className="dialog-icon-badge">
            <span className="material-symbols-outlined">settings</span>
          </div>
          <h2 className="dialog-title">Pengaturan Game</h2>
          <p className="dialog-subtitle">Sesuaikan preferensi permainan Anda</p>
        </div>

        <div className="settings-body">
          <div className="setting-row">
            <div className="setting-label-group">
              <span className="material-symbols-outlined setting-icon">volume_up</span>
              <div>
                <span className="setting-title">Efek Suara</span>
                <span className="setting-desc">Dadu, langkah bidak, dan selebrasi</span>
              </div>
            </div>
            <button
              type="button"
              className={`md-switch ${soundEnabled ? 'active' : ''}`}
              onClick={() => {
                sound.playClick();
                onToggleSound();
              }}
              aria-label="Toggle Sound"
            >
              <span className="switch-thumb" />
            </button>
          </div>

          <div className="setting-row">
            <div className="setting-label-group">
              <span className="material-symbols-outlined setting-icon">
                {theme === 'dark' ? 'dark_mode' : 'light_mode'}
              </span>
              <div>
                <span className="setting-title">Tema Tampilan</span>
                <span className="setting-desc">{theme === 'dark' ? 'Mode Gelap (MD3)' : 'Mode Terang (MD3)'}</span>
              </div>
            </div>
            <button
              type="button"
              className="md-btn-tonal"
              onClick={() => {
                sound.playClick();
                onToggleTheme();
              }}
            >
              <span className="material-symbols-outlined">palette</span>
              {theme === 'dark' ? 'Ganti ke Terang' : 'Ganti ke Gelap'}
            </button>
          </div>

          <div className="setting-section">
            <div className="setting-label-group">
              <span className="material-symbols-outlined setting-icon">speed</span>
              <div>
                <span className="setting-title">Kecepatan AI Bot</span>
                <span className="setting-desc">Waktu jeda berpikir dan melangkah</span>
              </div>
            </div>

            <div className="segmented-button-group">
              {speedOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`segmented-btn ${botSpeed === opt.id ? 'selected' : ''}`}
                  onClick={() => {
                    sound.playClick();
                    onChangeBotSpeed(opt.id, opt.speedMs);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
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
            Tutup & Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
