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

const Content = ({ articles, loadArticles }) => {
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
        <button
          onClick={() => {
            loadArticles();
          }}
        >
          Load More
        </button>
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

  const [pageNo, setpageNo] = useState(1);

  useEffect(() => {
    console.log('1')
    dashboardDispatch({
      type: ArticlesActionStartLoad,
      pageNo: pageNo,
      dispatch: dashboardDispatch,
    });
  }, []);

  useEffect(() => {
    dashboardDispatch({
      type: ArticlesActionStartLoad,
      dispatch: dashboardDispatch,
      pageNo,
    });
  }, [pageNo]);

  const loadArticles = async () => {
    setpageNo(pageNo + 1);
  };

  let content = null;

  switch (loadPhase) {
    case ArticlesLoadPhaseLoaded:
    case ArticlesLoadPhaseUpdated:
    case ArticlesLoadPhaseUpdating:
      content = (
        <Content
          articles={articles}
          loadArticles={loadArticles}
          page={pageNo}
        />
      );
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
