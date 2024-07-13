import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { MoonStar, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

export const ThemeSwitcher: React.FC = () => {
  // We need to put this switcher in the layout or store the value outside of the component to avoid the switch toggle happening on every page change
  // We could also initialise it with the system preferences using the `prefers-color-scheme` media query
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-switch" className="cursor-pointer">
        <Sun className={cn("size-5", isDarkMode ? "text-muted-foreground" : "text-yellow-500")} />
      </label>
      <Switch
        id="theme-switch"
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        className="hidden sm:block"
      />
      <label htmlFor="theme-switch" className="cursor-pointer hidden sm:inline">
        <MoonStar
          className={cn("size-5", isDarkMode ? "text-blue-500" : "text-muted-foreground")}
        />
      </label>
    </div>
  );
};
