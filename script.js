// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightNavLink();
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ===========================
// ACTIVE NAV HIGHLIGHT
// ===========================
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ===========================
// TYPEWRITER EFFECT
// ===========================
const roles = [
  'CSE Engineer 💻',
  'Full Stack Developer 🌐',
  'Problem Solver 🧠',
  'Tech Enthusiast 🚀',
  'Open Source Contributor 🛠️'
];
let rIdx = 0, cIdx = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const current = roles[rIdx];
  typeEl.textContent = isDeleting
    ? current.slice(0, --cIdx)
    : current.slice(0, ++cIdx);

  if (!isDeleting && cIdx === current.length) {
    setTimeout(() => { isDeleting = true; }, 1800);
  } else if (isDeleting && cIdx === 0) {
    isDeleting = false;
    rIdx = (rIdx + 1) % roles.length;
  }
  setTimeout(type, isDeleting ? 60 : 110);
}
type();

// ===========================
// SCROLL REVEAL
// ===========================
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ===========================
// CONTACT FORM
// ===========================
function handleSubmit(e) {
  e.preventDefault();
  
  const honey = e.target.querySelector('input[name="_honey"]').value;
  if (honey) return; // Ignore spam

  const btn = e.target.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');

  btn.textContent = 'Sending...';
  btn.disabled = true;
  successMsg.classList.remove('show');
  errorMsg.classList.remove('show');

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  delete data._honey;

  fetch("https://formsubmit.co/ajax/cyuvarajsamynath@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
      _subject: "New message from my portfolio",
      _template: "table",
      _captcha: "false"
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success === true || data.success === "true") {
      successMsg.classList.add('show');
      e.target.reset();
    } else {
      throw new Error('Submission failed');
    }
  })
  .catch(error => {
    errorMsg.innerHTML = '❌ Failed to send message. Please email me directly at <a href="mailto:cyuvarajsamynath@gmail.com">cyuvarajsamynath@gmail.com</a>.';
    errorMsg.classList.add('show');
  })
  .finally(() => {
    setTimeout(() => {
      successMsg.classList.remove('show');
      errorMsg.classList.remove('show');
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
    }, 4000);
  });
}

// ===========================
// CERTIFICATE MODAL
// ===========================
const modal = document.getElementById('cert-modal');
const modalImg = document.getElementById('cert-img');
const closeBtn = document.querySelector('.modal-close');
const viewBtns = document.querySelectorAll('.cert-badge');

if (modal && modalImg) {
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalImg.src = btn.getAttribute('data-img');
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
  });
}

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
