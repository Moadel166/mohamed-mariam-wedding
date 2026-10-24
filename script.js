const envelopeScreen = document.getElementById('envelopeScreen');
const invitation = document.getElementById('invitation');
const openInvitation = document.getElementById('openInvitation');
const musicToggle = document.getElementById('musicToggle');
const musicFrame = document.getElementById('musicFrame');
const musicHint = document.getElementById('musicHint');
const musicSection = document.querySelector('.music-section');
const shareButton = document.getElementById('shareButton');
const targetDate = new Date('2026-11-06T20:00:00+02:00').getTime();
let musicStarted = false;

function startMusic() {
  musicFrame.src = 'https://www.youtube.com/embed/Rzh2m0_e0xU?autoplay=1&loop=1&playlist=Rzh2m0_e0xU&controls=0&modestbranding=1&rel=0';
  musicStarted = true;
  musicSection.classList.add('is-ready');
  musicToggle.querySelector('span').textContent = 'الأغنية تعمل';
  musicToggle.querySelector('b').textContent = '♪';
  musicHint.textContent = 'لو لم تسمعوا الصوت، اضغطوا على زر «الأغنية تعمل» مرة أخرى أو افتحوا الرابط من يوتيوب.';
}

function openGate() {
  if (envelopeScreen.classList.contains('is-closing')) return;
  startMusic();
  envelopeScreen.classList.add('is-closing');
  window.setTimeout(() => {
    envelopeScreen.style.display = 'none';
    invitation.classList.add('is-visible');
    invitation.setAttribute('aria-hidden', 'false');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 580);
}

openInvitation.addEventListener('click', openGate);
envelopeScreen.addEventListener('click', openGate);

musicToggle.addEventListener('click', () => {
  if (!musicStarted) startMusic();
  else window.open('https://youtu.be/Rzh2m0_e0xU?si=pT6gjPsCwJlvlo0Q', '_blank', 'noopener,noreferrer');
});

shareButton.addEventListener('click', () => {
  const shareUrl = window.location.href;
  const fallbackCopy = () => {
    const helper = document.createElement('textarea');
    helper.value = shareUrl;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(shareUrl).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }
  const label = shareButton.querySelector('span');
  const icon = shareButton.querySelector('b');
  label.textContent = 'تم نسخ الرابط';
  icon.textContent = '✓';
  window.setTimeout(() => {
    label.textContent = 'شارك فرحتنا';
    icon.textContent = '⌯';
  }, 2200);
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
    document.querySelectorAll(`[data-unit="${unit}"]`).forEach((node) => {
      node.textContent = String(value).padStart(2, '0');
    });
  });
}
updateCountdown();
window.setInterval(updateCountdown, 1000);
