import React from "react";
import styles from "./Card.module.scss";

function Card({ article }) {
  return (
    <a
      className={styles.card}
      href={article.url}
      target="_blank"
      rel="noreferrer"
    >
      {article.urlToImage && (
        <figure style={{ backgroundImage: `url(${article.urlToImage})` }} />
      )}
      <small>{article.source.name}</small>
      <h2>{article.title}</h2>
    </a>
  );
}

export default Card;
