// simple fade-in on scroll
const faders = document.querySelectorAll('.pov, .why, .cta');
const appearOptions = { threshold: 0.1 };
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  fader.style.opacity = 0;
  fader.style.transform = 'translateY(20px)';
  appearOnScroll.observe(fader);
});
