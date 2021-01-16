import React, { useState, useReducer, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./List.module.scss";

import {
  ArticlesReducer,
  emptyDashboard,
  ArticlesActionStartLoad,
  ArticlesLoadPhaseLoaded,
  ArticlesLoadPhaseLoading,
  ArticlesLoadPhaseUpdating,
  ArticlesLoadPhaseUpdated,
  ArticlesLoadPhaseErrored,
  ArticlesLoadPhaseNotStarted,
} from "../../../Api/ArticlesApi";
import Card from "../Card/Card";
import Loader from "../../Loader/Loader";
import Article from "../Article/Article";

const Content = ({ articles }) => {
  // animations
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.5,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };
  const cardVariants = {
    start: {
      y: 50,
      opacity: 0,
    },
    end: {
      y: 0,
      opacity: 1,
    },
  };
  const transition = {
    duration: 0.5,
    ease: "easeInOut",
  };
  return (
    <>
      <motion.div
        className={styles.articles}
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {articles.map((article) => {
          return (
            <motion.div
              transition={transition}
              variants={cardVariants}
              key={article.publishedAt}
            >
              <Card article={article} />
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};

function List() {
  const [dashboardState, dashboardDispatch] = useReducer(
    ArticlesReducer,
    emptyDashboard
  );
  const { loadPhase, articles = [] } = dashboardState;

  useEffect(() => {
    dashboardDispatch({
      type: ArticlesActionStartLoad,
      dispatch: dashboardDispatch,
    });
  }, [dashboardDispatch]);

  let content = null;

  switch (loadPhase) {
    case ArticlesLoadPhaseLoaded:
    case ArticlesLoadPhaseUpdated:
    case ArticlesLoadPhaseUpdating:
      content = <Content articles={articles} />;
      break;
    case ArticlesLoadPhaseErrored:
      content = <div>Something has gone wrong</div>;
      break;
    case ArticlesLoadPhaseLoading:
    case ArticlesLoadPhaseNotStarted:
    default:
      content = <Loader />;
      break;
  }

  return content;
}

export default List;
