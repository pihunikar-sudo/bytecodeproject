// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if(hamburger) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

function revealOnScroll() {
      document.querySelectorAll('.reveal').forEach(el=>{
        const windowHeight=window.innerHeight;
        const revealTop=el.getBoundingClientRect().top;
        if(revealTop<windowHeight-100){el.classList.add("active");}
      });
    }
    window.addEventListener("scroll", revealOnScroll);

    // Dark Mode Toggle
function toggleDarkMode(){
  document.body.classList.toggle("dark");
}

// Scroll-to-top Button
let scrollBtn=document.getElementById("scrollTopBtn");
window.onscroll=function(){
  if(document.body.scrollTop>200 || document.documentElement.scrollTop>200){
    scrollBtn.style.display="block";
  } else {
    scrollBtn.style.display="none";
  }
};
function scrollToTop(){
  window.scrollTo({top:0, behavior:"smooth"});
}

/* Slider: simple responsive carousel with autoplay, nav and dots */
(function(){
  const slider = document.getElementById('mainSlider');
  if(!slider) return;
  const slidesContainer = slider.querySelector('.slides');
  const slides = Array.from(slidesContainer.children);
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');
  const dotsContainer = slider.querySelector('.slider-dots');
  let current = 0;
  let interval = null;

  function createDots(){
    slides.forEach((_,i)=>{
      const d = document.createElement('button');
      d.className = 'dot';
      d.setAttribute('aria-label','Go to slide '+(i+1));
      d.addEventListener('click', ()=> goTo(i));
      dotsContainer.appendChild(d);
    });
    updateDots();
  }

  function updateDots(){
    Array.from(dotsContainer.children).forEach((d,i)=> d.classList.toggle('active', i===current));
  }

  function goTo(index){
    current = (index + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(-${current*100}%)`;
    updateDots();
  }

  function next(){ goTo(current+1); }
  function prev(){ goTo(current-1); }

  function startAutoplay(){ stopAutoplay(); interval = setInterval(next, 5000); }
  function stopAutoplay(){ if(interval) { clearInterval(interval); interval = null; } }

  prevBtn.addEventListener('click', ()=>{ prev(); stopAutoplay(); startAutoplay(); });
  nextBtn.addEventListener('click', ()=>{ next(); stopAutoplay(); startAutoplay(); });
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // touch support
  let touchStartX = 0;
  slidesContainer.addEventListener('touchstart', e=> touchStartX = e.changedTouches[0].clientX);
  slidesContainer.addEventListener('touchend', e=> {
    const touchEndX = e.changedTouches[0].clientX;
    if(touchEndX + 50 < touchStartX) next();
    else if(touchEndX - 50 > touchStartX) prev();
  });

  createDots();
  goTo(0);
  startAutoplay();
})();

