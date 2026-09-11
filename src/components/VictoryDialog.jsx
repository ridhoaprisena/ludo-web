import React, { useEffect, useRef } from 'react';
import { COLOR_DATA } from '../game/ludoEngine';
import { sound } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';

export default function VictoryDialog({ winnerColor, winnerName, isHumanWinner, onPlayAgain, onExitToMenu }) {
  const canvasRef = useRef(null);
  const winnerMeta = COLOR_DATA[winnerColor] || COLOR_DATA.red;

  useEffect(() => {
    sound.playWin();
    let stopConfetti = () => {};
    if (canvasRef.current) {
      stopConfetti = fireConfetti(canvasRef.current);
    }
    return () => {
      stopConfetti();
    };
  }, []);

  return (
    <div className="victory-modal-overlay">
      <canvas ref={canvasRef} className="victory-confetti-canvas" />

      <div className="victory-card">
        <div className="victory-trophy-ring" style={{ borderColor: winnerMeta.hex }}>
          <span className="material-symbols-outlined trophy-icon">emoji_events</span>
        </div>

        <h1 className="victory-title">
          {isHumanWinner ? 'KEMENANGAN GEMILANG!' : 'PERMAINAN SELESAI!'}
        </h1>

        <p className="victory-subtitle">
          {isHumanWinner ? (
            <span>Selamat! Player 1 berhasil mengantarkan seluruh bidak ke Home!</span>
          ) : (
            <span>{winnerName || 'Bot'} menjadi yang tercepat menyelesaikan permainan!</span>
          )}
        </p>

        <div
          className="winner-badge-card"
          style={{
            borderColor: winnerMeta.hex,
            backgroundColor: `var(--ludo-${winnerColor}-surface)`,
          }}
        >
          <div
            className="winner-color-dot"
            style={{ backgroundColor: winnerMeta.hex }}
          />
          <span className="winner-label">
            Juara 1: {winnerName || (isHumanWinner ? 'Player 1' : 'Bot')}
          </span>
        </div>

        <div className="victory-actions">
          <button
            type="button"
            className="md-btn-filled full-width"
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
          >
            <span className="material-symbols-outlined">replay</span>
            Main Lagi
          </button>

          <button
            type="button"
            className="md-btn-tonal full-width"
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
