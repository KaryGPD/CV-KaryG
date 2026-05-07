/* =========================================
   KARINA RAMOS GARCÍA — main.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. ANIMACIÓN AL HACER SCROLL (Intersection Observer)
  ------------------------------------------ */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elementos que se animarán
  const animatedEls = document.querySelectorAll(
    '.about-text, .about-pills, .pill, .nav-card, .section-title, .section-label'
  );

  animatedEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.06}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s`;
    observer.observe(el);
  });

  // Clase que activa la animación
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>
  `);

  /* ------------------------------------------
     2. EFECTO PARALLAX SUAVE EN EL HERO
  ------------------------------------------ */
  const heroBg = document.querySelector('.hero-bg');
  const heroCard = document.querySelector('.hero-card');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
    if (heroCard) {
      heroCard.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
  }, { passive: true });

  /* ------------------------------------------
     3. TOPBAR: cambia estilo al hacer scroll
  ------------------------------------------ */
  const topbar = document.querySelector('.topbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      topbar.style.background = 'rgba(11,31,58,0.95)';
      topbar.style.backdropFilter = 'blur(12px)';
      topbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
      topbar.style.transition = 'all 0.3s ease';
    } else {
      topbar.style.background = 'transparent';
      topbar.style.backdropFilter = 'none';
      topbar.style.boxShadow = 'none';
    }
  }, { passive: true });

  /* ------------------------------------------
     4. HOVER MAGNÉTICO EN LAS CARDS
  ------------------------------------------ */
  const cards = document.querySelectorAll('.nav-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * 6;
      const tiltY = -(x / rect.width) * 6;
      card.style.transform = `translateY(-8px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      card.style.perspective = '800px';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  });

  /* ------------------------------------------
     5. PILLS: animación escalonada especial
  ------------------------------------------ */
  const pills = document.querySelectorAll('.pill');
  pills.forEach((pill, i) => {
    pill.style.transitionDelay = `${0.3 + i * 0.05}s`;
  });

  /* ------------------------------------------
     6. SMOOTH SCROLL para los enlaces internos
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ------------------------------------------
     7. CARGA DE FOTO: si hay imagen, oculta placeholder
  ------------------------------------------ */
  const photo = document.querySelector('.photo-frame img');
  const placeholder = document.querySelector('.photo-placeholder');

  if (photo && placeholder) {
    photo.addEventListener('load', () => {
      placeholder.style.display = 'none';
      photo.style.display = 'block';
    });

    photo.addEventListener('error', () => {
      photo.style.display = 'none';
      placeholder.style.display = 'flex';
    });
  }

});
