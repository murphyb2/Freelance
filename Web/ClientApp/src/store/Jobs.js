const requestJobsType = "REQUEST_JOBS";
const receiveJobsType = "RECEIVE_JOBS";
const initialState = { jobs: [], isLoading: false, startDateIndex: 0 };

export const actionCreators = {
  // requestJobs: (startDateIndex) => async (dispatch, getState) => {
  requestJobs: () => async (dispatch, getState) => {
    const appState = getState();
    if (
      !appState ||
      !appState.jobs
      // || startDateIndex === appState.jobs.startDateIndex
    ) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    console.log("request jobs action creators");
    // dispatch({ type: requestJobsType, startDateIndex });
    dispatch({ type: requestJobsType });

    // const url = `api/Home/Jobs?startDateIndex=${startDateIndex}`;
    const url = `api/Home/Jobs?startDateIndex=1`;
    const response = await fetch(url);
    const jobs = await response.json();

    // dispatch({ type: receiveJobsType, startDateIndex, jobs });
    dispatch({ type: receiveJobsType, jobs });
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestJobsType) {
    console.log("request jobs type");
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      isLoading: true,
    };
  }

  if (action.type === receiveJobsType) {
    console.log("receive jobs type");
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      jobs: action.jobs,
      isLoading: false,
    };
  }

  return state;
};
