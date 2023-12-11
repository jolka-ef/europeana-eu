import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import { createQuery } from "../utils/createQuery";
import { downloadingReducer } from "./downloadingReducer";
const AppContext = createContext();
function AppContextProvider(props) {
  const [state, dispatch] = useReducer(
    downloadingReducer,
    responseInitialValue
  );
  const { query, nextCursor: cursorMark } = state;

  useEffect(() => {
    let cancelRequest = false;

    if (!query) return;

    const cachedResponse = localStorage.getItem(`${query}&${cursorMark}`);

    const doDownloading = async () => {
      dispatch({ type: "Loading" });
      if (cachedResponse) {
        dispatch({
          type: "Loaded",
          data: JSON.parse(cachedResponse),
        });
      } else {
        try {
          const response = await axios(createQuery(query, cursorMark));
          const { apikey, ...data } = response.data;
          localStorage.setItem(`${query}&${cursorMark}`, JSON.stringify(data));
          if (cancelRequest) return;
          dispatch({
            type: "Loaded",
            data: data,
          });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: "Error", error: error.message });
        }
      }
    };

    doDownloading();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [query, cursorMark]);

  return <AppContext.Provider value={[state, dispatch]} {...props} />;
}
const responseInitialValue = {
  status: "idle",
  error: "",
  data: { items: [] },
  nextCursor: "*",
  query: "",
};

export { AppContextProvider, AppContext, responseInitialValue };
