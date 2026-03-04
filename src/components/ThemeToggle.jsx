function ThemeToggle({ theme, onChange }) {
  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      <button
        type="button"
        className={`theme-option ${theme === "dark" ? "is-active" : ""}`}
        onClick={() => onChange("dark")}
        aria-pressed={theme === "dark"}
      >
        Dark
      </button>
      <button
        type="button"
        className={`theme-option ${theme === "light" ? "is-active" : ""}`}
        onClick={() => onChange("light")}
        aria-pressed={theme === "light"}
      >
        Light
      </button>
    </div>
  );
}

export default ThemeToggle;
