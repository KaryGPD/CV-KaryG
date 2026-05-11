/* =========================================
   EXPERIENCIA LABORAL — experiencia.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. REVEAL ON SCROLL
  ------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Escalonar los hijos de la misma sección
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ------------------------------------------
     2. TIMELINE NAV: resaltar sección activa
  ------------------------------------------ */
  const sections   = document.querySelectorAll('.exp-section');
  const tnItems    = document.querySelectorAll('.tn-item');
  const dots       = document.querySelectorAll('.section-dots .dot');
  const sectionIds = ['utma', 'pedagogia', 'ford', 'utna', 'imaac', 'televisa'];

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const idx = sectionIds.indexOf(id);

        // Timeline nav
        tnItems.forEach(item => item.classList.remove('active'));
        const activeItem = document.querySelector(`.tn-item[href="#${id}"]`);
        if (activeItem) activeItem.classList.add('active');

        // Hero dots
        dots.forEach(d => d.classList.remove('active'));
        if (dots[idx]) dots[idx].classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => sectionObserver.observe(sec));


  /* ------------------------------------------
     3. HERO DOTS: click → scroll suave
  ------------------------------------------ */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(sectionIds[i]);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ------------------------------------------
     4. TOPBAR: scroll effect (reutiliza logic de main.js
        pero aseguramos que esté aquí también)
  ------------------------------------------ */
  const topbar = document.getElementById('topbar');
  if (topbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        topbar.style.background     = 'rgba(11,31,58,0.97)';
        topbar.style.backdropFilter = 'blur(14px)';
        topbar.style.boxShadow      = '0 2px 20px rgba(0,0,0,0.3)';
      } else {
        topbar.style.background     = 'transparent';
        topbar.style.backdropFilter = 'none';
        topbar.style.boxShadow      = 'none';
      }
    }, { passive: true });
  }


  /* ------------------------------------------
     5. MENÚ MÓVIL
  ------------------------------------------ */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Cerrar al hacer clic en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }


  /* ------------------------------------------
     6. ANIMACIÓN DE LA BARRA KPI al entrar en viewport
  ------------------------------------------ */
  const kpiFill = document.querySelector('.kpi-fill');
  if (kpiFill) {
    const kpiObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // re-trigger animation
          entry.target.style.animationPlayState = 'running';
          kpiObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    kpiObserver.observe(kpiFill);
  }


  /* ------------------------------------------
     7. CONTADOR ANIMADO del stat de inscritos
  ------------------------------------------ */
  const statNum = document.querySelector('.stat-num');
  if (statNum) {
    const target = 800;
    let current = 0;

    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
            statNum.textContent = '~800';
          } else {
            statNum.textContent = current;
          }
        }, 20);
        counterObserver.unobserve(statNum);
      }
    }, { threshold: 0.8 });

    counterObserver.observe(statNum);
    statNum.textContent = '0'; // empieza en 0
  }

});
