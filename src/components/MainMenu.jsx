import React from 'react';
import { PLAYER_COLORS, COLOR_DATA } from '../game/ludoEngine';
import { sound } from '../utils/audio';

export default function MainMenu({
  selectedColor,
  onSelectColor,
  onStartGame,
  onOpenRules,
  onOpenSettings,
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
}) {
  return (
    <div className="main-menu-container">
      <div className="menu-content-card">
        <div className="menu-hero">
          <div className="menu-hero-emblem">
            <svg viewBox="0 0 64 64" width="60" height="60" className="menu-ludo-emblem-svg">
              <rect width="64" height="64" rx="16" fill="#211F26" stroke="#49454F" strokeWidth="1.5" />
              <rect x="6" y="6" width="23" height="23" rx="6" fill="#D32F2F" />
              <circle cx="13" cy="13" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="22" cy="13" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="13" cy="22" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="22" cy="22" r="2.8" fill="#FFF" opacity="0.95" />
              <rect x="35" y="6" width="23" height="23" rx="6" fill="#2E7D32" />
              <circle cx="42" cy="13" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="51" cy="13" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="42" cy="22" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="51" cy="22" r="2.8" fill="#FFF" opacity="0.95" />
              <rect x="35" y="35" width="23" height="23" rx="6" fill="#F9A825" />
              <circle cx="42" cy="42" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="51" cy="42" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="42" cy="51" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="51" cy="51" r="2.8" fill="#FFF" opacity="0.95" />
              <rect x="6" y="35" width="23" height="23" rx="6" fill="#1976D2" />
              <circle cx="13" cy="42" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="22" cy="42" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="13" cy="51" r="2.8" fill="#FFF" opacity="0.95" />
              <circle cx="22" cy="51" r="2.8" fill="#FFF" opacity="0.95" />
              <polygon points="32,24 40,32 32,40 24,32" fill="#FFD54F" stroke="#1C1B1F" strokeWidth="1.5" />
              <circle cx="32" cy="32" r="3.2" fill="#1C1B1F" />
            </svg>
          </div>

          <h1 className="menu-title">Ludo Master</h1>
          <p className="menu-subtitle">Permainan Papan Klasik Modern</p>
        </div>

        <div className="menu-color-selection">
          <label className="color-select-label">Pilih Warna Anda:</label>
          <div className="color-options-grid">
            {PLAYER_COLORS.map((col) => {
              const meta = COLOR_DATA[col];
              const isSelected = selectedColor === col;
              return (
                <button
                  key={col}
                  type="button"
                  className={`color-choice-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    sound.playSelect();
                    onSelectColor(col);
                  }}
                  style={{
                    '--card-color': meta.hex,
                    '--card-surface': `var(--ludo-${col}-surface)`,
                    '--card-glow': `var(--ludo-${col}-glow)`,
                  }}
                >
                  <div className="color-choice-circle" style={{ backgroundColor: meta.hex }}>
                    {isSelected && (
                      <span className="material-symbols-outlined check-icon">check</span>
                    )}
                  </div>
                  <span className="color-choice-name">{meta.name}</span>
                  <span className="color-choice-role">{isSelected ? 'Anda' : 'Bot AI'}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="menu-actions">
          <button
            type="button"
            className="md-btn-filled btn-play-game"
            onClick={() => {
              sound.playClick();
              onStartGame();
            }}
          >
            <span className="material-symbols-outlined icon-large">play_arrow</span>
            Mulai Permainan
          </button>

          <div className="menu-secondary-actions">
            <button
              type="button"
              className="md-btn-tonal btn-menu-secondary"
              onClick={() => {
                sound.playClick();
                onOpenRules();
              }}
            >
              <span className="material-symbols-outlined">help_outline</span>
              Cara Bermain
            </button>

            <button
              type="button"
              className="md-btn-tonal btn-menu-secondary"
              onClick={() => {
                sound.playClick();
                onOpenSettings();
              }}
            >
              <span className="material-symbols-outlined">settings</span>
              Pengaturan
            </button>
          </div>
        </div>

        <div className="menu-bottom-bar">
          <div className="menu-bottom-controls">
            <button
              type="button"
              className="md-btn-icon"
              onClick={() => {
                sound.playClick();
                onToggleSound();
              }}
              title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
              aria-label="Toggle Sound"
            >
              <span className="material-symbols-outlined">
                {soundEnabled ? 'volume_up' : 'volume_off'}
              </span>
            </button>

            <button
              type="button"
              className="menu-theme-btn"
              onClick={() => {
                sound.playClick();
                onToggleTheme();
              }}
              title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
              aria-label="Toggle Theme"
            >
              <span className="material-symbols-outlined menu-theme-icon">
                {theme === 'dark' ? 'dark_mode' : 'light_mode'}
              </span>
              <div className={`md-switch ${theme === 'dark' ? 'active' : ''}`}>
                <span className="switch-thumb" />
              </div>
            </button>
          </div>

          <span className="menu-footer-tagline">1 Pemain vs 3 Bot AI</span>
        </div>
      </div>
    </div>
  );
}
