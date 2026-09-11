import React from 'react';
import { COLOR_DATA } from '../game/ludoEngine';
import { sound } from '../utils/audio';

export default function TopBar({
  activeColor,
  isHumanTurn,
  turnState,
  turnMessage,
  soundEnabled,
  onToggleSound,
  onOpenRules,
  onOpenSettings,
  onOpenPause,
}) {
  const activeMeta = COLOR_DATA[activeColor];

  return (
    <header className="game-topbar">
      <div className="topbar-left">
        <div className="game-logo-badge">
          <span className="material-symbols-outlined logo-icon">casino</span>
          <span className="logo-text">Ludo Master</span>
        </div>
      </div>

      <div className="topbar-center">
        <div
          className="turn-status-chip"
          style={{
            borderColor: activeMeta.hex,
            boxShadow: `0 0 12px ${activeMeta.hex}44`,
          }}
        >
          <span
            className="turn-indicator-dot"
            style={{ backgroundColor: activeMeta.hex }}
          />
          <span className="turn-status-text">
            {turnMessage || (isHumanTurn
              ? turnState === 'rolling'
                ? 'Giliran Anda: Lempar Dadu!'
                : 'Pilih Bidak untuk Bergerak'
              : `Giliran Bot ${activeMeta.name}...`)}
          </span>
        </div>
      </div>

      <div className="topbar-right">
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
          className="md-btn-icon"
          onClick={() => {
            sound.playClick();
            onOpenRules();
          }}
          title="Panduan Bermain"
          aria-label="Panduan"
        >
          <span className="material-symbols-outlined">help_outline</span>
        </button>

        <button
          type="button"
          className="md-btn-icon"
          onClick={() => {
            sound.playClick();
            onOpenSettings();
          }}
          title="Pengaturan"
          aria-label="Pengaturan"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>

        <button
          type="button"
          className="md-btn-icon"
          onClick={() => {
            sound.playClick();
            onOpenPause();
          }}
          title="Jeda Permainan"
          aria-label="Menu Jeda"
        >
          <span className="material-symbols-outlined">pause</span>
        </button>
      </div>
    </header>
  );
}
