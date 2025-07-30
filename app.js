// Small enhancements: active nav, modal, tilt, reveal
const links = document.querySelectorAll('.nav-link');
links.forEach(l => l.addEventListener('click', e => {
  links.forEach(n => n.classList.remove('active'));
  e.currentTarget.classList.add('active');
}));

// Smooth scroll to anchors
document.querySelectorAll('a.nav-link[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el){
      e.preventDefault();
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  });
});

// Modal behavior
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
document.querySelectorAll('[data-open]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('data-open').replace('p','');
    modalImg.src = `assets/thumb${id}.svg`;
    modalTitle.textContent = link.querySelector('h3')?.textContent || 'Case study';
    modalDesc.textContent = 'High-level notes about the process, tools, and decisions.';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
modal.querySelector('.modal__close').addEventListener('click', () => {
  modal.classList.remove('open');
  document.body.style.overflow = '';
});
modal.querySelector('.modal__backdrop').addEventListener('click', () => {
  modal.classList.remove('open');
  document.body.style.overflow = '';
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Subtle tilt on hover for depth
document.querySelectorAll('[data-tilt]').forEach(card => {
  let rAF;
  const onMove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - .5) * -4;
    const ry = ((x / rect.width) - .5) * 6;
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  };
  const reset = () => card.style.transform = '';
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', reset);
});

// Elevate header on scroll
const header = document.querySelector('[data-elevate]');
let lastY = 0;
document.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.style.boxShadow = y > 8 ? '0 10px 24px rgba(0,0,0,0.08)' : 'none';
  lastY = y;
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0px)';
      io.unobserve(entry.target);
    }
  });
}, {threshold: 0.1});
document.querySelectorAll('.card').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(8px)';
  io.observe(el);
});
