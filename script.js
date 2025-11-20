// Smooth scroll for buttons and nav links that target sections
function smoothScrollTo(targetSelector) {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("[data-scroll-target]")) {
    const selector = target.getAttribute("data-scroll-target");
    smoothScrollTo(selector);
  }
});

// Also enable smooth scroll for nav links with hashes
document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const href = link.getAttribute("href");
  if (href && href.startsWith("#") && href.length > 1) {
    event.preventDefault();
    smoothScrollTo(href);
  }
});

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple countdown to Christmas (December 25 of current year)
const countdownEl = document.getElementById("countdown");
if (countdownEl) {
  const now = new Date();
  const currentYear = now.getFullYear();
  let christmas = new Date(currentYear, 11, 25); // Month 11 = December

  // If Christmas already passed this year, count down to next year
  if (now > christmas) {
    christmas = new Date(currentYear + 1, 11, 25);
  }

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
