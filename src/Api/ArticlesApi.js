import axios from "axios";

const ArticlesActionStartLoad = "start-load";
const ArticlesActionWillLoad = "will-load";
const ArticlesActionDidLoad = "did-load";
const ArticlesActionStartReorder = "start-reorder";
const ArticlesActionDidUpdate = "did-update";

const ArticlesLoadPhaseNotStarted = "not-started";
const ArticlesLoadPhaseLoading = "loading";
const ArticlesLoadPhaseLoaded = "loaded";
const ArticlesLoadPhaseUpdating = "updating";
const ArticlesLoadPhaseUpdated = "updated";
const ArticlesLoadPhaseErrored = "errored";

const getArticlesFromAPI = async () => {
  let url =
    "http://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=eae5a7cb8bc745a398d9fdef94869da6";
  return axios.get(url).then((res) => {
    return res;
  });
};

const loadArticlesData = async (userDetails, dispatch) => {
  try {
    dispatch({
      type: ArticlesActionWillLoad,
      articles: [],
    });

    const res = await getArticlesFromAPI();
    console.log("response:", res);

    const { articles } = res.data;

    dispatch({
      type: ArticlesActionDidLoad,
      data: {
        loadPhase: ArticlesLoadPhaseLoaded,
        articles,
      },
    });
  } catch (error) {
    dispatch({
      type: ArticlesLoadPhaseErrored,
      data: {
        loadPhase: ArticlesLoadPhaseErrored,
        articles: [],
      },
    });
  }
};

const emptyDashboard = {
  loadPhase: ArticlesLoadPhaseNotStarted,
  articles: [],
};

const ArticlesReducer = (dashboardState, action) => {
  const { type, userDetails = null, dispatch } = action;

  switch (type) {
    case ArticlesActionStartLoad:
      loadArticlesData(userDetails, dispatch);
      return dashboardState;

    case ArticlesActionWillLoad:
      return { ...dashboardState, loadPhase: ArticlesLoadPhaseLoading };

    case ArticlesActionDidLoad:
      return action.data;

    case ArticlesActionDidUpdate:
      return action.data;

    case ArticlesLoadPhaseErrored:
      return action.data;

    default:
      return dashboardState;
  }
};

export {
  ArticlesReducer,
  emptyDashboard,
  ArticlesActionStartLoad,
  ArticlesActionWillLoad,
  ArticlesActionDidLoad,
  ArticlesLoadPhaseErrored,
  ArticlesActionStartReorder,
  ArticlesActionDidUpdate,
  ArticlesLoadPhaseNotStarted,
  ArticlesLoadPhaseLoading,
  ArticlesLoadPhaseLoaded,
  ArticlesLoadPhaseUpdating,
  ArticlesLoadPhaseUpdated,
};
