export const PLAYER_COLORS = ['red', 'green', 'yellow', 'blue'];

export const COLOR_DATA = {
  red: {
    id: 'red',
    name: 'Merah',
    hex: '#D32F2F',
    primary: '#B3261E',
    surface: '#FFEDEA',
    onSurface: '#410002',
    startIndex: 0,
    endCommonIndex: 50,
    homeCoords: [
      { col: 1, row: 7 },
      { col: 2, row: 7 },
      { col: 3, row: 7 },
      { col: 4, row: 7 },
      { col: 5, row: 7 },
    ],
    finalHomeCoord: { col: 6, row: 7 },
    yardCoords: [
      { col: 2, row: 2 },
      { col: 3.5, row: 2 },
      { col: 2, row: 3.5 },
      { col: 3.5, row: 3.5 },
    ],
  },
  green: {
    id: 'green',
    name: 'Hijau',
    hex: '#2E7D32',
    primary: '#1B6E2E',
    surface: '#E7F6E9',
    onSurface: '#002107',
    startIndex: 13,
    endCommonIndex: 11,
    homeCoords: [
      { col: 7, row: 1 },
      { col: 7, row: 2 },
      { col: 7, row: 3 },
      { col: 7, row: 4 },
      { col: 7, row: 5 },
    ],
    finalHomeCoord: { col: 7, row: 6 },
    yardCoords: [
      { col: 11, row: 2 },
      { col: 12.5, row: 2 },
      { col: 11, row: 3.5 },
      { col: 12.5, row: 3.5 },
    ],
  },
  yellow: {
    id: 'yellow',
    name: 'Kuning',
    hex: '#F9A825',
    primary: '#7E5700',
    surface: '#FFF8E1',
    onSurface: '#261900',
    startIndex: 26,
    endCommonIndex: 24,
    homeCoords: [
      { col: 13, row: 7 },
      { col: 12, row: 7 },
      { col: 11, row: 7 },
      { col: 10, row: 7 },
      { col: 9, row: 7 },
    ],
    finalHomeCoord: { col: 8, row: 7 },
    yardCoords: [
      { col: 11, row: 11 },
      { col: 12.5, row: 11 },
      { col: 11, row: 12.5 },
      { col: 12.5, row: 12.5 },
    ],
  },
  blue: {
    id: 'blue',
    name: 'Biru',
    hex: '#1976D2',
    primary: '#0B57D0',
    surface: '#EBF1FF',
    onSurface: '#001D36',
    startIndex: 39,
    endCommonIndex: 37,
    homeCoords: [
      { col: 7, row: 13 },
      { col: 7, row: 12 },
      { col: 7, row: 11 },
      { col: 7, row: 10 },
      { col: 7, row: 9 },
    ],
    finalHomeCoord: { col: 7, row: 8 },
    yardCoords: [
      { col: 2, row: 11 },
      { col: 3.5, row: 11 },
      { col: 2, row: 12.5 },
      { col: 3.5, row: 12.5 },
    ],
  },
};

export const COMMON_TRACK = [
  { col: 1, row: 6 }, { col: 2, row: 6 }, { col: 3, row: 6 }, { col: 4, row: 6 }, { col: 5, row: 6 },
  { col: 6, row: 5 }, { col: 6, row: 4 }, { col: 6, row: 3 }, { col: 6, row: 2 }, { col: 6, row: 1 }, { col: 6, row: 0 },
  { col: 7, row: 0 }, { col: 8, row: 0 },
  { col: 8, row: 1 }, { col: 8, row: 2 }, { col: 8, row: 3 }, { col: 8, row: 4 }, { col: 8, row: 5 },
  { col: 9, row: 6 }, { col: 10, row: 6 }, { col: 11, row: 6 }, { col: 12, row: 6 }, { col: 13, row: 6 }, { col: 14, row: 6 },
  { col: 14, row: 7 }, { col: 14, row: 8 },
  { col: 13, row: 8 }, { col: 12, row: 8 }, { col: 11, row: 8 }, { col: 10, row: 8 }, { col: 9, row: 8 },
  { col: 8, row: 9 }, { col: 8, row: 10 }, { col: 8, row: 11 }, { col: 8, row: 12 }, { col: 8, row: 13 }, { col: 8, row: 14 },
  { col: 7, row: 14 }, { col: 6, row: 14 },
  { col: 6, row: 13 }, { col: 6, row: 12 }, { col: 6, row: 11 }, { col: 6, row: 10 }, { col: 6, row: 9 },
  { col: 5, row: 8 }, { col: 4, row: 8 }, { col: 3, row: 8 }, { col: 2, row: 8 }, { col: 1, row: 8 }, { col: 0, row: 8 },
  { col: 0, row: 7 }, { col: 0, row: 6 },
];

