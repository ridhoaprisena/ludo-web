import React from 'react';
import { sound } from '../utils/audio';

export default function PauseDialog({ onResume, onRestart, onExitToMenu }) {
  return (
    <div className="md-dialog-backdrop" onClick={onResume}>
      <div className="md-dialog-card" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div className="dialog-icon-badge">
            <span className="material-symbols-outlined">pause</span>
          </div>
          <h2 className="dialog-title">Permainan Dijeda</h2>
          <p className="dialog-subtitle">Pilih opsi di bawah untuk melanjutkan</p>
        </div>

        <div className="dialog-actions-vertical">
          <button
            type="button"
            className="md-btn-filled"
            onClick={() => {
              sound.playClick();
              onResume();
            }}
          >
            <span className="material-symbols-outlined">play_arrow</span>
            Lanjutkan Permainan
          </button>

          <button
            type="button"
            className="md-btn-tonal"
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
          >
            <span className="material-symbols-outlined">restart_alt</span>
            Mulai Ulang Game
          </button>

          <button
            type="button"
            className="md-btn-tonal btn-danger"
            onClick={() => {
              sound.playClick();
              onExitToMenu();
            }}
          >
            <span className="material-symbols-outlined">home</span>
            Kembali ke Menu Utama
          </button>
        </div>
      </div>
    </div>
  );
}
