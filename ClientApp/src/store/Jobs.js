const requestJobsType = 'REQUEST_JOBS';
const receiveJobsType = 'RECEIVE_JOBS';
const initialState = { jobs: [], isLoading: false };

export const actionCreators = {
  requestJobs: startDateIndex => async (dispatch, getState) => {    
    if (startDateIndex === getState().jobs.startDateIndex) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    dispatch({ type: requestJobsType, startDateIndex });

    const url = `api/Home/Jobs?startDateIndex=${startDateIndex}`;
    const response = await fetch(url);
    const jobs = await response.json();

    dispatch({ type: receiveJobsType, startDateIndex, jobs });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestJobsType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      isLoading: true
    };
  }

  if (action.type === receiveJobsType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      jobs: action.jobs,
      isLoading: false
    };
  }

  return state;
};
