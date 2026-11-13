/* =============================================
   SCRIPT.JS — Guli Birthday Website
   ============================================= */
const LOGIN_USER  = "Enna_Meena";
const LOGIN_PASS  = "Arushi@2004";
const SECRET_PASS = "DUDUBUBU";

/* ─── Heart particles ─── */
function spawnHearts(id, n = 18) {
  const c = document.getElementById(id); if (!c) return;
  const em = ['❤️','💕','💗','💓','💖','💝','🌸','✨','🎀'];
  for (let i = 0; i < n; i++) {
    const el = document.createElement('span');
    el.className = 'heart-particle';
    el.textContent = em[Math.floor(Math.random() * em.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (4 + Math.random() * 6) + 's';
    el.style.animationDelay    = (Math.random() * 6) + 's';
    el.style.fontSize = (.9 + Math.random() * 1.2) + 'rem';
    c.appendChild(el);
  }
}

/* ─── Eye toggle ─── */
function toggleEye(id, btn) {
  const inp = document.getElementById(id); if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? '👁️' : '🙈';
}

/* ─── Page transition ─── */
function transitionTo(fromId, toId, cb) {
  const from = document.getElementById(fromId);
  const to   = document.getElementById(toId);
  if (!from || !to) return;
  from.classList.add('exit');
  setTimeout(() => {
    from.classList.remove('active','exit');
    to.classList.add('active');
    if (cb) cb();
  }, 750);
}

/* ─── LOGIN ─── */
function doLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const err  = document.getElementById('loginError');
  if (user === LOGIN_USER && pass === LOGIN_PASS) {
    err.textContent = '';
    transitionTo('pageLogin', 'page1', () => spawnHearts('heartsBg', 18));
  } else {
    err.textContent = '❌ Wrong username or password!';
    err.style.animation = 'none'; err.offsetHeight; err.style.animation = '';
    document.getElementById('loginPass').value = '';
    document.getElementById('loginPass').focus();
  }
}

/* ─── NAVIGATION ─── */
function goToWish() {
  const active = document.querySelector('.page.active');
  const fromId = active ? active.id : 'page1';
  if (fromId === 'page2') { stopMusic(); stopConfetti(); stopOrbit(); }
  transitionTo(fromId, 'pageWish', () => {
    spawnHearts('heartsBg3', 20);
    document.querySelectorAll('.wish-line').forEach(el => {
      el.style.animation = 'none'; el.offsetHeight; el.style.animation = '';
    });
  });
}

function goToSecret() {
  transitionTo('pageWish', 'pageSecretLock', () => {
    spawnHearts('heartsBgSL', 15);
    document.getElementById('secretPassInput').value = '';
    document.getElementById('secretLockError').textContent = '';
  });
}

function goBackFromSecret() {
  stopSecretMusic();
  transitionTo('pageSecretContent', 'pageWish', () => spawnHearts('heartsBg3', 20));
}

function goToPage2() {
  const active = document.querySelector('.page.active');
  const fromId = active ? active.id : 'pageWish';
  if (fromId === 'pageSecretContent') stopSecretMusic();
  transitionTo(fromId, 'page2', () => {
    spawnHearts('heartsBg2', 20);
    startMusic();
    launchConfetti();
    startOrbit();
  });
}

/* ─── SECRET UNLOCK ─── */
function doSecretUnlock() {
  const inp = document.getElementById('secretPassInput');
  const err = document.getElementById('secretLockError');
  if (inp.value === SECRET_PASS) {
    err.textContent = '';
    transitionTo('pageSecretLock', 'pageSecretContent', () => {
      spawnStars('secretConfetti', 120);
      startSecretMusic();
      initSlideshow();
    });
  } else {
    err.textContent = '🔒 Wrong code! Only Guli knows this 😉';
    err.style.animation = 'none'; err.offsetHeight; err.style.animation = '';
    inp.value = ''; inp.focus();
  }
}

/* ─── SECRET WISH — LOVE BOMB ─── */
function sendLoveBomb() {
  const text = document.getElementById('scWishText').value.trim();
  if (!text) {
    // Shake the box if empty
    const box = document.getElementById('scWishText');
    box.style.animation = 'none'; box.offsetHeight;
    box.style.animation = 'wishShake .4s ease';
    return;
  }

  // Send email silently
  _sendWishEmail(text);

  // Clear the textarea
  document.getElementById('scWishText').value = '';

  // 💥 LOVE BOMB BLAST!
  launchLoveBomb();
}

function launchLoveBomb() {
  const emojis = ['❤️','💕','💗','💖','💝','💓','💞','🌸','✨','💫','🥰','😍','💋','🌹','🎀','💘','🌺','⭐','🦋','🌟','💑','🫶','🥹','💐','🫀'];

  // Full-screen overlay — covers entire page
  const overlay = document.createElement('div');
  overlay.className = 'love-bomb-overlay';
  document.body.appendChild(overlay);

  const W = window.innerWidth;
  const H = window.innerHeight;
  const cx = W / 2;
  const cy = H / 2;

  // 1) WAVE RINGS — 3 expanding ring bursts
  for (let ring = 0; ring < 3; ring++) {
    const ringCount = 24 + ring * 12;
    setTimeout(() => {
      for (let i = 0; i < ringCount; i++) {
        const p = document.createElement('div');
        p.className = 'lb-particle';
        const angle = (i / ringCount) * 360;
        const dist  = (ring + 1) * 180 + Math.random() * 100;
        const tx    = Math.cos(angle * Math.PI / 180) * dist;
        const ty    = Math.sin(angle * Math.PI / 180) * dist;
        const size  = 1.0 + Math.random() * 1.8;
        const dur   = 0.9 + Math.random() * 0.5;
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.cssText = `font-size:${size}rem;--tx:${tx}px;--ty:${ty}px;animation:lbFly ${dur}s ease-out forwards;`;
        overlay.appendChild(p);
      }
    }, ring * 180);
  }

  // 2) RAIN — emoji raining down from top all across the width
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const r = document.createElement('div');
      r.className = 'lb-rain';
      r.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const size  = 1.0 + Math.random() * 1.6;
      const left  = Math.random() * 100;
      const dur   = 1.2 + Math.random() * 1.2;
      r.style.cssText = `font-size:${size}rem;left:${left}%;--rain-dur:${dur}s;animation:lbRain ${dur}s ease-in forwards;`;
      overlay.appendChild(r);
    }, Math.random() * 1500);
  }

  // 3) SPIRAL — emojis spiraling out from center
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'lb-particle';
    const angle = (i / 30) * 720; // 2 full rotations
    const dist  = 80 + i * 14;
    const tx    = Math.cos(angle * Math.PI / 180) * Math.min(dist, cx * 0.9);
    const ty    = Math.sin(angle * Math.PI / 180) * Math.min(dist, cy * 0.9);
    const size  = 1.4 + Math.random() * 1.2;
    const delay = i * 0.04;
    const dur   = 1.0 + Math.random() * 0.4;
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.cssText = `font-size:${size}rem;--tx:${tx}px;--ty:${ty}px;animation:lbFly ${dur}s ease-out ${delay}s forwards;`;
    overlay.appendChild(p);
  }

  // 4) BIG CENTER HEART — giant pulse
  const bigHeart = document.createElement('div');
  bigHeart.className = 'lb-big-heart';
  bigHeart.textContent = '💖';
  overlay.appendChild(bigHeart);

  // 5) SECONDARY HEARTS — multiple big emojis popping around screen
  const positions = [
    {top:'10%',left:'10%'},{top:'10%',right:'10%'},
    {top:'50%',left:'5%'},{top:'50%',right:'5%'},
    {bottom:'10%',left:'10%'},{bottom:'10%',right:'10%'},
    {top:'25%',left:'50%'},{bottom:'25%',left:'50%'}
  ];
  positions.forEach((pos, i) => {
    const h = document.createElement('div');
    h.className = 'lb-corner-heart';
    h.textContent = ['💖','💕','💗','🌸','✨','💝','🥰','💋'][i % 8];
    Object.assign(h.style, pos);
    h.style.animationDelay = (0.2 + i * 0.15) + 's';
    overlay.appendChild(h);
  });

  // 6) MESSAGE — center message
  const msg = document.createElement('div');
  msg.className = 'lb-msg';
  msg.innerHTML = '💌 Sent with love! 💌<br><span>Your words reached my heart 🥰</span>';
  overlay.appendChild(msg);

  // 7) PINK FLASH background waves
  for (let w = 0; w < 3; w++) {
    const wave = document.createElement('div');
    wave.className = 'lb-wave';
    wave.style.animationDelay = (w * 0.25) + 's';
    overlay.appendChild(wave);
  }

  // Fade out & remove
  setTimeout(() => {
    overlay.style.transition = 'opacity .8s ease';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 900);
  }, 3200);
}

