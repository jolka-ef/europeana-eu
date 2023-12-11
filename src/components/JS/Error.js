import styles from "../CSS/Error.module.css";

export const Error = ({ message }) => {
  return (
    <>
      <h2 className={styles.Heading}>{message}</h2>
    </>
  );
};
