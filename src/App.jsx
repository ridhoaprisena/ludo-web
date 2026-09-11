import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import GameView from './components/GameView';
import RulesDialog from './components/RulesDialog';
import SettingsDialog from './components/SettingsDialog';
import { sound } from './utils/audio';
import './App.css';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [humanColor, setHumanColor] = useState('red');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [botSpeed, setBotSpeed] = useState('normal');
  const [botSpeedMs, setBotSpeedMs] = useState(650);

  const [showRules, setShowRules] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const changeBotSpeed = (speedId, speedMs) => {
    setBotSpeed(speedId);
    setBotSpeedMs(speedMs);
  };

  return (
    <div className="ludo-app-root">
      {currentScreen === 'menu' && (
        <MainMenu
          selectedColor={humanColor}
          onSelectColor={setHumanColor}
          onStartGame={() => setCurrentScreen('game')}
          onOpenRules={() => setShowRules(true)}
          onOpenSettings={() => setShowSettings(true)}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {currentScreen === 'game' && (
        <GameView
          humanColor={humanColor}
          botSpeed={botSpeed}
          botSpeedMs={botSpeedMs}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          theme={theme}
          onToggleTheme={toggleTheme}
          onChangeBotSpeed={changeBotSpeed}
          onExitToMenu={() => setCurrentScreen('menu')}
        />
      )}

      {showRules && <RulesDialog onClose={() => setShowRules(false)} />}

      {showSettings && (
        <SettingsDialog
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          botSpeed={botSpeed}
          onChangeBotSpeed={changeBotSpeed}
          theme={theme}
          onToggleTheme={toggleTheme}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
