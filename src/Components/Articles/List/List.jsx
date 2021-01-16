import React, { useReducer, useEffect } from "react";
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

const Content = ({ articles }) => {
  return (
    <div className={styles.articles}>
      {articles.map((article) => {
        return <Card article={article} />;
      })}
    </div>
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
      content = <h1>Loading</h1>;
      break;
  }

  return content;
}

export default List;
