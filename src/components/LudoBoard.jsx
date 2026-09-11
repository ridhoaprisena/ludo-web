import React from 'react';
import {
  COLOR_DATA,
  COMMON_TRACK,
  SAFE_TRACK_INDICES,
  PLAYER_COLORS,
  getCoordinates,
  canMoveToken,
} from '../game/ludoEngine';
import { sound } from '../utils/audio';

export default function LudoBoard({
  tokens,
  activeColor,
  diceValue,
  turnState,
  isHumanTurn,
  animatingToken,
  onTokenClick,
  theme = 'dark',
}) {
  const isLight = theme === 'light';
  const CELL_SIZE = 100;

  const renderStar = (cx, cy, size = 18, color = '#E6C441') => {
    const points = [];
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? size : size * 0.42;
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return (
      <polygon
        points={points.join(' ')}
        fill={color}
        stroke={isLight ? '#7E5700' : '#1D1B20'}
        strokeWidth="2"
        style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.25))' }}
      />
    );
  };

  const tokenPlacements = [];
  PLAYER_COLORS.forEach((color) => {
    tokens[color].forEach((step, tokenIndex) => {
      let coord;
      let isAnimatingThis = false;

      if (
        animatingToken &&
        animatingToken.color === color &&
        animatingToken.tokenIndex === tokenIndex
      ) {
        coord = animatingToken.currentCoord;
        isAnimatingThis = true;
      } else {
        coord = getCoordinates(color, step, tokenIndex);
      }

      tokenPlacements.push({
        color,
        tokenIndex,
        step,
        coord,
        key: `${color}-${tokenIndex}`,
        isAnimatingThis,
      });
    });
  });

  const cellGroups = {};
  tokenPlacements.forEach((item) => {
    const key = `${item.coord.col.toFixed(1)}_${item.coord.row.toFixed(1)}`;
    if (!cellGroups[key]) cellGroups[key] = [];
    cellGroups[key].push(item);
  });

  const selectableMap = {};
  if (isHumanTurn && turnState === 'moving' && diceValue) {
    tokens[activeColor].forEach((step, idx) => {
      if (canMoveToken(step, diceValue)) {
        selectableMap[`${activeColor}-${idx}`] = true;
      }
    });
  }

  const handleTokenSelect = (color, tokenIndex) => {
    if (!selectableMap[`${color}-${tokenIndex}`]) return;
    sound.playSelect();
    onTokenClick(color, tokenIndex);
  };

  return (
    <div className="ludo-board-wrapper">
      <svg
        viewBox="0 0 1500 1500"
        className="ludo-board-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7369" />
            <stop offset="100%" stopColor="#B3261E" />
          </linearGradient>
          <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7EE69D" />
            <stop offset="100%" stopColor="#1B6E2E" />
          </linearGradient>
          <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDE7A" />
            <stop offset="100%" stopColor="#E5A100" />
          </linearGradient>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#87CEFF" />
            <stop offset="100%" stopColor="#0B57D0" />
          </linearGradient>

          <linearGradient id="pawn-body-red" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7F000A" />
            <stop offset="35%" stopColor="#FF6E63" />
            <stop offset="70%" stopColor="#D32F2F" />
            <stop offset="100%" stopColor="#4A0005" />
          </linearGradient>
          <linearGradient id="pawn-skirt-red" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D32F2F" />
            <stop offset="100%" stopColor="#4A0005" />
          </linearGradient>
          <radialGradient id="pawn-head-red" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFA49C" />
            <stop offset="50%" stopColor="#D32F2F" />
            <stop offset="100%" stopColor="#5E0006" />
          </radialGradient>

          <linearGradient id="pawn-body-green" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B3D14" />
            <stop offset="35%" stopColor="#85E89D" />
            <stop offset="70%" stopColor="#2E7D32" />
            <stop offset="100%" stopColor="#05240A" />
          </linearGradient>
          <linearGradient id="pawn-skirt-green" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E7D32" />
            <stop offset="100%" stopColor="#05240A" />
          </linearGradient>
          <radialGradient id="pawn-head-green" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#B3F7C3" />
            <stop offset="50%" stopColor="#2E7D32" />
            <stop offset="100%" stopColor="#082E0F" />
          </radialGradient>

          <linearGradient id="pawn-body-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#664300" />
            <stop offset="35%" stopColor="#FFE082" />
            <stop offset="70%" stopColor="#F9A825" />
            <stop offset="100%" stopColor="#3E2800" />
          </linearGradient>
          <linearGradient id="pawn-skirt-yellow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F9A825" />
            <stop offset="100%" stopColor="#3E2800" />
          </linearGradient>
          <radialGradient id="pawn-head-yellow" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF4C2" />
            <stop offset="50%" stopColor="#F9A825" />
            <stop offset="100%" stopColor="#613F00" />
          </radialGradient>

          <linearGradient id="pawn-body-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#002D66" />
            <stop offset="35%" stopColor="#80BFFF" />
            <stop offset="70%" stopColor="#1976D2" />
            <stop offset="100%" stopColor="#001838" />
          </linearGradient>
          <linearGradient id="pawn-skirt-blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1976D2" />
            <stop offset="100%" stopColor="#001838" />
          </linearGradient>
          <radialGradient id="pawn-head-blue" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#B8DCFF" />
            <stop offset="50%" stopColor="#1976D2" />
            <stop offset="100%" stopColor="#002352" />
          </radialGradient>

          <linearGradient id="gold-collar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="40%" stopColor="#FFF9D2" />
            <stop offset="70%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#997A15" />
          </linearGradient>

          <filter id="elevation-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.35" />
          </filter>
        </defs>

        <rect
          x="0"
          y="0"
          width="1500"
          height="1500"
          rx="32"
          fill={isLight ? '#FFFFFF' : '#1E1B22'}
          stroke={isLight ? '#E7E0EC' : '#36343B'}
          strokeWidth="6"
        />

        <g id="yard-red">
          <rect x="0" y="0" width="600" height="600" rx="32" fill="url(#grad-red)" />
          <rect x="90" y="90" width="420" height="420" rx="24" fill={isLight ? '#FFF0F0' : '#2E1515'} stroke={isLight ? '#FFB4AB' : '#FF5449'} strokeWidth="4" filter="url(#elevation-shadow)" />
          {COLOR_DATA.red.yardCoords.map((pos, i) => (
            <circle
              key={i}
              cx={pos.col * CELL_SIZE + 50}
              cy={pos.row * CELL_SIZE + 50}
              r="44"
              fill={isLight ? '#FFDAD6' : '#5C0008'}
              stroke={isLight ? '#BA1A1A' : '#FF7369'}
              strokeWidth="3"
            />
          ))}
        </g>

        <g id="yard-green">
          <rect x="900" y="0" width="600" height="600" rx="32" fill="url(#grad-green)" />
          <rect x="990" y="90" width="420" height="420" rx="24" fill={isLight ? '#F0FBF2' : '#14271A'} stroke={isLight ? '#A8EDB9' : '#6DD58C'} strokeWidth="4" filter="url(#elevation-shadow)" />
          {COLOR_DATA.green.yardCoords.map((pos, i) => (
            <circle
              key={i}
              cx={pos.col * CELL_SIZE + 50}
              cy={pos.row * CELL_SIZE + 50}
              r="44"
              fill={isLight ? '#C8F3D2' : '#003914'}
              stroke={isLight ? '#1B6E2E' : '#7EE69D'}
              strokeWidth="3"
            />
          ))}
        </g>

        <g id="yard-yellow">
          <rect x="900" y="900" width="600" height="600" rx="32" fill="url(#grad-yellow)" />
          <rect x="990" y="990" width="420" height="420" rx="24" fill={isLight ? '#FFFBEB' : '#2B2510'} stroke={isLight ? '#F3DC7B' : '#E6C441'} strokeWidth="4" filter="url(#elevation-shadow)" />
          {COLOR_DATA.yellow.yardCoords.map((pos, i) => (
            <circle
              key={i}
              cx={pos.col * CELL_SIZE + 50}
              cy={pos.row * CELL_SIZE + 50}
              r="44"
              fill={isLight ? '#FEF08A' : '#413500'}
              stroke={isLight ? '#7E5700' : '#FFDE7A'}
              strokeWidth="3"
            />
          ))}
        </g>

        <g id="yard-blue">
          <rect x="0" y="900" width="600" height="600" rx="32" fill="url(#grad-blue)" />
          <rect x="90" y="990" width="420" height="420" rx="24" fill={isLight ? '#F0F7FF' : '#122131'} stroke={isLight ? '#B9DCFF' : '#70B6FF'} strokeWidth="4" filter="url(#elevation-shadow)" />
          {COLOR_DATA.blue.yardCoords.map((pos, i) => (
            <circle
              key={i}
              cx={pos.col * CELL_SIZE + 50}
              cy={pos.row * CELL_SIZE + 50}
              r="44"
              fill={isLight ? '#CDE5FF' : '#003258'}
              stroke={isLight ? '#0B57D0' : '#87CEFF'}
              strokeWidth="3"
            />
          ))}
        </g>

        <g id="common-track-cells">
          {COMMON_TRACK.map((cell, idx) => {
            const isRedStart = idx === 0;
            const isGreenStart = idx === 13;
            const isYellowStart = idx === 26;
            const isBlueStart = idx === 39;
            const isSafeStar = SAFE_TRACK_INDICES.includes(idx);

            let cellBg = isLight ? '#FFFFFF' : '#2B2930';
            if (isRedStart) cellBg = 'url(#grad-red)';
            else if (isGreenStart) cellBg = 'url(#grad-green)';
            else if (isYellowStart) cellBg = 'url(#grad-yellow)';
            else if (isBlueStart) cellBg = 'url(#grad-blue)';

            const cx = cell.col * CELL_SIZE + 50;
            const cy = cell.row * CELL_SIZE + 50;

            return (
              <g key={idx}>
                <rect
                  x={cell.col * CELL_SIZE + 2}
                  y={cell.row * CELL_SIZE + 2}
                  width={CELL_SIZE - 4}
                  height={CELL_SIZE - 4}
                  rx="10"
                  fill={cellBg}
                  stroke={isLight ? '#CAC4D0' : '#49454F'}
                  strokeWidth="2"
                />
                {isSafeStar && renderStar(cx, cy, 26, '#FFD54F')}
                {isRedStart && (
                  <path
                    d={`M ${cx - 24} ${cy} L ${cx} ${cy - 20} L ${cx} ${cy - 8} L ${cx + 24} ${cy - 8} L ${cx + 24} ${cy + 8} L ${cx} ${cy + 8} L ${cx} ${cy + 20} Z`}
                    fill="#FFF"
                    transform={`rotate(90 ${cx} ${cy})`}
                    opacity="0.9"
                  />
                )}
                {isGreenStart && (
                  <path
                    d={`M ${cx - 24} ${cy} L ${cx} ${cy - 20} L ${cx} ${cy - 8} L ${cx + 24} ${cy - 8} L ${cx + 24} ${cy + 8} L ${cx} ${cy + 8} L ${cx} ${cy + 20} Z`}
                    fill="#FFF"
                    transform={`rotate(180 ${cx} ${cy})`}
                    opacity="0.9"
                  />
                )}
                {isYellowStart && (
                  <path
                    d={`M ${cx - 24} ${cy} L ${cx} ${cy - 20} L ${cx} ${cy - 8} L ${cx + 24} ${cy - 8} L ${cx + 24} ${cy + 8} L ${cx} ${cy + 8} L ${cx} ${cy + 20} Z`}
                    fill="#FFF"
                    transform={`rotate(270 ${cx} ${cy})`}
                    opacity="0.9"
                  />
                )}
                {isBlueStart && (
                  <path
                    d={`M ${cx - 24} ${cy} L ${cx} ${cy - 20} L ${cx} ${cy - 8} L ${cx + 24} ${cy - 8} L ${cx + 24} ${cy + 8} L ${cx} ${cy + 8} L ${cx} ${cy + 20} Z`}
                    fill="#FFF"
                    transform={`rotate(0 ${cx} ${cy})`}
                    opacity="0.9"
                  />
                )}
              </g>
            );
          })}
        </g>

        <g id="home-stretch-red">
          {COLOR_DATA.red.homeCoords.map((c, i) => (
            <rect
              key={i}
              x={c.col * CELL_SIZE + 2}
              y={c.row * CELL_SIZE + 2}
              width={CELL_SIZE - 4}
              height={CELL_SIZE - 4}
              rx="10"
              fill="url(#grad-red)"
              stroke="#B3261E"
              strokeWidth="2"
            />
          ))}
        </g>

        <g id="home-stretch-green">
          {COLOR_DATA.green.homeCoords.map((c, i) => (
            <rect
              key={i}
              x={c.col * CELL_SIZE + 2}
              y={c.row * CELL_SIZE + 2}
              width={CELL_SIZE - 4}
              height={CELL_SIZE - 4}
              rx="10"
              fill="url(#grad-green)"
              stroke="#1B6E2E"
              strokeWidth="2"
            />
          ))}
        </g>

        <g id="home-stretch-yellow">
          {COLOR_DATA.yellow.homeCoords.map((c, i) => (
            <rect
              key={i}
              x={c.col * CELL_SIZE + 2}
              y={c.row * CELL_SIZE + 2}
              width={CELL_SIZE - 4}
              height={CELL_SIZE - 4}
              rx="10"
              fill="url(#grad-yellow)"
              stroke="#E5A100"
              strokeWidth="2"
            />
          ))}
        </g>

        <g id="home-stretch-blue">
          {COLOR_DATA.blue.homeCoords.map((c, i) => (
            <rect
              key={i}
              x={c.col * CELL_SIZE + 2}
              y={c.row * CELL_SIZE + 2}
              width={CELL_SIZE - 4}
              height={CELL_SIZE - 4}
              rx="10"
              fill="url(#grad-blue)"
              stroke="#0B57D0"
              strokeWidth="2"
            />
          ))}
        </g>

        <g id="center-triangles">
          <rect x="600" y="600" width="300" height="300" fill={isLight ? '#F7F2FA' : '#211F26'} />
          <polygon points="600,600 750,750 600,900" fill="url(#grad-red)" stroke={isLight ? '#FFFFFF' : '#211F26'} strokeWidth="4" />
          <polygon points="600,600 750,750 900,600" fill="url(#grad-green)" stroke={isLight ? '#FFFFFF' : '#211F26'} strokeWidth="4" />
          <polygon points="900,600 750,750 900,900" fill="url(#grad-yellow)" stroke={isLight ? '#FFFFFF' : '#211F26'} strokeWidth="4" />
          <polygon points="600,900 750,750 900,900" fill="url(#grad-blue)" stroke={isLight ? '#FFFFFF' : '#211F26'} strokeWidth="4" />

          <circle cx="750" cy="750" r="48" fill={isLight ? '#FFFFFF' : '#1E1B22'} stroke="#FFD54F" strokeWidth="4" filter="url(#elevation-shadow)" />
          {renderStar(750, 750, 30, '#FFD54F')}
        </g>

        <g id="tokens-layer">
          {Object.entries(cellGroups)
            .flatMap(([_, group]) => {
              const count = group.length;
              return group.map((item, indexInCell) => ({
                ...item,
                count,
                indexInCell,
              }));
            })
            .sort((a, b) => (a.isAnimatingThis ? 1 : 0) - (b.isAnimatingThis ? 1 : 0))
            .map((item) => {
              const { color, tokenIndex, coord, isAnimatingThis, count, indexInCell } = item;
              const isSelectable = selectableMap[`${color}-${tokenIndex}`];

              const baseX = coord.col * CELL_SIZE + 50;
              const baseY = coord.row * CELL_SIZE + 50;

              let offsetX = 0;
              let offsetY = 0;
              if (count > 1 && !isAnimatingThis) {
                const angle = (indexInCell * (2 * Math.PI)) / count - Math.PI / 2;
                const radius = count === 2 ? 18 : 24;
                offsetX = Math.cos(angle) * radius;
                offsetY = Math.sin(angle) * radius;
              }

              const pawnScale = count === 1 ? 1.05 : count === 2 ? 0.88 : 0.74;

              return (
                <g
                  key={`${color}-${tokenIndex}`}
                  className={`board-pawn-group ${isSelectable ? 'pawn-selectable' : ''} ${isAnimatingThis ? 'pawn-is-animating' : ''}`}
                  onClick={() => handleTokenSelect(color, tokenIndex)}
                  style={{
                    transform: `translate(${baseX + offsetX}px, ${baseY + offsetY}px)`,
                    cursor: isSelectable ? 'pointer' : 'default',
                  }}
                >
                  <g transform={`scale(${pawnScale})`}>
                    <ellipse
                      key={isAnimatingThis ? `shadow-${animatingToken?.stepIndex ?? 0}` : 'shadow-static'}
                      cx="0"
                      cy="22"
                      rx="25"
                      ry="9"
                      className={isAnimatingThis ? 'pawn-shadow-hop' : ''}
                      fill={isLight ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.45)'}
                      filter="url(#elevation-shadow)"
                    />

                    {isSelectable && (
                      <ellipse
                        cx="0"
                        cy="22"
                        rx="34"
                        ry="13"
                        className="pawn-glow-halo"
                        fill="none"
                        stroke={COLOR_DATA[color].hex}
                        strokeWidth="5"
                      />
                    )}

                    <g
                      key={isAnimatingThis ? `figure-${animatingToken?.stepIndex ?? 0}` : 'figure-static'}
                      className={isAnimatingThis ? 'pawn-figure-hop' : ''}
                    >
                      <path
                        d="M -23 16 C -23 23, 23 23, 23 16 L 23 11 C 23 6, -23 6, -23 11 Z"
                        fill={`url(#pawn-skirt-${color})`}
                        stroke="#1A181E"
                        strokeWidth="1.5"
                      />
                      <ellipse
                        cx="0"
                        cy="11"
                        rx="22"
                        ry="7"
                        fill={`url(#pawn-body-${color})`}
                        stroke="#FFF"
                        strokeWidth="1.2"
                        opacity="0.95"
                      />

                      <path
                        d="M -18 11 C -14 1, -8 -5, -9 -14 L 9 -14 C 8 -5, 14 1, 18 11 Z"
                        fill={`url(#pawn-body-${color})`}
                        stroke="#1A181E"
                        strokeWidth="1"
                      />

                      <path
                        d="M -7 9 C -5 2, -2 -4, -3 -12"
                        stroke="#FFF"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        opacity="0.45"
                      />

                      <ellipse
                        cx="0"
                        cy="-14"
                        rx="12"
                        ry="4.2"
                        fill="url(#gold-collar)"
                        stroke="#FFF"
                        strokeWidth="1.2"
                      />

                      <circle
                        cx="0"
                        cy="-28"
                        r="16"
                        fill={`url(#pawn-head-${color})`}
                        stroke="#FFF"
                        strokeWidth="1.8"
                        filter="url(#elevation-shadow)"
                      />

                      <ellipse
                        cx="-5"
                        cy="-33"
                        rx="6"
                        ry="4"
                        fill="#FFF"
                        opacity="0.78"
                        transform="rotate(-25 -5 -33)"
                      />
                      <circle
                        cx="-7"
                        cy="-34"
                        r="2"
                        fill="#FFF"
                        opacity="0.95"
                      />
                    </g>
                  </g>
                </g>
              );
            })}
        </g>
      </svg>
    </div>
  );
}
