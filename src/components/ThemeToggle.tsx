// ThemeToggle.tsx — React island: toggle dark/light + idioma
import { useState, useEffect } from "react";
import { Sun, Moon, Languages } from "lucide-react";

interface Props {
  currentLang: string;
  onLangChange?: (lang: string) => void;
}

export default function ThemeToggle({ currentLang }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState(currentLang || "es");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = (stored as "light" | "dark") || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const toggleLang = () => {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
    // Dispatch custom event que el navbar escucha
    window.dispatchEvent(new CustomEvent("langChange", { detail: { lang: next } }));
    localStorage.setItem("lang", next);
  };

  return (
    <div className="controls">
      <button
        onClick={toggleLang}
        className="ctrl-btn"
        aria-label="Toggle language"
        title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      >
        <span className="lang-label">{lang === "es" ? "EN" : "ES"}</span>
      </button>

      <button
        onClick={toggleTheme}
        className="ctrl-btn"
        aria-label="Toggle theme"
        title={theme === "light" ? "Dark mode" : "Light mode"}
      >
        {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
      </button>

      <style>{`
        .controls {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .ctrl-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: transparent;
          color: var(--text);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .ctrl-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 8%, transparent);
        }
        .lang-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
        }
      `}</style>
    </div>
  );
}
