document.addEventListener('DOMContentLoaded', () => {
  // ===== DARK MODE TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme');

  // Apply saved theme on load
  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    if (themeToggle) {
      themeToggle.classList.remove('fa-moon');
      themeToggle.classList.add('fa-sun');
    }
  } else {
    document.body.classList.remove('dark');
    if (themeToggle) {
      themeToggle.classList.remove('fa-sun');
      themeToggle.classList.add('fa-moon');
    }
  }

  // Toggle function
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  // Carousel Data with separate links per slide
  const slidesData = [
    { 
      img: 'banner.png', 
      caption: 'Decluttered/pre-loved(From ₱40 to ₱70)',
      link: 'gallery.html?cat=new'      // separate link for slide 1
    },
    { 
      img: 'banner2.png', 
      caption: 'Decluttered/pre-loved(From ₱30 to ₱100)',
      link: 'gallery2.html?cat=minimal'   // separate link for slide 2
    },  
    { 
      img: 'cloth3.jpg', 
      caption: 'Decluttered/pre-loved(From ₱40 to ₱70)',
      link: 'gallery3.html?cat=street'    // separate link for slide 3
    }
  ];

  const container = document.getElementById('carouselSlides');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  let currentIndex = 0;
  let autoInterval;

  function buildCarousel() {
    if (!container) return;
    slidesData.forEach((slide, idx) => {
      const slideDiv = document.createElement('div');
      slideDiv.classList.add('carousel-slide');

      // Create a link with the unique URL for this slide
      const link = document.createElement('a');
      link.href = slide.link;
      link.style.display = 'block';
      link.style.width = '100%';
      link.style.height = '100%';
      link.style.textDecoration = 'none';
      link.style.color = 'inherit';

      // Add image and caption inside the link
      const img = document.createElement('img');
      img.src = slide.img;
      img.alt = 'fashion slide';
      img.style.width = '100%';
      img.style.display = 'block';

      const captionDiv = document.createElement('div');
      captionDiv.classList.add('slide-caption');
      captionDiv.textContent = slide.caption;

      link.appendChild(img);
      link.appendChild(captionDiv);
      slideDiv.appendChild(link);
      container.appendChild(slideDiv);

      // Create dot
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.dataset.index = idx;
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
      });
      dotsContainer.appendChild(dot);
    });
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      if (i === currentIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  function goToSlide(index) {
    if (!container) return;
    const slides = document.querySelectorAll('.carousel-slide');
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    currentIndex = index;
    const offset = -currentIndex * 100;
    container.style.transform = `translateX(${offset}%)`;
    updateDots();
    resetAutoPlay();
  }

  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }

  function startAutoPlay() { autoInterval = setInterval(() => nextSlide(), 5000); }
  function resetAutoPlay() { if (autoInterval) clearInterval(autoInterval); startAutoPlay(); }

  if (container && slidesData.length) {
    buildCarousel();
    startAutoPlay();
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => clearInterval(autoInterval));
      carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
  }

  // Mobile nav toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navUl = document.querySelector('.main-nav ul');
  if (toggleBtn && navUl) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navUl.classList.toggle('show-mobile');
    });
    document.addEventListener('click', (e) => {
      if (!navUl.contains(e.target) && !toggleBtn.contains(e.target) && navUl.classList.contains('show-mobile')) {
        navUl.classList.remove('show-mobile');
      }
    });
  }

  // Scroll reveal
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
});
// ------------------------------
    // 2. FEATURED FADE CAROUSEL (minimalist & modern)
    // ------------------------------
    const categoriesData = [
      { img: "cloth1.jpg", title: "decluttered/pre-loved", desc: "Urban essentials · from 40₱" },
      { img: "cloth2.jpg", title: "decluttered/pre-loved", desc: "Glamorous silhouettes · from 55₱" },
      { img: "cloth3.jpg", title: "decluttered/pre-loved", desc: "Effortless daily style · from 45₱" },
      { img: "cloth4.jpg", title: "decluttered/pre-loved", desc: "Clean & versatile staples" },
      { img: "cloth5.jpg", title: "decluttered/pre-loved", desc: "Warm & relaxed textures" }
    ];

    const fadeContainer = document.getElementById('fadeCarouselContainer');
    const fadePrev = document.getElementById('fadePrevBtn');
    const fadeNext = document.getElementById('fadeNextBtn');
    const fadeDotsWrap = document.getElementById('fadeDots');
    let currentFadeIndex = 0;
    let fadeSlides = [];
    let autoFadeInterval;
     function buildFadeCarousel() {
      fadeContainer.innerHTML = '';
      categoriesData.forEach((cat, idx) => {
        const slide = document.createElement('div');
        slide.className = 'fade-slide';
        if (idx === 0) slide.classList.add('active');
        slide.innerHTML = `
          <div class="slide-image">
            <img src="${cat.img}" alt="${cat.title}" onerror="this.src='https://placehold.co/800x600?text=K%26C+Style'">
          </div>
          <div class="slide-caption">
            <h3>${cat.title}</h3>
            <p>${cat.desc}</p>
          </div>
        `;
        fadeContainer.appendChild(slide);
      });
      fadeSlides = document.querySelectorAll('.fade-slide');
      updateFadeDots();
    }
function updateFadeDots() {
      fadeDotsWrap.innerHTML = '';
      categoriesData.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('fade-dot');
        if (i === currentFadeIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
          if (autoFadeInterval) clearInterval(autoFadeInterval);
          goToFadeSlide(i);
          startAutoFade();
        });
        fadeDotsWrap.appendChild(dot);
      });
    }

    function goToFadeSlide(index) {
      if (index === currentFadeIndex) return;
      fadeSlides[currentFadeIndex]?.classList.remove('active');
      currentFadeIndex = index;
      fadeSlides[currentFadeIndex]?.classList.add('active');
      // update dots active style
      const dots = document.querySelectorAll('.fade-dot');
      dots.forEach((dot, i) => {
        if (i === currentFadeIndex) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    }
    function nextFade() {
      let nextIdx = (currentFadeIndex + 1) % categoriesData.length;
      goToFadeSlide(nextIdx);
    }
    function prevFade() {
      let prevIdx = (currentFadeIndex - 1 + categoriesData.length) % categoriesData.length;
      goToFadeSlide(prevIdx);
    }

    function startAutoFade() {
      if (autoFadeInterval) clearInterval(autoFadeInterval);
      autoFadeInterval = setInterval(() => {
        nextFade();
      }, 4800);
    }

    if (fadePrev && fadeNext) {
      fadePrev.addEventListener('click', () => {
        if (autoFadeInterval) clearInterval(autoFadeInterval);
        prevFade();
        startAutoFade();
      });
      fadeNext.addEventListener('click', () => {
        if (autoFadeInterval) clearInterval(autoFadeInterval);
        nextFade();
        startAutoFade();
      });
      }

    buildFadeCarousel();
    startAutoFade();

    // Pause auto-fade on hover for better UX (minimalist detail)
    const fadeWrapper = document.querySelector('.fade-carousel-wrapper');
    if (fadeWrapper) {
      fadeWrapper.addEventListener('mouseenter', () => {
        if (autoFadeInterval) clearInterval(autoFadeInterval);
      });
      fadeWrapper.addEventListener('mouseleave', () => {
        startAutoFade();
      });
    }

    // Optional: image fallback for local images if missing
    const allCatImages = document.querySelectorAll('.slide-image img');
    allCatImages.forEach(img => {
      img.addEventListener('error', function() {
        this.src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format';
      });
    });
    