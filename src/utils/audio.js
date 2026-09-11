class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound(forceState) {
    if (typeof forceState === 'boolean') {
      this.enabled = forceState;
    } else {
      this.enabled = !this.enabled;
    }
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  playRoll() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const totalClicks = 8;
    for (let i = 0; i < totalClicks; i++) {
      const delay = i * 0.065 + Math.random() * 0.02;
      const now = this.ctx.currentTime + delay;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180 + Math.random() * 240, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.04);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    }
  }

  playStep(stepIndex = 0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const baseFreq = 380 + (stepIndex % 6) * 45;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.07);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playSelect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playCapture() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    const oscBass = this.ctx.createOscillator();
    const gainBass = this.ctx.createGain();
    oscBass.type = 'triangle';
    oscBass.frequency.setValueAtTime(220, now);
    oscBass.frequency.exponentialRampToValueAtTime(40, now + 0.25);
    gainBass.gain.setValueAtTime(0.6, now);
    gainBass.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    oscBass.connect(gainBass);
    gainBass.connect(this.ctx.destination);
    oscBass.start(now);
    oscBass.stop(now + 0.26);

    const oscSlide = this.ctx.createOscillator();
    const gainSlide = this.ctx.createGain();
    oscSlide.type = 'sawtooth';
    oscSlide.frequency.setValueAtTime(650, now + 0.05);
    oscSlide.frequency.exponentialRampToValueAtTime(120, now + 0.35);
    gainSlide.gain.setValueAtTime(0.25, now + 0.05);
    gainSlide.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    oscSlide.connect(gainSlide);
    gainSlide.connect(this.ctx.destination);
    oscSlide.start(now + 0.05);
    oscSlide.stop(now + 0.36);
  }

  playHome() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    });
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.14, t: 0 },
      { f: 523.25, d: 0.14, t: 0.15 },
      { f: 523.25, d: 0.14, t: 0.30 },
      { f: 659.25, d: 0.35, t: 0.45 },
      { f: 783.99, d: 0.20, t: 0.85 },
      { f: 1046.50, d: 0.60, t: 1.05 }
    ];

    notes.forEach((note) => {
      const now = this.ctx.currentTime + note.t;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + note.d + 0.02);
    });
  }
}

export const sound = new SoundEngine();
