"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import useGeneralReducer from "./components/Layout/Structure/generalReducer";
import { GeneralContextProvider } from "./components/Layout/Structure/generalContext";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const generalState = useGeneralReducer();

  return <GeneralContextProvider value={generalState}>
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  </GeneralContextProvider>;
}
