import { useContext } from "react";
import { AppContext } from "./AppContext";

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  const [state, dispatch] = context;

  return {
    state,
    dispatch,
  };
}
