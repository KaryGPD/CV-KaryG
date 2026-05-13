/* =========================================
   EXPERIENCIA LABORAL — experiencia.js v4
   Con carruseles de información y fotos
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. GALERÍA DEL HERO */
  const photoBandTrack = document.getElementById('photoBandTrack');
  
  function loadHeroGallery() {
    const heroImages = ['hero-1.jpg', 'hero-2.jpg', 'hero-3.jpg', 'hero-4.jpg', 'hero-5.jpg'];
    photoBandTrack.innerHTML = '';
    
    heroImages.forEach(img => {
      const item = document.createElement('img');
      item.src = `img/hero/${img}`;
      item.alt = 'Galería de evidencias';
      item.className = 'band-item';
      photoBandTrack.appendChild(item);
    });

    heroImages.forEach(img => {
      const item = document.createElement('img');
      item.src = `img/hero/${img}`;
      item.alt = 'Galería de evidencias';
      item.className = 'band-item';
      photoBandTrack.appendChild(item);
    });
  }

  loadHeroGallery();


  /* 2. INICIALIZAR CARRUSELES */
  const carousels = [
    { id: 'carousel-info-utma', isInfo: true },
    { id: 'carousel-utma', isInfo: false },
    { id: 'carousel-info-pedagogia', isInfo: true },
    { id: 'carousel-pedagogia', isInfo: false },
    { id: 'carousel-info-ford', isInfo: true },
    { id: 'carousel-ford', isInfo: false },
    { id: 'carousel-info-utna', isInfo: true },
    { id: 'carousel-utna', isInfo: false },
    { id: 'carousel-info-imaac', isInfo: true },
    { id: 'carousel-imaac', isInfo: false },
    { id: 'carousel-info-televisa', isInfo: true },
    { id: 'carousel-televisa', isInfo: false }
  ];

  carousels.forEach(carousel => {
    initCarousel(carousel.id, carousel.isInfo);
  });

  function initCarousel(carouselId, isInfo = false) {
    const track = document.getElementById(carouselId);
    if (!track) return;

    const slides = track.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById(`${carouselId}-dots`);
    
    if (!slides.length || !dotsContainer) return;

    let currentIndex = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function updateCarousel() {
      const offset = -currentIndex * 100;
      track.style.transform = `translateX(${offset}%)`;

      document.querySelectorAll(`#${carouselId}-dots .carousel-dot`).forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      updateCarousel();
    }

    if (isInfo) {
      window.moveCarouselInfo = function(button, direction) {
        goToSlide(currentIndex + direction);
      };
    } else {
      window.moveCarousel = function(button, direction) {
        goToSlide(currentIndex + direction);
      };
    }

    updateCarousel();
  }


  /* 3. REVEAL ON SCROLL */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* 4. TIMELINE NAV TOGGLE */
  const timelineToggle = document.getElementById('timelineToggle');
  const timelineNav = document.getElementById('timelineNav');

  if (timelineToggle && timelineNav) {
    timelineNav.classList.add('collapsed');
    
    timelineToggle.addEventListener('click', () => {
      timelineNav.classList.toggle('collapsed');
      timelineToggle.classList.toggle('open');
    });

    document.querySelectorAll('.tn-item').forEach(item => {
      item.addEventListener('click', () => {
        timelineNav.classList.add('collapsed');
        timelineToggle.classList.remove('open');
      });
    });
  }


  /* 5. TIMELINE NAV: resaltar sección activa */
  const sections   = document.querySelectorAll('.exp-section');
  const tnItems    = document.querySelectorAll('.tn-item');
  const dots       = document.querySelectorAll('.section-dots .dot');
  const sectionIds = ['utma', 'pedagogia', 'ford', 'utna', 'imaac', 'televisa'];

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const idx = sectionIds.indexOf(id);

        tnItems.forEach(item => item.classList.remove('active'));
        const activeItem = document.querySelector(`.tn-item[href="#${id}"]`);
        if (activeItem) activeItem.classList.add('active');

        dots.forEach(d => d.classList.remove('active'));
        if (dots[idx]) dots[idx].classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => sectionObserver.observe(sec));


  /* 6. HERO DOTS: click → scroll */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(sectionIds[i]);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* 7. TOPBAR SCROLL EFFECT */
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


  /* 8. MENÚ MÓVIL */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }


  /* 9. CONTADOR ANIMADO */
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
    statNum.textContent = '0';
  }

});
