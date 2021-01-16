import React from "react";
import styles from "./Article.module.scss";

function Article({ article }) {
  return (
    <div className={styles.article}>
      <figure
        style={
          article.urlToImage && {
            backgroundImage: `url(${article.urlToImage})`,
          }
        }
      />
      <small>{article.source.name}</small>
      <h2>{article.title}</h2>
    </div>
  );
}

export default Article;