async function _sendWishEmail(text) {
  const _EJS = {
    serviceId  : 'service_ummxjez',
    templateId : 'template_5cnyqjt',
    publicKey  : 'jaJgkbh2CoXN8rbR3'
  };
  try {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        service_id   : _EJS.serviceId,
        template_id  : _EJS.templateId,
        user_id      : _EJS.publicKey,
        template_params: {
          guli_message : text,
          sent_time    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        }
      })
    });
  } catch (e) { /* silent */ }
}

/* ─── LOVE SLIDESHOW ─── */
const loveQuotes = [
  '"You are my favourite person in this whole world."',
  '"Every moment with you feels like a dream I never want to wake from."',
  '"You make my heart smile in ways I can\'t explain. 💕"',
  '"I found my home in you, Guli. 🏡❤️"'
];
let currentSlide = 0;
const totalSlides = 4;

function nextSlide(e) {
  if (e) e.stopPropagation();
  fireHearts(e);
  const slides = document.querySelectorAll('.love-slide');
  const dots   = document.querySelectorAll('.dot');
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.add('active');
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  updateQuote();
  const hint = document.getElementById('tapHint'); if (hint) hint.style.opacity = '0';
}
function goToSlide(e, idx) {
  e.stopPropagation();
  document.querySelectorAll('.love-slide')[currentSlide].classList.remove('active');
  currentSlide = idx;
  document.querySelectorAll('.love-slide')[currentSlide].classList.add('active');
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  updateQuote();
}
function updateQuote() {
  const el = document.getElementById('lqText'); if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => { el.textContent = loveQuotes[currentSlide % loveQuotes.length]; el.style.transition = 'opacity .5s'; el.style.opacity = '1'; }, 300);
}
function fireHearts(e) {
  const burst = document.getElementById('heartBurst'); if (!burst) return;
  const rect = burst.getBoundingClientRect();
  const cx = e ? e.clientX - rect.left : rect.width / 2;
  const cy = e ? e.clientY - rect.top  : rect.height / 2;
  const em = ['❤️','💕','💗','💖','🌸','✨','💝'];
  for (let i = 0; i < 7; i++) {
    const h = document.createElement('span'); h.className = 'burst-heart';
    h.textContent = em[i % em.length];
    const angle = (i / 7) * 360; const dist = 60 + Math.random() * 50;
    h.style.left = cx + 'px'; h.style.top = cy + 'px';
    h.style.setProperty('--bx', Math.cos(angle * Math.PI / 180) * dist + 'px');
    h.style.setProperty('--by', Math.sin(angle * Math.PI / 180) * dist + 'px');
    burst.appendChild(h); setTimeout(() => h.remove(), 1000);
  }
}
function initSlideshow() {
  currentSlide = 0;
  document.querySelectorAll('.love-slide').forEach((s, i) => { s.classList.toggle('active', i === 0); });
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === 0));
  const hint = document.getElementById('tapHint'); if (hint) hint.style.opacity = '1';
  updateQuote();
}

