document.addEventListener('DOMContentLoaded', () => {
  initCalendar();
  initCountdown();
  initCarousels();
  initWishesSlider();
});

// Countdown to wedding: 25.07.2026 16:00
function initCountdown() {
  const weddingDate = new Date('2026-07-25T16:00:00');

  const els = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };
  if (!els.days) return;

  function update() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      els.days.textContent = '0';
      els.hours.textContent = '00';
      els.minutes.textContent = '00';
      els.seconds.textContent = '00';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    els.days.textContent = String(d);
    els.hours.textContent = String(h).padStart(2, '0');
    els.minutes.textContent = String(m).padStart(2, '0');
    els.seconds.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// Calendar - July 2026, highlight 25
function initCalendar() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;

  const daysInMonth = 31;

  /**
   * Важно: тут "смещение" под ваши визуальные ожидания.
   * July 1, 2026 is Wednesday.
   * Если вы хотите чтобы сетка начиналась с воскресенья: offset = 3 (как было у тебя).
   * Если хочешь старт недели с понедельника — поставь 2.
   */
  const firstDayOffset = 2; // 0..6
  const highlightDay = 25;

  // Empty cells for offset
  for (let i = 0; i < firstDayOffset; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day';
    empty.setAttribute('aria-hidden', 'true');
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const day = document.createElement('div');
    day.className = 'calendar-day' + (d === highlightDay ? ' highlight' : '');

    const span = document.createElement('span');
    span.textContent = String(d);

    day.appendChild(span);
    grid.appendChild(day);
  }
}

// Carousels
function initCarousels() {
  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const pagination = carousel.querySelector('.carousel-pagination');

    if (!track || !slides.length) return;

    let current = 0;
    const total = slides.length;

    function update() {
      track.style.transform = `translateX(-${current * 100}%)`;
      if (pagination) pagination.textContent = `${current + 1}/${total}`;
    }

    prevBtn?.addEventListener('click', () => {
      current = (current - 1 + total) % total;
      update();
    });

    nextBtn?.addEventListener('click', () => {
      current = (current + 1) % total;
      update();
    });

    update();
  });
}

// Wishes slider
function initWishesSlider() {
  const slides = document.querySelectorAll('.wish-slide');
  const prevBtn = document.querySelector('.wish-nav-btn.prev');
  const nextBtn = document.querySelector('.wish-nav-btn.next');
  const pagination = document.querySelector('.wish-pagination');

  if (!slides.length) return;

  let current = 0;
  const total = slides.length;

  function update() {
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    if (pagination) pagination.textContent = `${current + 1}/${total}`;
  }

  prevBtn?.addEventListener('click', () => {
    current = (current - 1 + total) % total;
    update();
  });

  nextBtn?.addEventListener('click', () => {
    current = (current + 1) % total;
    update();
  });

  update();
}
