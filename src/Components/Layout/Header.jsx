import React from "react";
import dayjs from "dayjs";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <figure>News</figure>
      <div className={styles.date}>{dayjs().format("D MMMM")}</div>
    </header>
  );
}

export default Header;
