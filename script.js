document.addEventListener('DOMContentLoaded', () => {
  // Carousel Data
  const slidesData = [
    { img: 'cloth1.jpg', caption: 'New Season Edit' },
    { img: 'cloth2.jpg', caption: 'Minimalist Layers' },
    { img: 'cloth3.jpg', caption: 'Street Luxe' }
  ];

  const container = document.getElementById('carouselSlides');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  let currentIndex = 0;
  let autoInterval;

  function buildCarousel() {
    if(!container) return;
    slidesData.forEach((slide, idx) => {
      const slideDiv = document.createElement('div');
      slideDiv.classList.add('carousel-slide');
      slideDiv.innerHTML = `<img src="${slide.img}" alt="fashion slide"><div class="slide-caption">${slide.caption}</div>`;
      container.appendChild(slideDiv);
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.dataset.index = idx;
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      if(i === currentIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  function goToSlide(index) {
    if(!container) return;
    const slides = document.querySelectorAll('.carousel-slide');
    if(index >= slides.length) index = 0;
    if(index < 0) index = slides.length-1;
    currentIndex = index;
    const offset = -currentIndex * 100;
    container.style.transform = `translateX(${offset}%)`;
    updateDots();
    resetAutoPlay();
  }

  function nextSlide() { goToSlide(currentIndex+1); }
  function prevSlide() { goToSlide(currentIndex-1); }

  function startAutoPlay() { autoInterval = setInterval(() => nextSlide(), 5000); }
  function resetAutoPlay() { if(autoInterval) clearInterval(autoInterval); startAutoPlay(); }

  if(container && slidesData.length) {
    buildCarousel();
    startAutoPlay();
    if(prevBtn) prevBtn.addEventListener('click', prevSlide);
    if(nextBtn) nextBtn.addEventListener('click', nextSlide);
    const carouselContainer = document.querySelector('.carousel-container');
    if(carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => clearInterval(autoInterval));
      carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
  }

  // Mobile nav toggle (global)
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navUl = document.querySelector('.main-nav ul');
  if(toggleBtn && navUl) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navUl.classList.toggle('show-mobile');
    });
    document.addEventListener('click', (e) => {
      if(!navUl.contains(e.target) && !toggleBtn.contains(e.target) && navUl.classList.contains('show-mobile')) {
        navUl.classList.remove('show-mobile');
      }
    });
  }

  // Smooth scroll & fade-up already in CSS — add scroll reveal for extra polish
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.style.animationPlayState = 'running';
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => { el.style.animationPlayState = 'paused'; observer.observe(el); });
});