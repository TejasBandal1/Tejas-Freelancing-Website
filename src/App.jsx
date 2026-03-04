import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaseStudyPage from "./pages/CaseStudyPage";
import PortfolioLoader from "./components/PortfolioLoader";

const THEME_STORAGE_KEY = "tejas-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // Ignore storage read errors and fallback to system preference.
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [showLoader, setShowLoader] = useState(true);
  const [isLoaderExiting, setIsLoaderExiting] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors.
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer:fine)").matches;

    if (prefersReducedMotion || !hasFinePointer) {
      root.style.setProperty("--mouse-active", "0");
      root.style.setProperty("--mouse-x", "50%");
      root.style.setProperty("--mouse-y", "50%");
      root.style.setProperty("--mouse-x-inv", "50%");
      root.style.setProperty("--mouse-y-inv", "50%");
      root.style.setProperty("--mouse-boost", "0");
      root.style.setProperty("--mouse-alpha-soft", "0.06");
      root.style.setProperty("--mouse-alpha-strong", "0.15");
      return undefined;
    }

    let pointerX = 50;
    let pointerY = 50;
    let pointerBoost = 0.12;
    let rafId = null;

    root.style.setProperty("--mouse-active", "1");

    const commitPointer = () => {
      rafId = null;
      const invX = 100 - pointerX;
      const invY = 100 - pointerY;
      root.style.setProperty("--mouse-x", `${pointerX.toFixed(2)}%`);
      root.style.setProperty("--mouse-y", `${pointerY.toFixed(2)}%`);
      root.style.setProperty("--mouse-x-inv", `${invX.toFixed(2)}%`);
      root.style.setProperty("--mouse-y-inv", `${invY.toFixed(2)}%`);
      root.style.setProperty("--mouse-boost", pointerBoost.toFixed(3));
      root.style.setProperty("--mouse-alpha-soft", (0.07 + pointerBoost * 0.1).toFixed(3));
      root.style.setProperty("--mouse-alpha-strong", (0.16 + pointerBoost * 0.2).toFixed(3));
    };

    const queuePointerCommit = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(commitPointer);
    };

    const handlePointerMove = (event) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const x = (event.clientX / width) * 100;
      const y = (event.clientY / height) * 100;

      pointerX = Math.max(0, Math.min(100, x));
      pointerY = Math.max(0, Math.min(100, y));

      const dx = pointerX - 50;
      const dy = pointerY - 50;
      const distance = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 60);
      pointerBoost = 0.14 + distance * 0.42;
      queuePointerCommit();
    };

    const handlePointerLeave = () => {
      pointerX = 50;
      pointerY = 50;
      pointerBoost = 0.12;
      queuePointerCommit();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    queuePointerCommit();

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <>
      {showLoader ? (
        <PortfolioLoader
          onExitStart={() => setIsLoaderExiting(true)}
          onComplete={() => {
            setShowLoader(false);
            setIsLoaderExiting(false);
          }}
        />
      ) : null}
      <div
        className={`app-main-shell ${
          showLoader
            ? isLoaderExiting
              ? "app-main-shell--ready app-loading-lock"
              : "app-main-shell--preload app-loading-lock"
            : "app-main-shell--ready"
        }`}
        aria-hidden={showLoader}
      >
        <Routes>
          <Route path="/" element={<HomePage theme={theme} setTheme={setTheme} />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage theme={theme} setTheme={setTheme} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
