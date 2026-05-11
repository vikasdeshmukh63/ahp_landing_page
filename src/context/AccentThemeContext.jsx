import { createContext, useContext } from 'react'

const AccentThemeContext = createContext('blue')

/** @param {{ accent: 'blue' | 'lime', children: import('react').ReactNode }} props */
export function AccentThemeProvider({ accent, children }) {
  return (
    <AccentThemeContext.Provider value={accent}>{children}</AccentThemeContext.Provider>
  )
}

/** @returns {'blue' | 'lime'} */
export function useAccentTheme() {
  return useContext(AccentThemeContext)
}
