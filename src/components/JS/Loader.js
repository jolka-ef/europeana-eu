import styles from "../CSS/Loader.module.css";

export const Loader = () => (
  <div className={styles["Loader-container"]}>
    <p className="VisuallyHidden">Loading</p>
    <div className={styles.Loader}></div>
  </div>
);
