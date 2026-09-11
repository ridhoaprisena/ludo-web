import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  PLAYER_COLORS,
  TOTAL_STEPS_TO_HOME,
  canMoveToken,
  getStepByStepPath,
  findCaptureTarget,
  getBestBotMove,
} from '../game/ludoEngine';
import { sound } from '../utils/audio';
import TopBar from './TopBar';
import LudoBoard from './LudoBoard';
import PlayerCard from './PlayerCard';
import Dice from './Dice';
import VictoryDialog from './VictoryDialog';
import PauseDialog from './PauseDialog';
import RulesDialog from './RulesDialog';
import SettingsDialog from './SettingsDialog';

export default function GameView({
  humanColor = 'red',
  botSpeed = 'normal',
  botSpeedMs = 650,
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
  onChangeBotSpeed,
  onExitToMenu,
}) {
  const [tokens, setTokens] = useState({
    red: [-1, -1, -1, -1],
    green: [-1, -1, -1, -1],
    yellow: [-1, -1, -1, -1],
    blue: [-1, -1, -1, -1],
  });

  const humanIndex = Math.max(0, PLAYER_COLORS.indexOf(humanColor));
  const [turnIndex, setTurnIndex] = useState(humanIndex);
  const [turnState, setTurnState] = useState('rolling');
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [rollId, setRollId] = useState(0);
  const [consecutiveSixes, setConsecutiveSixes] = useState(0);
  const [animatingToken, setAnimatingToken] = useState(null);
  const [winner, setWinner] = useState(null);
  const [turnMessage, setTurnMessage] = useState(null);

  const [isPaused, setIsPaused] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const activeColor = PLAYER_COLORS[turnIndex];
  const isHumanTurn = activeColor === humanColor;

  const timeoutsRef = useRef([]);
  const rollTimeoutRef = useRef(null);

  const addTimeout = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearAllTimeouts();
      if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current);
    };
  }, []);

  const players = {
    red: { name: humanColor === 'red' ? 'Anda (Merah)' : 'Bot Merah' },
    green: { name: humanColor === 'green' ? 'Anda (Hijau)' : 'Bot Hijau' },
    yellow: { name: humanColor === 'yellow' ? 'Anda (Kuning)' : 'Bot Kuning' },
    blue: { name: humanColor === 'blue' ? 'Anda (Biru)' : 'Bot Biru' },
  };

  const checkVictory = (currentTokens, color) => {
    const allHome = currentTokens[color].every((s) => s === TOTAL_STEPS_TO_HOME);
    if (allHome) {
      setWinner(color);
      return true;
    }
    return false;
  };

  const nextTurn = useCallback(() => {
    clearAllTimeouts();
    if (rollTimeoutRef.current) {
      clearTimeout(rollTimeoutRef.current);
      rollTimeoutRef.current = null;
    }
    setIsRolling(false);
    setConsecutiveSixes(0);
    setTurnMessage(null);
    setTurnIndex((prev) => (prev + 1) % 4);
    setTurnState('rolling');
    setDiceValue(null);
  }, []);

  const executeTokenMove = useCallback(
    (color, tokenIndex, rolledVal) => {
      setTurnState('animating');
      setTurnMessage(null);
      const currentStep = tokens[color][tokenIndex];
      const path = getStepByStepPath(color, currentStep, rolledVal, tokenIndex);

      if (path.length === 0) {
        nextTurn();
        return;
      }

      const hopDuration = botSpeed === 'fast' ? 160 : botSpeed === 'slow' ? 290 : 220;
      let stepCounter = 0;

      const doStep = () => {
        if (stepCounter < path.length) {
          const nextCoord = path[stepCounter];
          const currStepIndex = stepCounter;
          setAnimatingToken({
            color,
            tokenIndex,
            currentCoord: nextCoord,
            stepIndex: currStepIndex,
            isHopping: true,
          });
          sound.playStep(currStepIndex);
          stepCounter++;
          addTimeout(doStep, hopDuration);
        } else {
          addTimeout(() => {
            setAnimatingToken(null);

            const finalStep = currentStep === -1 ? 0 : currentStep + rolledVal;
            const updatedTokens = {
              ...tokens,
              [color]: tokens[color].map((s, idx) => (idx === tokenIndex ? finalStep : s)),
            };

            let gotCaptureBonus = false;
            const captureTarget = findCaptureTarget(color, finalStep, tokens);
            if (captureTarget) {
              sound.playCapture();
              gotCaptureBonus = true;
              updatedTokens[captureTarget.color] = updatedTokens[captureTarget.color].map(
                (s, idx) => (idx === captureTarget.tokenIndex ? -1 : s)
              );
            }

            let gotHomeBonus = false;
            if (finalStep === TOTAL_STEPS_TO_HOME) {
              sound.playHome();
              gotHomeBonus = true;
            }

            setTokens(updatedTokens);

            if (checkVictory(updatedTokens, color)) {
              return;
            }

            if (rolledVal === 6 || gotCaptureBonus || gotHomeBonus) {
              const bonusMsg = gotCaptureBonus
                ? 'Menangkap lawan! Bonus lemparan!'
                : gotHomeBonus
                ? 'Tiba di Home! Bonus lemparan!'
                : 'Dadu 6! Bonus lemparan!';
              setTurnMessage(bonusMsg);
              setTurnState('rolling');
              setDiceValue(null);
            } else {
              nextTurn();
            }
          }, 80);
        }
      };

      doStep();
    },
    [tokens, botSpeed, nextTurn]
  );

  const performDiceRoll = useCallback((callerColor) => {
    if (callerColor !== activeColor) return;
    if (turnState !== 'rolling' || isRolling) return;

    if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current);
    setIsRolling(true);
    setRollId((prev) => prev + 1);
    setTurnMessage(null);
    sound.playRoll();

    rollTimeoutRef.current = setTimeout(() => {
      rollTimeoutRef.current = null;
      const rolled = Math.floor(Math.random() * 6) + 1;
      setDiceValue(rolled);
      setIsRolling(false);

      if (rolled === 6) {
        if (consecutiveSixes + 1 >= 3) {
          setTurnMessage('3x angka 6 berturut-turut! Giliran gugur.');
          addTimeout(() => {
            nextTurn();
          }, 1200);
          return;
        }
        setConsecutiveSixes((prev) => prev + 1);
      } else {
        setConsecutiveSixes(0);
      }

      const movableTokens = [];
      tokens[activeColor].forEach((step, idx) => {
        if (canMoveToken(step, rolled)) {
          movableTokens.push(idx);
        }
      });

      if (movableTokens.length === 0) {
        const msg = isHumanTurn
          ? `Dapat angka ${rolled}. Butuh 6 untuk keluar base!`
          : `Bot dapat angka ${rolled}. Tidak ada langkah.`;
        setTurnMessage(msg);

        const delay = isHumanTurn ? 1500 : botSpeedMs * 1.2;
        addTimeout(() => {
          nextTurn();
        }, delay);
      } else {
        setTurnState('moving');
        if (isHumanTurn) {
          setTurnMessage(`Dapat angka ${rolled}! Pilih bidak untuk melangkah.`);
        } else {
          addTimeout(() => {
            const bestIdx = getBestBotMove(activeColor, rolled, tokens);
            if (bestIdx !== null) {
              executeTokenMove(activeColor, bestIdx, rolled);
            } else {
              nextTurn();
            }
          }, botSpeedMs);
        }
      }
    }, 700);
  }, [
    turnState,
    isRolling,
    consecutiveSixes,
    tokens,
    activeColor,
    isHumanTurn,
    botSpeedMs,
    nextTurn,
    executeTokenMove,
  ]);

  const handleHumanRoll = () => {
    if (!isHumanTurn) return;
    performDiceRoll(humanColor);
  };

  useEffect(() => {
    if (!isHumanTurn && turnState === 'rolling' && !isRolling && !isPaused && !winner) {
      const botColor = activeColor;
      const timer = addTimeout(() => {
        if (PLAYER_COLORS[turnIndex] === botColor) {
          performDiceRoll(botColor);
        }
      }, botSpeedMs * 1.1);
      return () => clearTimeout(timer);
    }
  }, [turnIndex, turnState, isHumanTurn, isRolling, isPaused, winner, botSpeedMs, performDiceRoll, activeColor]);

  const handleTokenClick = (color, tokenIndex) => {
    if (!isHumanTurn || turnState !== 'moving' || !diceValue) return;
    if (color !== activeColor) return;

    const step = tokens[color][tokenIndex];
    if (canMoveToken(step, diceValue)) {
      executeTokenMove(color, tokenIndex, diceValue);
    }
  };

  const handleRestart = () => {
    clearAllTimeouts();
    if (rollTimeoutRef.current) {
      clearTimeout(rollTimeoutRef.current);
      rollTimeoutRef.current = null;
    }
    setTokens({
      red: [-1, -1, -1, -1],
      green: [-1, -1, -1, -1],
      yellow: [-1, -1, -1, -1],
      blue: [-1, -1, -1, -1],
    });
    setTurnIndex(humanIndex);
    setTurnState('rolling');
    setDiceValue(1);
    setIsRolling(false);
    setRollId((prev) => prev + 1);
    setConsecutiveSixes(0);
    setWinner(null);
    setTurnMessage(null);
    setIsPaused(false);
  };

  return (
    <div className="game-view-container">
      <TopBar
        activeColor={activeColor}
        isHumanTurn={isHumanTurn}
        turnState={turnState}
        turnMessage={turnMessage}
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
        onOpenRules={() => setShowRules(true)}
        onOpenSettings={() => setShowSettings(true)}
        onOpenPause={() => setIsPaused(true)}
      />

      <main className="game-stage">
        <div className="stage-player-row top-row">
          <PlayerCard
            color="red"
            player={players.red}
            isActive={activeColor === 'red'}
            isHuman={humanColor === 'red'}
            tokens={tokens.red}
            turnState={turnState}
            position="top-left"
          />

          <PlayerCard
            color="green"
            player={players.green}
            isActive={activeColor === 'green'}
            isHuman={humanColor === 'green'}
            tokens={tokens.green}
            turnState={turnState}
            position="top-right"
          />
        </div>

        <div className="stage-board-arena">
          <LudoBoard
            tokens={tokens}
            activeColor={activeColor}
            diceValue={diceValue}
            turnState={turnState}
            isHumanTurn={isHumanTurn}
            animatingToken={animatingToken}
            onTokenClick={handleTokenClick}
            theme={theme}
          />
        </div>

        <div className="stage-player-row bottom-row">
          <PlayerCard
            color="blue"
            player={players.blue}
            isActive={activeColor === 'blue'}
            isHuman={humanColor === 'blue'}
            tokens={tokens.blue}
            turnState={turnState}
            position="bottom-left"
          />

          <PlayerCard
            color="yellow"
            player={players.yellow}
            isActive={activeColor === 'yellow'}
            isHuman={humanColor === 'yellow'}
            tokens={tokens.yellow}
            turnState={turnState}
            position="bottom-right"
          />
        </div>

        <div className="stage-dice-console">
          <Dice
            value={diceValue}
            isRolling={isRolling}
            rollId={rollId}
            disabled={!isHumanTurn || turnState !== 'rolling'}
            onRoll={handleHumanRoll}
            playerColor={activeColor}
            isHumanTurn={isHumanTurn}
          />
        </div>
      </main>

      {showRules && <RulesDialog onClose={() => setShowRules(false)} />}

      {showSettings && (
        <SettingsDialog
          soundEnabled={soundEnabled}
          onToggleSound={onToggleSound}
          botSpeed={botSpeed}
          onChangeBotSpeed={onChangeBotSpeed}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onClose={() => setShowSettings(false)}
        />
      )}

      {isPaused && (
        <PauseDialog
          onResume={() => setIsPaused(false)}
          onRestart={handleRestart}
          onExitToMenu={onExitToMenu}
        />
      )}

      {winner && (
        <VictoryDialog
          winnerColor={winner}
          isHumanWinner={winner === humanColor}
          onPlayAgain={handleRestart}
          onExitToMenu={onExitToMenu}
        />
      )}
    </div>
  );
}
