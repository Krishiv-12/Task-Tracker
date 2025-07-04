import { useEffect, useState } from "react";

export default function DarkModeToggle() {
const [dark, setDark] = useState(
  localStorage.getItem("theme") === "dark"
);


  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="absolute top-4 right-4 px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 dark:text-white hover:shadow"
    >
      {dark ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
