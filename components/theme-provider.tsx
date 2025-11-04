"use client";

import { useEffect } from "react";

interface ThemeProviderProps {
  headingFont: string;
  bodyFont: string;
  primaryColor: string;
  accentColor: string;
}

export function ThemeProvider({ headingFont, bodyFont, primaryColor, accentColor }: ThemeProviderProps) {
  useEffect(() => {
    // Apply fonts
    document.documentElement.style.setProperty('--font-heading', headingFont);
    document.documentElement.style.setProperty('--font-body', bodyFont);
    
    // Apply colors as CSS variables
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    document.documentElement.style.setProperty('--color-accent', accentColor);
  }, [headingFont, bodyFont, primaryColor, accentColor]);

  return null;
}
