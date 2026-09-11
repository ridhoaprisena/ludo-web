import React from 'react';
import { COLOR_DATA, TOTAL_STEPS_TO_HOME } from '../game/ludoEngine';

export default function PlayerCard({
  color,
  player,
  isActive,
  isHuman,
  tokens,
  turnState,
  position,
}) {
  const colorMeta = COLOR_DATA[color];

  const inHomeCount = tokens.filter((s) => s === TOTAL_STEPS_TO_HOME).length;

  return (
    <div
      className={`player-card ${position} ${isActive ? 'active-turn' : ''}`}
      style={{
        '--player-base-color': colorMeta.hex,
        '--player-surface': `var(--ludo-${color}-surface)`,
        '--player-glow': `var(--ludo-${color}-glow)`,
      }}
    >
      <div className="player-card-inner">
        <div className="player-avatar-wrapper">
          <div className="player-avatar">
            <span className="material-symbols-outlined">
              {isHuman ? 'person' : 'smart_toy'}
            </span>
          </div>
          {isActive && <div className="turn-pulse-ring" />}
        </div>

        <div className="player-details">
          <div className="player-header-row">
            <span className="player-name">{player.name}</span>
            <span className={`player-badge ${isHuman ? 'badge-human' : 'badge-bot'}`}>
              {isHuman ? 'YOU' : 'BOT'}
            </span>
          </div>

          <div className="player-status-row">
            {isActive ? (
              <span className="status-text active">
                {turnState === 'rolling' ? 'Mengocok dadu...' : 'Memilih bidak...'}
              </span>
            ) : (
              <span className="status-text">
                {inHomeCount === 4 ? '🏆 Selesai' : `${inHomeCount}/4 Masuk`}
              </span>
            )}
          </div>

          <div className="token-progress-pills">
            {tokens.map((step, idx) => {
              const isFinished = step === TOTAL_STEPS_TO_HOME;
              const isOut = step >= 0 && !isFinished;
              return (
                <div
                  key={idx}
                  className={`progress-pip ${isFinished ? 'pip-home' : isOut ? 'pip-track' : 'pip-yard'}`}
                  title={`Bidak ${idx + 1}: ${isFinished ? 'Tiba di Home' : isOut ? 'Di Jalur' : 'Di Base'}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
