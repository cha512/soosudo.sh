const themeStorageKey = "cv-theme";
const root = document.documentElement;

let savedTheme = null;
try {
  savedTheme = window.localStorage.getItem(themeStorageKey);
} catch (_error) {
  savedTheme = null;
}

root.dataset.theme = savedTheme === "dark" ? "dark" : "light";

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  if (!toggle) return;

  const updateControls = () => {
    const isDark = root.dataset.theme === "dark";
    toggle.textContent = isDark ? "light" : "dark";
    toggle.setAttribute("aria-label", isDark ? "Use light theme" : "Use dark theme");
    toggle.setAttribute("aria-pressed", String(isDark));
    if (themeColor) themeColor.content = isDark ? "#0e1116" : "#f2f4f1";
  };

  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(themeStorageKey, root.dataset.theme);
    } catch (_error) {
      // The theme still works when storage is unavailable.
    }
    updateControls();
  });

  updateControls();
});
