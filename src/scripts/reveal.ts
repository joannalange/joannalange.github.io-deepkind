/**
 * Scroll-reveal — observes elements with class "reveal" and adds
 * "revealed" when they enter the viewport. Stagger delays are applied
 * via "reveal-delay-{n}" CSS classes defined in global.css.
 *
 * Imported once in BaseLayout.astro via <script src="..."> so it runs
 * as a module on every page.
 */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
