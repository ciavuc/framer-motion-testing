import React, { useState, useReducer, useEffect } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
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
  const [activeArticle, setActiveArticle] = useState(null);

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
    <AnimateSharedLayout type="crossfade">
      <motion.div
        className={styles.articles}
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {articles.map((article, i) => {
          return (
            <motion.div
              transition={transition}
              variants={cardVariants}
              key={i}
              onClick={() => {
                setActiveArticle(article);
              }}
            >
              <Card article={article} />
            </motion.div>
          );
        })}
        <button
          className={styles.loadMore}
          onClick={() => {
            loadArticles();
          }}
        >
          Load More
        </button>
      </motion.div>

      <AnimatePresence>
        {activeArticle && (
          <>
            <Article article={activeArticle} />
          </>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
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
