const btnMobileNav = document.querySelector('.btn-mobile-nav');
const header = document.querySelector('.header');
btnMobileNav.addEventListener('click', function () {
  header.classList.toggle('nav-open');
});
// set year
const year = document.querySelector('.year');
const currentYear = new Date().getFullYear();
year.textContent = currentYear;

// smooth scrolling
const links = document.querySelectorAll('a:link');
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }
    if (link.classList.contains('nav-link')) {
      header.classList.toggle('nav-open');
    }
  });
});
// Sticky navigation

const sectionHeroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky');
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove('sticky');
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);
obs.observe(sectionHeroEl);

const navList = document.querySelector('.nav-list');
const handleHover = function (e) {
  if (e.target.classList.contains('nav-link')) {
    const link = e.target;
    const siblings = link.closest('.nav-list').querySelectorAll('.nav-link');
    siblings.forEach((sibEl) => {
      if (sibEl !== link) sibEl.style.opacity = this;
    });
  }
};
navList.addEventListener('mouseover', handleHover.bind(0.5));
navList.addEventListener('mouseout', handleHover.bind(1));

// Reveal sections
const allSections = document.querySelectorAll('.section--reveal');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
