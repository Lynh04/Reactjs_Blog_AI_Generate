import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  // const [isDark, setIsDark] = useState(false);
  //tạo state isDark để lưu trữ theme hiện tại giá trị mặc định được lấy từ localStorage
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const navigate = useNavigate();

  // Save theme to localStorage and apply it
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700">
      {/* Logo and Title */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-pen-tool h-6 w-6 text-primary"
        >
          <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
          <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
          <path d="m2.3 2.3 7.286 7.286"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          AI Blog Generator
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => navigate("/editor")}
          className="cursor-pointer hover:underline underline-offset-4 hover:bg-transparent focus:ring-0 focus-visible:ring-0 shadow-none"
        >
          Editor
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate("/history")}
          className="cursor-pointer hover:underline underline-offset-4 hover:bg-transparent focus:ring-0 focus-visible:ring-0 shadow-none"
        >
          History
        </Button>
        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-yellow-500" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
