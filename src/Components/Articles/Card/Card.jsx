import React from "react";
import styles from "./Card.module.scss";

function Card({ article }) {
  return <div className={styles.card}>{article.title}</div>;
}

export default Card;
