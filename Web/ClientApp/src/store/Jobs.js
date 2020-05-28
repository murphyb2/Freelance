const requestJobsType = "REQUEST_JOBS";
const receiveJobsType = "RECEIVE_JOBS";
const initialState = { jobs: [], isLoading: false, startDateIndex: 123 };

export const actionCreators = {
  requestJobs: (startDateIndex) => async (dispatch, getState) => {
    // requestJobs: () => async (dispatch, getState) => {
    const appState = getState();

    console.log("request jobs action creators");
    console.log(`given index: ${startDateIndex}`);
    console.log(`current index: ${appState.jobs.startDateIndex}`);
    if (
      appState ||
      appState.jobs ||
      startDateIndex !== appState.jobs.startDateIndex
    ) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      // console.log("not issuing");
      // return;

      // console.log(dispatch);
      dispatch({ type: requestJobsType, startDateIndex });
      // dispatch({ type: requestJobsType });

      const url = `api/Home/Jobs/${startDateIndex}`;
      // const url = `api/Home/Jobs`;
      const response = await fetch(url);
      const jobs = await response.json();

      // dispatch({ type: receiveJobsType, jobs });
      dispatch({ type: receiveJobsType, startDateIndex, jobs });
    }
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestJobsType) {
    console.log("request jobs type");
    console.log(action.startDateIndex);
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      isLoading: true,
    };
  }

  if (action.type === receiveJobsType) {
    console.log("receive jobs type");
    console.log(action.startDateIndex);
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      jobs: action.jobs,
      isLoading: false,
    };
  }

  return state;
};