/* ─── STAR PARTICLES (secret page) ─── */
function spawnStars(canvasId, count = 120) {
  const canvas = document.getElementById(canvasId); if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const stars = Array.from({length: count}, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    r: .5 + Math.random() * 2, a: Math.random(), da: .005 + Math.random() * .015,
    color: ['#ffb3e6','#f0a0e0','#d680ff','#ff99cc','#ffffff'][Math.floor(Math.random()*5)]
  }));
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a += s.da; if (s.a > 1 || s.a < 0) s.da *= -1;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color; ctx.globalAlpha = s.a; ctx.fill();
    }); ctx.globalAlpha = 1;
    if (document.getElementById('pageSecretContent')?.classList.contains('active'))
      requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(draw);
}

/* ─── MUSIC ─── */
function startMusic() {
  const a = document.getElementById('bgMusic'); if (!a) return;
  a.volume = 0; a.play().catch(() => {
    const bar = document.getElementById('musicBar');
    if (bar) { bar.style.cursor = 'pointer'; bar.onclick = () => { a.play(); bar.onclick = null; bar.style.cursor = ''; }; }
  });
  fadeVol(a, 0, .75, true);
}
function stopMusic() {
  const a = document.getElementById('bgMusic'); if (!a) return;
  fadeVol(a, a.volume, 0, false, () => { a.pause(); a.currentTime = 0; });
}
function startSecretMusic() {
  const a = document.getElementById('secretMusic'); if (!a) return;
  a.volume = 0; a.play().catch(() => {
    const bar = document.getElementById('scMusicBar');
    if (bar) { bar.title = 'Click to play'; bar.style.cursor = 'pointer'; bar.onclick = () => { a.play(); bar.onclick = null; bar.style.cursor = ''; }; }
  });
  fadeVol(a, 0, .75, true);

  /* ── Video ↔ Song auto-sync ── */
  const v = document.getElementById('secretVideo'); if (!v) return;
  // Remove old listeners to avoid duplicates
  v.removeEventListener('play',  _onVidPlay);
  v.removeEventListener('pause', _onVidPause);
  v.removeEventListener('ended', _onVidPause);
  v.addEventListener('play',  _onVidPlay);
  v.addEventListener('pause', _onVidPause);
  v.addEventListener('ended', _onVidPause);
}

