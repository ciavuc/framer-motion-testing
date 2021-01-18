import React from "react";
import { motion } from "framer-motion";
import styles from "./Card.module.scss";

function Card({ article, first }) {
  return (
    <div className={`${styles.card} ${styles.first}`}>
      {article.urlToImage && (
        <motion.figure
          layoutId={article.urlToImage}
          style={{ backgroundImage: `url(${article.urlToImage})` }}
        />
      )}
      <small>{article.source.name}</small>
      <h2>{article.title}</h2>
    </div>
  );
}

export default Card;
