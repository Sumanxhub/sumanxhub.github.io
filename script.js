document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // Year in footer
  // ========================
  document.getElementById("year").textContent = new Date().getFullYear();

  // ========================
  // Theme toggle
  // ========================
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.body.classList.toggle("light", savedTheme === "light");
  } else if (!prefersDark) {
    document.body.classList.add("light");
  }
  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const isLight = document.body.classList.contains("light");
    themeToggle.innerHTML = isLight
      ? feather.icons["sun"].toSvg()
      : feather.icons["moon"].toSvg();
  }

  // ========================
  // Mobile nav toggle
  // ========================
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuToggle.innerHTML = nav.classList.contains("open")
      ? feather.icons["x"].toSvg()
      : feather.icons["menu"].toSvg();
  });

  // Close nav when link clicked
  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuToggle.innerHTML = feather.icons["menu"].toSvg();
      }
    });
  });

  // ========================
  // Smooth scroll
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ========================
  // Highlight active nav link on scroll
  // ========================
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll(".nav a").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ========================
  // Contact form
  // ========================
  window.handleContactSubmit = function (e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const message = data.get("message").trim();

    if (!name || !email || !message) {
      alert("Please complete all fields.");
      return false;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:bhaskarsuman458@gmail.com?subject=${subject}&body=${body}`;
    return false;
  };
});