export const SAFE_TRACK_INDICES = [0, 8, 13, 21, 26, 34, 39, 47];

export const TOTAL_STEPS_TO_HOME = 56;

export function getCoordinates(color, step, tokenIndex = 0) {
  const cData = COLOR_DATA[color];
  if (step === -1) {
    return cData.yardCoords[tokenIndex];
  }
  if (step === TOTAL_STEPS_TO_HOME) {
    return cData.finalHomeCoord;
  }
  if (step >= 51 && step <= 55) {
    return cData.homeCoords[step - 51];
  }
  const trackIndex = (cData.startIndex + step) % 52;
  return COMMON_TRACK[trackIndex];
}

export function isSafePosition(color, step) {
  if (step === -1 || step >= 51) return true;
  const trackIndex = (COLOR_DATA[color].startIndex + step) % 52;
  return SAFE_TRACK_INDICES.includes(trackIndex);
}

export function getCommonTrackIndex(color, step) {
  if (step < 0 || step > 50) return null;
  return (COLOR_DATA[color].startIndex + step) % 52;
}

export function canMoveToken(step, diceValue) {
  if (step === TOTAL_STEPS_TO_HOME) return false;
  if (step === -1) {
    return diceValue === 6;
  }
  return step + diceValue <= TOTAL_STEPS_TO_HOME;
}

export function getStepByStepPath(color, currentStep, diceValue, tokenIndex = 0) {
  const path = [];
  if (currentStep === -1) {
    if (diceValue === 6) {
      path.push(getCoordinates(color, 0, tokenIndex));
    }
    return path;
  }
  const targetStep = currentStep + diceValue;
  for (let s = currentStep + 1; s <= targetStep; s++) {
    path.push(getCoordinates(color, s, tokenIndex));
  }
  return path;
}

export function findCaptureTarget(movingColor, targetStep, allTokens) {
  if (targetStep < 0 || targetStep > 50) return null;
  const targetTrackIndex = (COLOR_DATA[movingColor].startIndex + targetStep) % 52;
  if (SAFE_TRACK_INDICES.includes(targetTrackIndex)) return null;

  for (const color of PLAYER_COLORS) {
    if (color === movingColor) continue;
    const tokens = allTokens[color];
    for (let i = 0; i < tokens.length; i++) {
      const oppStep = tokens[i];
      if (oppStep >= 0 && oppStep <= 50) {
        const oppTrackIndex = (COLOR_DATA[color].startIndex + oppStep) % 52;
        if (oppTrackIndex === targetTrackIndex) {
          return { color, tokenIndex: i };
        }
      }
    }
  }
  return null;
}

export function getBestBotMove(botColor, diceValue, allTokens) {
  const tokens = allTokens[botColor];
  const validTokenIndices = [];

  tokens.forEach((step, idx) => {
    if (canMoveToken(step, diceValue)) {
      validTokenIndices.push(idx);
    }
  });

  if (validTokenIndices.length === 0) return null;
  if (validTokenIndices.length === 1) return validTokenIndices[0];

  let bestIdx = validTokenIndices[0];
  let maxScore = -9999;

  validTokenIndices.forEach((idx) => {
    const currentStep = tokens[idx];
    const targetStep = currentStep === -1 ? 0 : currentStep + diceValue;
    let score = 0;

    if (targetStep === TOTAL_STEPS_TO_HOME) {
      score += 1000;
    }

    const capture = findCaptureTarget(botColor, targetStep, allTokens);
    if (capture) {
      score += 600;
    }

    if (currentStep === -1 && targetStep === 0) {
      score += 350;
    }

    if (currentStep <= 50 && targetStep > 50) {
      score += 250;
    }

    if (isSafePosition(botColor, targetStep)) {
      score += 150;
    }

    if (currentStep >= 0 && currentStep <= 50) {
      const currTrack = (COLOR_DATA[botColor].startIndex + currentStep) % 52;
      for (const oppColor of PLAYER_COLORS) {
        if (oppColor === botColor) continue;
        allTokens[oppColor].forEach((oppStep) => {
          if (oppStep >= 0 && oppStep <= 50) {
            const oppTrack = (COLOR_DATA[oppColor].startIndex + oppStep) % 52;
            const dist = (currTrack - oppTrack + 52) % 52;
            if (dist > 0 && dist <= 6) {
              score += 180;
            }
          }
        });
      }
    }

    score += targetStep * 2;

    if (score > maxScore) {
      maxScore = score;
      bestIdx = idx;
    }
  });

  return bestIdx;
}
