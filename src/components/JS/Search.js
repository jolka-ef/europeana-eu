import React, { useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import styles from "../CSS/Search.module.css";

export const Search = () => {
  const { state, dispatch } = useAppContext();
  const [typed, setTyped] = useState("");

  const handleTyping = (event) => {
    event.preventDefault();
    setTyped(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = typed.trimEnd();
    if (query !== state.query) {
      dispatch({ type: "Set_Query", query });
    }
  };

  return (
    <form className={styles.Form} onSubmit={handleSearch} role="search">
      <label className={styles.Label} htmlFor="search">
          <span>Search </span>
          <span ><a className={styles.Link} href="https://pro.europeana.eu/page/search">Europeana</a></span>
      </label>
      <input
        className={styles.Input}
        id="search"
        onChange={handleTyping}
        required
        type="text"
        value={typed}
      />
      <button
        className={styles.Button}
        type="submit"
        aria-label="Search"
      ></button>
    </form>
  );
};
