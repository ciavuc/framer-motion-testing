import React from "react";
import { motion } from "framer-motion";

import styles from "./Article.module.scss";

function Article({ article }) {
  return (
    <div className={styles.article}>
      <motion.figure
        layoutId={article.urlToImage}
        style={
          article.urlToImage && {
            backgroundImage: `url(${article.urlToImage})`,
          }
        }
      >
        <h1>{article.title}</h1>
      </motion.figure>
      <div className={styles.content}>
        <p>{article.description}</p>
      </div>
    </div>
  );
}

export default Article;
