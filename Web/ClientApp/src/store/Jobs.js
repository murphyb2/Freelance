const requestJobsType = "REQUEST_JOBS";
const receiveJobsType = "RECEIVE_JOBS";
const requestJobByIdType = "REQUEST_JOB_BY_ID";
const receiveJobByIdType = "RECEIVE_JOB_BY_ID";

const initialState = {
  jobs: [],
  isLoading: false,
  startDateIndex: 123,
  jobDetail: [],
};

export const actionCreators = {
  // requestJobs: (startDateIndex) => async (dispatch, getState) => {
  requestJobs: () => async (dispatch, getState) => {
    const appState = getState();

    console.log("request jobs action creators");
    // console.log(`given index: ${startDateIndex}`);
    console.log(`current index: ${appState.jobs.startDateIndex}`);
    if (
      appState ||
      appState.jobs
      // || startDateIndex !== appState.jobs.startDateIndex
    ) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      // console.log("not issuing");
      // return;

      // console.log(dispatch);
      // dispatch({ type: requestJobsType, startDateIndex });
      dispatch({ type: requestJobsType });

      // const url = `api/Job/${startDateIndex}`;
      const url = `api/Job`;
      // const url = `api/Home/Jobs`;
      const response = await fetch(url);
      const jobs = await response.json();

      dispatch({ type: receiveJobsType, jobs });
      // dispatch({ type: receiveJobsType, startDateIndex, jobs });
    }
  },
  requestJobById: (jobId) => async (dispatch, getState) => {
    dispatch({ type: requestJobByIdType });

    const url = `api/Job/${jobId}`;

    const response = await fetch(url);
    const job = await response.json();

    dispatch({ type: receiveJobByIdType, jobId, job });
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

  if (action.type === requestJobByIdType) {
    console.log("request job by id type");
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === receiveJobByIdType) {
    console.log("receive job by id type");
    return {
      ...state,
      jobDetail: action.job,
      isLoading: false,
    };
  }

  return state;
};