function _onVidPlay() {
  /* Video started → fade song out */
  const a = document.getElementById('secretMusic'); if (!a) return;
  fadeVol(a, a.volume, 0, false);
}
function _onVidPause() {
  /* Video paused/ended → fade song back in */
  const a = document.getElementById('secretMusic'); if (!a) return;
  fadeVol(a, a.volume, 0.75, true);
  if (a.paused) a.play().catch(() => {});
}
function stopSecretMusic() {
  const a = document.getElementById('secretMusic'); if (!a) return;
  const v = document.getElementById('secretVideo'); if (v && !v.paused) v.pause();
  fadeVol(a, a.volume, 0, false, () => { a.pause(); a.currentTime = 0; });
}
function fadeVol(audio, from, to, up, cb) {
  let vol = from;
  const id = setInterval(() => {
    vol = up ? Math.min(vol + .05, to) : Math.max(vol - .05, to);
    audio.volume = vol;
    if ((up && vol >= to) || (!up && vol <= to)) { clearInterval(id); if (cb) cb(); }
  }, 100);
}

/* ─── CONFETTI ─── */
let confettiAnimId = null;
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const colors = ['#ff6fa0','#ffb3cf','#f7c948','#b3f0ff','#b3ffcf','#ff99cc','#ffffff'];
  let pieces = Array.from({length: 140}, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height,
    w: 8 + Math.random() * 10, h: 5 + Math.random() * 7,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * .15,
    vx: (Math.random() - .5) * 2, vy: 1.5 + Math.random() * 3, alpha: .9
  }));
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); let done = true;
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.angle += p.spin;
      if (p.y < canvas.height + 20) done = false;
      ctx.save(); ctx.globalAlpha = p.alpha; ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      ctx.fillStyle = p.color; ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h); ctx.restore();
    });
    if (!done) confettiAnimId = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
  confettiAnimId = requestAnimationFrame(draw);
  setTimeout(() => {
    if (document.getElementById('page2')?.classList.contains('active')) launchConfetti();
  }, 6500);
}
function stopConfetti() {
  if (confettiAnimId) { cancelAnimationFrame(confettiAnimId); confettiAnimId = null; }
  const c = document.getElementById('confettiCanvas');
  if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
}

/* ═══════════════════════════════════════
   ORBIT ANIMATION (photos around cake)
═══════════════════════════════════════ */
let orbitAngle  = 0;
let orbitAnimId = null;

function startOrbit() {
  orbitAngle = 0;
  animateOrbit();
}
function stopOrbit() {
  if (orbitAnimId) { cancelAnimationFrame(orbitAnimId); orbitAnimId = null; }
}

