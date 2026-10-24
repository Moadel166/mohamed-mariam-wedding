(() => {
  const gate = document.getElementById('gate');
  const musicFrame = document.getElementById('musicFrame');
  const zaghrooda = document.getElementById('zaghrooda');
  const shareButton = document.getElementById('shareButton');
  const target = new Date('2026-11-06T20:00:00+02:00').getTime();

  function playOpenChime() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.8);
    gain.connect(context.destination);
    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start(context.currentTime + index * 0.08);
      oscillator.stop(context.currentTime + 0.85);
    });
    window.setTimeout(() => context.close(), 1200);
  }

  function burstSparkles() {
    const burst = document.querySelector('.sparkle-burst');
    for (let index = 0; index < 18; index += 1) {
      const sparkle = document.createElement('i');
      const angle = (Math.PI * 2 * index) / 18;
      const distance = 90 + Math.random() * 190;
      sparkle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
      sparkle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
      sparkle.style.setProperty('--r', `${Math.round(Math.random() * 220 - 110)}deg`);
      burst.appendChild(sparkle);
    }
    burst.classList.add('active');
    window.setTimeout(() => { burst.innerHTML = ''; burst.classList.remove('active'); }, 1400);
  }

  function playMusic() {
    musicFrame.src = 'https://www.youtube.com/embed/Rzh2m0_e0xU?autoplay=1&loop=1&playlist=Rzh2m0_e0xU&controls=0&modestbranding=1&rel=0';
  }

  function playZaghrooda() {
    zaghrooda.currentTime = 0;
    zaghrooda.volume = 0.95;
    zaghrooda.play().catch(() => {});
  }

  function openGate() {
    if (gate.classList.contains('open')) return;
    gate.classList.add('open');
    burstSparkles();
    playOpenChime();
    playZaghrooda();
    playMusic();
    window.setTimeout(() => document.body.classList.remove('locked'), 1500);
  }

  gate.addEventListener('click', openGate);
  gate.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openGate();
    }
  });

  shareButton.addEventListener('click', () => {
    const url = window.location.href;
    const fallbackCopy = () => {
      const helper = document.createElement('textarea');
      helper.value = url;
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      helper.remove();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).catch(fallbackCopy);
    else fallbackCopy();
    shareButton.textContent = 'تم نسخ الرابط';
    window.setTimeout(() => { shareButton.textContent = 'شارك فرحتنا'; }, 2200);
  });

  function arabicNumber(number) { return number.toLocaleString('ar-EG'); }
  function tick() {
    const remaining = Math.max(0, target - Date.now());
    const values = [
      Math.floor(remaining / 86400000),
      Math.floor(remaining / 3600000) % 24,
      Math.floor(remaining / 60000) % 60,
      Math.floor(remaining / 1000) % 60,
    ];
    ['d', 'h', 'm', 's'].forEach((id, index) => {
      document.getElementById(id).textContent = arabicNumber(values[index]);
    });
  }
  tick();
  window.setInterval(tick, 1000);

  const track = document.getElementById('track');
  Array.from(track.children).forEach((image) => {
    const clone = image.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
})();
