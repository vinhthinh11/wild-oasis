import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-schema: dark)').matches,
    'dark-mode'
  );
  function toggleDarkMode() {
    setDarkMode(va => !va);
  }
  useEffect(
    function () {
      if (darkMode) document.documentElement.classList.add('dark-mode');
      else document.documentElement.classList.remove('dark-mode');
    },
    [darkMode]
  );
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error('Context was use outside of provider');
  return context;
}

export { DarkModeProvider, useDarkMode };
