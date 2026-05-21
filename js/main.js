/* ============================================================
   ABS PORTFOLIO — main.js
   Abdul Batin Sahib
   ============================================================ */
 
/* ── CUSTOM CURSOR ── */
const cur  = document.getElementById('cur');
const curr = document.getElementById('curr');
 
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
  setTimeout(() => {
    curr.style.left = e.clientX + 'px';
    curr.style.top  = e.clientY + 'px';
  }, 70);
});
 
/* ── SCROLL PROGRESS BAR ── */
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('pgbar').style.width = pct + '%';
});
 
/* ── FADE-UP ON SCROLL ── */
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 70);
    }
  });
}, { threshold: 0.08 });
 
document.querySelectorAll('.fu').forEach(el => obs.observe(el));
 
/* ── LIGHTBOX ── */
function openLightbox(src, title, sub) {
  document.getElementById('lb-img').src           = src;
  document.getElementById('lb-title').textContent = title;
  document.getElementById('lb-sub').textContent   = sub;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
 
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
 
/* ── CONTACT FORM — EmailJS ── */
(function () {
  emailjs.init('CwVXOAPi3yWPvI3r9');
})();
 
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
 
  const btn     = document.getElementById('send-btn');
  const status  = document.getElementById('form-status');
 
  // get values
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();
 
  // simple validation
  if (!name || !email || !subject || !message) {
    showStatus('error', '⚠️ Please fill in all fields.');
    return;
  }
 
  // loading state
  btn.disabled     = true;
  btn.textContent  = 'Sending…';
 
  const templateParams = {
    name:    name,
    email:   email,
    title:   subject,
    message: message,
  };
 
  emailjs.send('service_cqltu99', 'template_b760ei2', templateParams)
    .then(() => {
      showStatus('success', '✅ Message sent! I\'ll get back to you soon.');
      document.getElementById('contact-form').reset();
      btn.textContent = 'Send Message →';
      btn.disabled    = false;
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      showStatus('error', '❌ Something went wrong. Please try again or email me directly.');
      btn.textContent = 'Send Message →';
      btn.disabled    = false;
    });
});
 
function showStatus(type, msg) {
  const status = document.getElementById('form-status');
  status.textContent  = msg;
  status.className    = 'form-status ' + type;
  status.style.display = 'block';
  setTimeout(() => { status.style.display = 'none'; }, 6000);
}