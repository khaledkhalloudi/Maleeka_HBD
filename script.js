const intro = document.getElementById('intro');
const site = document.getElementById('site');
const openButton = document.getElementById('openButton');
const petals = document.getElementById('petals');
const pageCounter = document.getElementById('pageCounter');
const steps = Array.from(document.querySelectorAll('.page-step'));

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
    step.setAttribute('aria-hidden', i === index ? 'false' : 'true');
  });
  if (pageCounter) pageCounter.textContent = `CHAPTER ${String(index + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const active = steps[index];
  if (active) active.querySelectorAll('.reveal').forEach(item => item.classList.add('visible'));
  makePetals(index === 2 ? 12 : 7);
}

openButton.addEventListener('click', () => {
  intro.classList.add('intro-exit');
  window.setTimeout(() => {
    intro.classList.add('hidden');
    site.classList.remove('hidden');
    document.body.classList.add('site-open');
    showStep(0);
  }, 420);
});

document.querySelectorAll('[data-next]').forEach(button => {
  button.addEventListener('click', () => showStep(Number(button.dataset.next)));
});
document.querySelectorAll('[data-prev]').forEach(button => {
  button.addEventListener('click', () => showStep(Number(button.dataset.prev)));
});

function observeReveals() {
  const items = document.querySelectorAll('.reveal:not(.visible)');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

function makePetals(amount = 8) {
  for (let i = 0; i < amount; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = Math.random() > 0.5 ? '✦' : '♥';
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.fontSize = `${8 + Math.random() * 10}px`;
    petal.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    petal.style.animationDuration = `${5 + Math.random() * 6}s`;
    petal.style.animationDelay = `${Math.random() * 2}s`;
    petals.appendChild(petal);
    window.setTimeout(() => petal.remove(), 14000);
  }
}

const wishButton = document.getElementById('wishButton');
const wishCard = document.getElementById('wishCard');
wishButton.addEventListener('click', () => {
  wishCard.classList.remove('hidden');
  wishButton.textContent = 'A wish, just for you ✦';
  wishButton.disabled = true;
  wishCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  makePetals(28);
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');
document.querySelectorAll('.memory').forEach(card => {
  card.addEventListener('click', () => {
    lightboxImage.src = card.dataset.photo;
    lightbox.classList.remove('hidden');
  });
});
function closePhoto() {
  lightbox.classList.add('hidden');
  lightboxImage.src = '';
}
closeLightbox.addEventListener('click', closePhoto);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closePhoto(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closePhoto(); });
