const envelopeScreen = document.getElementById('envelopeScreen');
const invitation = document.getElementById('invitation');
const openInvitation = document.getElementById('openInvitation');
const musicToggle = document.getElementById('musicToggle');
const musicFrame = document.getElementById('musicFrame');
const musicHint = document.getElementById('musicHint');
const targetDate = new Date('2026-11-06T20:00:00+02:00').getTime();
let musicStarted = false;

function startMusic() {
  musicFrame.src = 'https://www.youtube.com/embed/Rzh2m0_e0xU?autoplay=1&loop=1&playlist=Rzh2m0_e0xU&controls=0&modestbranding=1&rel=0';
  musicStarted = true;
  musicToggle.querySelector('span').textContent = 'الأغنية تعمل';
  musicToggle.querySelector('b').textContent = '♪';
  musicHint.textContent = 'لو لم تسمعوا الصوت، اضغطوا على زر «الأغنية تعمل» مرة أخرى أو افتحوا الرابط من يوتيوب.';
}

openInvitation.addEventListener('click', () => {
  startMusic();
  envelopeScreen.classList.add('is-closing');
  window.setTimeout(() => {
    envelopeScreen.style.display = 'none';
    invitation.classList.add('is-visible');
    invitation.setAttribute('aria-hidden', 'false');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 580);
});

musicToggle.addEventListener('click', () => {
  if (!musicStarted) startMusic();
  else window.open('https://youtu.be/Rzh2m0_e0xU?si=pT6gjPsCwJlvlo0Q', '_blank', 'noopener,noreferrer');
});

function updateCountdown() {
  const distance = targetDate - Date.now();
  const values = distance > 0 ? {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  } : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  Object.entries(values).forEach(([unit, value]) => {
    const node = document.querySelector(`[data-unit="${unit}"]`);
    if (node) node.textContent = String(value).padStart(2, '0');
  });
}
updateCountdown();
window.setInterval(updateCountdown, 1000);
