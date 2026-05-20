/* =========================================
   EXPERIENCIA LABORAL — experiencia.js v7
   Con modal de galería en pantalla completa
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================
     1. CARGAR GALERÍA DEL HERO
  ======================================== */
  const photoBandTrack = document.getElementById('photoBandTrack');
  
  function loadHeroGallery() {
    const heroImages = ['hero-1.jpg', 'hero-2.jpg', 'hero-3.jpg', 'hero-4.jpg', 'hero-5.jpg'];
    photoBandTrack.innerHTML = '';
    
    heroImages.forEach(img => {
      const item = document.createElement('img');
      item.src = `img/hero/${img}`;
      item.alt = 'Galería de evidencias';
      item.className = 'band-item';
      item.onerror = function() { this.style.display = 'none'; };
      photoBandTrack.appendChild(item);
    });

    heroImages.forEach(img => {
      const item = document.createElement('img');
      item.src = `img/hero/${img}`;
      item.alt = 'Galería de evidencias';
      item.className = 'band-item';
      item.onerror = function() { this.style.display = 'none'; };
      photoBandTrack.appendChild(item);
    });
  }

  loadHeroGallery();


  /* ========================================
     2. INICIALIZAR CARRUSELES DE INFO
  ======================================== */
  const carouselStates = {};

  function initCarousel(carouselId) {
    const track = document.getElementById(carouselId);
    if (!track) return;

    const slides = track.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById(`${carouselId}-dots`);
    const arrowsContainer = track.parentElement;
    
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

    carouselStates[carouselId] = { goToSlide, currentIndex: () => currentIndex };

    const prevBtn = arrowsContainer.querySelector('.carousel-arrow.prev');
    const nextBtn = arrowsContainer.querySelector('.carousel-arrow.next');

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    updateCarousel();
  }

  const allCarousels = [
    'carousel-info-utma',
    'carousel-info-pedagogia',
    'carousel-info-ford',
    'carousel-info-utna',
    'carousel-info-imaac',
    'carousel-info-televisa'
  ];

  allCarousels.forEach(id => initCarousel(id));


  /* ========================================
     3. FUNCIONES DEL MODAL DE GALERÍA
  ======================================== */
  const galleryData = {
    utma: { name: 'UTMA', count: 5 },
    pedagogia: { name: 'Pedagogía', count: 4 },
    ford: { name: 'Ford CONAUTO', count: 4 },
    utna: { name: 'UTNA', count: 3 },
    imaac: { name: 'IMAAC', count: 3 },
    televisa: { name: 'Televisa', count: 3 }
  };

  let currentGallery = null;
  let currentPhotoIndex = 0;

  window.openGallery = function(section, name) {
    const modal = document.getElementById('galleryModal');
    const track = document.getElementById('galleryTrack');
    const title = document.querySelector('.gallery-title');
    
    currentGallery = section;
    currentPhotoIndex = 0;

    title.textContent = `Galería de fotos ${name}`;
    track.innerHTML = '';

    const count = galleryData[section].count;
    
    for (let i = 1; i <= count; i++) {
      const photoDiv = document.createElement('div');
      photoDiv.className = `gallery-photo ${i === 1 ? 'active' : ''}`;
      
      const img = document.createElement('img');
      img.src = `img/${section}/foto-${i}.jpg`;
      img.alt = `${name} - Foto ${i}`;
      img.onerror = function() {
        photoDiv.innerHTML = `
          <div class="gallery-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p>Imagen no disponible</p>
          </div>
        `;
      };
      photoDiv.appendChild(img);
      track.appendChild(photoDiv);
    }

    document.getElementById('photoTotal').textContent = count;
    document.getElementById('photoCounter').textContent = '1';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeGallery = function() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentGallery = null;
  };

  window.nextGalleryPhoto = function() {
    if (!currentGallery) return;
    const count = galleryData[currentGallery].count;
    currentPhotoIndex = (currentPhotoIndex + 1) % count;
    updateGalleryPhoto();
  };

  window.prevGalleryPhoto = function() {
    if (!currentGallery) return;
    const count = galleryData[currentGallery].count;
    currentPhotoIndex = (currentPhotoIndex - 1 + count) % count;
    updateGalleryPhoto();
  };

  function updateGalleryPhoto() {
    const photos = document.querySelectorAll('.gallery-photo');
    photos.forEach((photo, i) => {
      photo.classList.toggle('active', i === currentPhotoIndex);
    });
    document.getElementById('photoCounter').textContent = currentPhotoIndex + 1;
  }

  // Cerrar modal al clickear fuera
  document.getElementById('galleryModal').addEventListener('click', (e) => {
    if (e.target.id === 'galleryModal') {
      closeGallery();
    }
  });

  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (!modal.classList.contains('active')) return;

    if (e.key === 'ArrowRight') nextGalleryPhoto();
    if (e.key === 'ArrowLeft') prevGalleryPhoto();
    if (e.key === 'Escape') closeGallery();
  });


  /* ========================================
     4. REVEAL ON SCROLL
  ======================================== */
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


  /* ========================================
     5. TIMELINE NAV TOGGLE
  ======================================== */
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


  /* ========================================
     6. TIMELINE NAV: RESALTAR SECCIÓN ACTIVA
  ======================================== */
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


  /* ========================================
     7. HERO DOTS: SCROLL SUAVE
  ======================================== */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(sectionIds[i]);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ========================================
     8. TOPBAR SCROLL EFFECT
  ======================================== */
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


  /* ========================================
     9. MENÚ MÓVIL
  ======================================== */
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


  /* ========================================
     10. CONTADOR ANIMADO (Inscritos)
  ======================================== */
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
