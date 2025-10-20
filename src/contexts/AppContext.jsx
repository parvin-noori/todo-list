import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./AppReducer";

const AppContext = createContext();
const initialState = { theme: localStorage.getItem("theme") || "light" };

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const changeTheme = (theme) => {
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };


  //change theme
  useEffect(() => {
    localStorage.setItem("theme", state.theme);
    const root = document.documentElement;
    state.theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [state.theme]);

  const store = { state, dispatch, changeTheme };
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
