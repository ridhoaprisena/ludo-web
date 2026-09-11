import React from 'react';
import { sound } from '../utils/audio';

export default function Dice({
  value,
  isRolling,
  rollId,
  disabled,
  onRoll,
  playerColor,
  isHumanTurn,
}) {
  const handleClick = () => {
    if (disabled || isRolling) return;
    sound.playClick();
    onRoll();
  };

  const renderDotsForFace = (faceNum) => {
    const dotsMap = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'mid-left', 'mid-right', 'bottom-left', 'bottom-right'],
    };

    const currentDots = dotsMap[faceNum] || ['center'];

    return (
      <div className="dice-face-inner">
        {currentDots.map((pos, idx) => (
          <span key={idx} className={`dice-dot-3d ${pos}`} />
        ))}
      </div>
    );
  };

  const getCubeClass = () => {
    if (isRolling) return 'cube-rolling';
    if (!value) return 'show-face-1';
    return `show-face-${value}`;
  };

  const isReadyToRoll = !disabled && isHumanTurn && !isRolling;

  return (
    <div className="dice-container">
      <div
        className={`dice-scene ${isReadyToRoll ? 'pulse-ready' : ''}`}
        onClick={handleClick}
        style={{
          '--dice-glow': `var(--ludo-${playerColor || 'red'}-glow)`,
        }}
        role="button"
        tabIndex={disabled || isRolling ? -1 : 0}
        aria-label={`Lempar dadu. Nilai saat ini ${value || 1}`}
        title={isReadyToRoll ? 'Klik untuk mengocok dadu' : ''}
      >
        <div key={rollId || 0} className={`dice-cube-3d ${getCubeClass()}`}>
          <div className="dice-face-3d face-front face-1">{renderDotsForFace(1)}</div>
          <div className="dice-face-3d face-bottom face-2">{renderDotsForFace(2)}</div>
          <div className="dice-face-3d face-right face-3">{renderDotsForFace(3)}</div>
          <div className="dice-face-3d face-left face-4">{renderDotsForFace(4)}</div>
          <div className="dice-face-3d face-top face-5">{renderDotsForFace(5)}</div>
          <div className="dice-face-3d face-back face-6">{renderDotsForFace(6)}</div>
        </div>

        <div key={`shadow-${rollId || 0}`} className={`dice-shadow-3d ${isRolling ? 'shadow-jumping' : ''}`} />
      </div>
    </div>
  );
}
