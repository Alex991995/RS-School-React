import { createContext, useState } from 'react';

interface ThemeContextType {
  theme: boolean;
  toggleTheme: (theme: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeContextType>({
    theme: true,
    toggleTheme: (theme: boolean) => setCurrentTheme({ ...currentTheme, theme }),
  });

  return <ThemeContext.Provider value={currentTheme}>{children}</ThemeContext.Provider>;
};
