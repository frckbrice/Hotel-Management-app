import { Dispatch, SetStateAction, createContext } from "react";

type ThemeContextType = {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
};

const initialThemeContext: ThemeContextType = {
  darkTheme: false,
  setDarkTheme: () => null,
};

const ThemeContext = createContext<ThemeContextType>(initialThemeContext);

export default ThemeContext;
