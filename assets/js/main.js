(function () {
  const root = document.documentElement;

  // Theme: use light by default, only enable dark when explicitly saved
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark") {
    root.dataset.theme = "dark";
  }

  // Theme toggle
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = root.dataset.theme === "dark";
      if (isDark) {
        delete root.dataset.theme;
        localStorage.setItem("theme", "");
      } else {
        root.dataset.theme = "dark";
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // Year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("navToggle");
  if (header && navToggle) {
    navToggle.addEventListener("click", () => {
      const open = header.getAttribute("data-open") === "true";
      header.setAttribute("data-open", open ? "false" : "true");
    });
    header.querySelectorAll(".nav a").forEach(a => {
      a.addEventListener("click", () => header.setAttribute("data-open", "false"));
    });
  }

  // Profile photo fallback
  const img = document.getElementById("profileImg");
  const fallback = document.getElementById("profileFallback");
  if (img && fallback) {
    img.addEventListener("error", () => {
      img.style.display = "none";
      fallback.style.display = "block";
    });
  }

  // Quick form: opens mailto with subject + body
  const form = document.getElementById("quickForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get("name") || "").toString().trim();
      const email = (fd.get("email") || "").toString().trim();
      const message = (fd.get("message") || "").toString().trim();

      const subject = encodeURIComponent(`Portfolio inquiry from ${name || "someone"}`);
      const body = encodeURIComponent(
        `Hi Manish,\n\n` +
        `${message}\n\n` +
        `— ${name}${email ? " (" + email + ")" : ""}\n`
      );

      window.location.href = `mailto:kmanishofficial@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
