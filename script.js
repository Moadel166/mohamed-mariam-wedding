(() => {
  const gate = document.getElementById('gate');
  const musicAudio = document.getElementById('musicAudio');
  const shareButton = document.getElementById('shareButton');
  const target = new Date('2026-11-06T20:00:00+02:00').getTime();
  musicAudio.load();

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
    musicAudio.currentTime = 0;
    musicAudio.volume = 1;
    musicAudio.play().catch(() => {});
  }

  function openGate() {
    if (gate.classList.contains('open')) return;
    gate.classList.add('open');
    burstSparkles();
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
