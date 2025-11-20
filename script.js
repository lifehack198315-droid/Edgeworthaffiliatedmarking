// Smooth scroll for buttons with data-scroll-target
function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("click", (event) => {
  const target = event.target;

  // Buttons with data-scroll-target
  if (target.matches("[data-scroll-target]")) {
    const selector = target.getAttribute("data-scroll-target");
    if (selector) {
      smoothScrollTo(selector);
    }
  }

  // Nav links like href="#deals"
  const link = target.closest('a[href^="#"]');
  if (link) {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#") && href.length > 1) {
      event.preventDefault();
      smoothScrollTo(href);
    }
  }
});

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple countdown to Christmas (December 25 of this or next year)
const countdownEl = document.getElementById("countdown");
if (countdownEl) {
  function getNextChristmas() {
    const now = new Date();
    const year = now.getFullYear();
    let christmas = new Date(year, 11, 25); // Month 11 = December

    if (now > christmas) {
      christmas = new Date(year + 1, 11, 25);
    }
    return christmas;
  }

  const christmas = getNextChristmas();

  function updateCountdown() {
    const now = new Date();
    const diff = christmas - now;

    if (diff <= 0) {
      countdownEl.textContent = "It’s Christmas time! 🎄";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    countdownEl.textContent = `${days} days, ${hours} hrs, ${minutes} mins`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000); // update every minute
}
