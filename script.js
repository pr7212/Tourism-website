// Booking form submit handler
// - Reads form fields (name, email, phone, date)
// - Validates presence
// - Stores the booking in localStorage under key 'bookings' as a JSON array
// - Shows a brief success message and resets the form
(function(){
  const form = document.getElementById('bookingForm');
  if (!form) return; // safety: page may not include the form

  function readBookings() {
    try {
      const raw = localStorage.getItem('bookings');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      // If localStorage has invalid JSON, reset to a safe default
      return [];
    }
  }

  function writeBookings(bookings) {
    try {
      localStorage.setItem('bookings', JSON.stringify(bookings));
    } catch (_) {
      // Ignore quota / storage errors; UI will still show the message below
    }
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Read values safely from inputs
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const phoneEl = document.getElementById('phone');
    const dateEl = document.getElementById('date');
    const messageEl = document.getElementById('message');

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const date = dateEl ? dateEl.value : '';

    // Basic validation
    if (!name || !email || !date) {
      if (messageEl) {
        messageEl.textContent = 'Please fill in all required fields.';
        messageEl.style.color = '#e74c3c';
      }
      return;
    }

    // Save to localStorage (append to existing array)
    const booking = { name, email, phone, date };
    let bookings = readBookings();
    bookings.push(booking);
    writeBookings(bookings);

    // Feedback to user
    if (messageEl) {
      messageEl.textContent = `Thank you ${name}! Your booking for ${date} has been saved.`;
      messageEl.style.color = '#27ae60';
    }

    // Reset the form fields
    this.reset();
  });
})();

/* --------------------- Additional UI scripts moved from index.html --------------------- */

// Fade-in animation for elements with .fade-in
document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;
  if (!('IntersectionObserver' in window)) {
    // Fallback: if IntersectionObserver isn't supported, just show everything
    fadeEls.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fadeEls.forEach(el => observer.observe(el));
});

// Attraction search/filter: hides non-matching cards
(function(){
  const searchInput = document.querySelector('#attractionSearch');
  if (!searchInput) return;
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.cards .card').forEach(card => {
      const text = (card.textContent || '').toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  });
})();

// Dark mode toggle: toggles `dark-mode` on <body> and swaps icon
(function(){
  const darkToggle = document.querySelector('.dark-toggle');
  if (!darkToggle) return;
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkToggle.innerHTML = document.body.classList.contains('dark-mode')
      ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
})();

// Hero slider: dot controls and auto-advance
(function(){
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  if (!slides.length || !dots.length) return;
  let currentSlide = 0;
  function showSlide(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    currentSlide = idx;
  }
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  setInterval(() => showSlide((currentSlide + 1) % slides.length), 5000);
})();

// Mobile nav toggle: hamburger behavior
(function(){
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.getElementById('mainNav');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });
    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }));
  }
})();












