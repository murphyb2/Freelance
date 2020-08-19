﻿const requestJobsType = "REQUEST_JOBS";
const receiveJobsType = "RECEIVE_JOBS";
const requestJobByIdType = "REQUEST_JOB_BY_ID";
const receiveJobByIdType = "RECEIVE_JOB_BY_ID";
const addNewJobType = "ADD_NEW_JOB";
const newJobAddedType = "NEW_JOB_ADDED";
const clearAddJobType = "CLEAR_ADD_JOB";
const deleteJobType = "DELETE_JOB";
const deleteJobSuccessType = "DELETE_JOB_SUCCESS";
const updateJobType = "UPDATE_JOB";
const jobUpdatedType = "JOB_UPDATED";

const initialState = {
  jobs: [],
  isLoading: false,
  startDateIndex: 123,
  jobDetail: [],
  processingNewJob: false,
  processedJobSuccess: false,
  updatingJob: false,
  processingDeleteJob: false,
};

export const actionCreators = {
  requestJobs: () => async (dispatch, getState) => {
    const appState = getState();

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
    // CAN CONVERT THIS TO JUST FILTER EXISTING JOBS IN STATE!!
    // NOT NECESSARY TO PING DB
    dispatch({ type: requestJobByIdType });

    const url = `api/Job/${jobId}`;

    const response = await fetch(url);
    const job = await response.json();

    dispatch({ type: receiveJobByIdType, jobId, job });
  },

  addNewJob: (job) => async (dispatch, getState) => {
    dispatch({ type: addNewJobType });

    // console.log(JSON.stringify(job));
    const url = `api/Job`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();

    dispatch({ type: newJobAddedType, success: res.success });
  },

  deleteJob: (jobId) => async (dispatch) => {
    dispatch({ type: deleteJobType });

    const url = `api/Job/${jobId}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        dispatch({ type: deleteJobSuccessType, response: response });
      })
      .catch((error) => {
        dispatch({ type: deleteJobSuccessType, response: error });
      });
  },

  clearAddJob: () => async (dispatch) => {
    dispatch({ type: clearAddJobType });
  },

  updateJob: (jobId, job) => async (dispatch) => {
    dispatch({ type: updateJobType });

    const url = `api/Job/${jobId}`;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const success = await response.json();

    dispatch({ type: jobUpdatedType, success });
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestJobsType) {
    // console.log("request jobs type");
    // console.log(action.startDateIndex);
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      isLoading: true,
    };
  }

  if (action.type === receiveJobsType) {
    // console.log("receive jobs type");
    // console.log(action.startDateIndex);
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      jobs: action.jobs,
      isLoading: false,
    };
  }

  if (action.type === requestJobByIdType) {
    // console.log("request job by id type");
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === receiveJobByIdType) {
    // console.log("receive job by id type");
    return {
      ...state,
      jobDetail: action.job,
      isLoading: false,
    };
  }

  if (action.type === addNewJobType) {
    // console.log("add new job type");
    return {
      ...state,
      processingNewJob: true,
    };
  }

  if (action.type === newJobAddedType) {
    // console.log(`new job processed, success? ${action.success}`);
    return {
      ...state,
      processingNewJob: false,
      processedJobSuccess: action.success,
    };
  }

  if (action.type === deleteJobType) {
    return {
      ...state,
      processingDeleteJob: true,
      processedJobSuccess: false,
    };
  }

  if (action.type === deleteJobSuccessType) {
    return {
      ...state,
      processingDeleteJob: false,
      processedJobSuccess: action.response.ok,
    };
  }

  if (action.type === clearAddJobType) {
    return {
      ...state,
      processedJobSuccess: false,
    };
  }

  if (action.type === updateJobType) {
    return {
      ...state,
      updatingJob: true,
      success: "",
    };
  }

  if (action.type === jobUpdatedType) {
    return {
      ...state,
      updatingJob: false,
      processedJobSuccess: action.success,
    };
  }

  return state;
};
