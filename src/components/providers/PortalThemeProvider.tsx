"use client";

import React, { createContext, useContext, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

type ThemeContextType = {
  isDarkTheme: boolean;
  isCompactView: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  isCompactView: false
});

export const useTheme = () => useContext(ThemeContext);

export function PortalThemeProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [theme, setTheme] = React.useState<ThemeContextType>({
    isDarkTheme: true,
    isCompactView: false
  });

  useEffect(() => {
    if (isLoaded && user?.unsafeMetadata?.settings) {
      try {
        const userSettings = JSON.parse(user.unsafeMetadata.settings as string);
        setTheme({
          isDarkTheme: userSettings.darkTheme,
          isCompactView: userSettings.compactView
        });
      } catch (error) {
        console.error('Failed to parse theme settings:', error);
      }
    }
  }, [isLoaded, user?.unsafeMetadata?.settings]);

  useEffect(() => {
    if (theme.isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme.isDarkTheme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
