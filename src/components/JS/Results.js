import { Error } from "./Error";
import { Loader } from "./Loader";
import { useAppContext } from "../../context/useAppContext";
import styles from "../CSS/Results.module.css";

export const Results = () => {
  const { state, dispatch } = useAppContext();

  const handleNextResults = (event) => {
    event.preventDefault();
    dispatch({ type: "Load_More", nextCursor: state.data.nextCursor });
  };

  return (
    <section className={styles.Content} role="region" aria-live="polite">
      {state.data.items.length === 0 && state.status === "Loaded" && (
        <p className={styles.Info}>No results were found</p>
      )}
      {state.data.items.length > 0 && (
        <>
          <p className="VisuallyHidden">Content Loaded</p>
          <ul className={styles.List}>
            {state.data.items.map((item, index) => (
              <li key={index}>
                <a
                  className={styles.ItemPreview}
                  href={item.edmIsShownAt}
                  aria-label="Go to record source"
                >
                  <figure>
                    <img
                      alt={item.title[0]}
                      className={styles["ItemPreview-image"]}
                      src={item.edmPreview[0]}
                    ></img>
                    <figcaption className={styles["ItemPreview-provider"]}>
                      <span>{item.provider[0]}</span>
                    </figcaption>
                  </figure>
                </a>
              </li>
            ))}
          </ul>
          <button className={styles.Button} onClick={handleNextResults}>
            Show more
          </button>
        </>
      )}
      {state.status === "Loading" && <Loader />}
      {state.status === "Error" && <Error message={state.error} />}
    </section>
  );
};
