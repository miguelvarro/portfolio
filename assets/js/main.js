(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

// SCROLL REVEAL
(() => {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  items.forEach(el => el.classList.remove("is-visible"));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  window.addEventListener("load", () => {
    // Revela animación de carga
    items.forEach(el => {
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.9 && r.bottom > 0;
      if (inView) el.classList.add("is-visible");
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        items.forEach(el => observer.observe(el));
      });
    });
  });
})();

// NAVBAR ACTIVE
(() => {
  const links = Array.from(document.querySelectorAll("#menu a"));
  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (!links.length || !sections.length) return;

  const setActive = () => {
    const y = window.scrollY + 120;
    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= y) idx = i;
    }
    links.forEach(l => l.classList.remove("active"));
    links[idx]?.classList.add("active");
  };

  window.addEventListener("scroll", setActive, { passive: true });
  window.addEventListener("load", setActive);
  setActive();
})();

// THEME TOGGLE

(() => {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const root = document.documentElement;
  root.classList.add("no-transitions");

  const saved = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = saved || (prefersLight ? "light" : "dark");

  if (initial === "light") root.setAttribute("data-theme", "light");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove("no-transitions");
    });
  });

  window.addEventListener("load", () => {
    root.classList.remove("no-transitions");
  });

  const sync = () => {
    const isLight = root.getAttribute("data-theme") === "light";
    btn.textContent = isLight ? "☀️ Tema" : "🌙 Tema";
    btn.setAttribute("aria-pressed", String(isLight));
  };

  sync();

  btn.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    if (isLight) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
    sync();
  });
})();

