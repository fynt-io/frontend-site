"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import BrenIcon from "./../Icons/BrenIcon";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function returnCurrentTheme() {
    let result: string = "";
    if (theme === "system") {
      if (systemTheme !== undefined) {
        result = systemTheme;
        localStorage.setItem("theme", systemTheme);
      }
    } else {
      if (theme !== undefined) {
        result = theme;
      }
    }
    return result;
  }

  return (
    mounted && (
      <button
        className={`w-fit  items-center flex ${returnCurrentTheme() === "dark" ? "justify-end" : "justify-start"}  right-5 h-9 !w-16 p-1  scale-100 rounded-full duration-200  bg-cloudy-blue dark:bg-dark-grey border border-transparent dark:border-grey`}
        onClick={() =>
          setTheme(returnCurrentTheme() === "dark" ? "light" : "dark")
        }
      >
        {returnCurrentTheme() === "light" ? (
          <div className=" rounded-full h-7 w-7 bg-white flex items-center justify-center text-cloudy-blue">
            <BrenIcon icon="sun" color="inherit" />
          </div>
        ) : (
          <div className="rounded-full h-7 w-7 bg-medium-grey flex items-center justify-center text-light-grey ">
            <BrenIcon icon="moon" color="inherit" />
          </div>
        )}
      </button>
    )
  );
};