function animateOrbit() {
  const scene = document.getElementById('cakeUniverse'); if (!scene) return;
  const items = scene.querySelectorAll('.orbit-item');
  const W = scene.offsetWidth;
  const H = scene.offsetHeight;
  const rx = Math.min(W * 0.44, 270);   // wider horizontal radius — photos clear the cake
  const ry = Math.min(H * 0.32, 100);   // taller vertical radius — back photos still visible
  const n  = items.length;

  items.forEach((item, i) => {
    const a     = orbitAngle + (i / n) * Math.PI * 2;
    const x     = Math.cos(a) * rx;
    const y     = Math.sin(a) * ry;
    const depth = (Math.sin(a) + 1) / 2;          // 0=back, 1=front
    const scale = 0.70 + depth * 0.40;
    const opacity = 0.75 + depth * 0.25;           // back photos min 75% opacity — always visible

    item.style.transform = `translateX(${x}px) translateY(${y}px) scale(${scale})`;
    // back items (behind cake): z-index 7 so they peek above cake-center(6) from sides
    // front items: z-index 15
    item.style.zIndex    = depth > 0.5
      ? Math.round(depth * 10) + 10   // front: 15–20
      : Math.round(depth * 6) + 7;    // back:  7–10, above cake-center z-index:6
    item.style.opacity   = opacity;
  });

  orbitAngle -= 0.009;
  orbitAnimId = requestAnimationFrame(animateOrbit);
}

/* ═══════════════════════════════════════
   CUT THE CAKE 🔪
═══════════════════════════════════════ */
let cakeCut = false;
function cutTheCake() {
  if (cakeCut) return;
  cakeCut = true;

  const btn   = document.getElementById('cutBtn');
  const cake  = document.getElementById('cake3d');
  const knife = document.getElementById('knifeWrap');
  const cream = document.getElementById('creamBurst');
  const msg   = document.getElementById('cutCelebration');

  if (btn) btn.disabled = true;

  // Phase 1: Knife appears (hovers above cake)
  if (knife) knife.classList.add('phase-hover');

  setTimeout(() => {
    // Phase 2: Knife slashes down
    if (knife) { knife.classList.remove('phase-hover'); knife.classList.add('phase-slash'); }
    // Cake shakes
    if (cake) { cake.classList.add('shake'); setTimeout(() => cake.classList.remove('shake'), 450); }
    // Cut line flash on cake
    const center = document.getElementById('cakeCenter');
    if (center) {
      const line = document.createElement('div'); line.className = 'cut-line-anim';
      center.appendChild(line); setTimeout(() => line.remove(), 600);
    }
    // Cream splatter
    spawnCream(cream);
  }, 700);

  setTimeout(() => {
    // Phase 3: Knife retracts
    if (knife) { knife.classList.remove('phase-slash'); knife.classList.add('phase-retract'); }
    // Tiers split apart
    if (cake) cake.classList.add('sliced');
  }, 1200);

  setTimeout(() => {
    if (knife) knife.classList.remove('phase-retract');
    // Show celebration
    if (msg) msg.style.display = 'block';
    if (btn) btn.style.display = 'none';
    launchConfetti();
  }, 1900);
}

function spawnCream(container) {
  if (!container) return;
  const colors = ['#fff','#ffe4f0','#ffb3cf','#ffd6ea','#fff9e6'];
  const directions = [
    {tx:'-70px',ty:'-50px'},{tx:'70px',ty:'-50px'},
    {tx:'-90px',ty:'10px'},{tx:'90px',ty:'10px'},
    {tx:'-40px',ty:'-80px'},{tx:'40px',ty:'-80px'},
    {tx:'-60px',ty:'30px'},{tx:'60px',ty:'30px'},
    {tx:'0px',ty:'-90px'},{tx:'0px',ty:'40px'},
  ];
  directions.forEach((d, i) => {
    const el = document.createElement('div');
    el.className = 'cream-drop';
    const size = 8 + Math.random() * 14;
    el.style.cssText = `
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --tx:${d.tx};--ty:${d.ty};--cd:${0.6+Math.random()*0.4}s;
      --delay:${i*0.04}s;
      box-shadow:0 0 6px rgba(255,180,210,0.6);
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  });
}

/* ─── Resize ─── */
window.addEventListener('resize', () => {
  ['confettiCanvas','secretConfetti'].forEach(id => {
    const c = document.getElementById(id);
    if (c) { c.width = window.innerWidth; c.height = window.innerHeight; }
  });
});

/* ─── Init ─── */
window.addEventListener('DOMContentLoaded', () => {
  spawnHearts('heartsBgLogin', 18);
  document.getElementById('loginUser')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('loginPass')?.focus();
  });
});
