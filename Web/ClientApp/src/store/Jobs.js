const requestJobsType = "REQUEST_JOBS";
const receiveJobsType = "RECEIVE_JOBS";
const requestJobByIdType = "REQUEST_JOB_BY_ID";
const receiveJobByIdType = "RECEIVE_JOB_BY_ID";
const addNewJobType = "ADD_NEW_JOB";
const newJobAddedType = "NEW_JOB_ADDED";
const clearMesagesType = "CLEAR_MESSAGES";
const deleteJobType = "DELETE_JOB";
const deleteJobSuccessType = "DELETE_JOB_SUCCESS";
const updateJobType = "UPDATE_JOB";
const jobUpdatedType = "JOB_UPDATED";

const initialState = {
  jobs: [],
  isLoading: false,
  startDateIndex: 123,
  jobDetail: {},
  processingNewJob: false,
  updatingJob: false,
  processingDeleteJob: false,
  processedJobSuccess: "",
  error: "",
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

      dispatch({ type: requestJobsType });

      const url = `api/Job`;
      const response = await fetch(url);
      const jobs = await response.json();

      dispatch({ type: receiveJobsType, jobs });
    }
  },

  requestJobById: (jobId) => async (dispatch, getState) => {
    // CAN CONVERT THIS TO JUST FILTER EXISTING JOBS IN STATE!!
    // NOT NECESSARY TO PING DB
    dispatch({ type: requestJobByIdType });

    const url = `api/Job/${jobId}`;

    const response = await fetch(url);
    const job = await response.json();

    dispatch({ type: receiveJobByIdType, jobId, job: job[0] });
  },

  addNewJob: (job) => async (dispatch) => {
    dispatch({ type: addNewJobType });

    try {
      const url = `api/Job`;

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(job),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res.error) {
        console.log(res.error);

        dispatch({
          type: newJobAddedType,
          error: res.error,
        });
      } else {
        dispatch({
          type: newJobAddedType,
          success: res.success,
        });
      }
    } catch (error) {
      console.log("error", error);
      dispatch({ type: newJobAddedType, error });
    }
  },

  deleteJob: (jobId) => async (dispatch) => {
    dispatch({ type: deleteJobType });

    const url = `api/Job/${jobId}`;

    try {
      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: deleteJobSuccessType,
        response: "Successfully deleted job!",
        jobId,
      });
    } catch (error) {
      dispatch({ type: deleteJobSuccessType, error });
    }
  },

  clearMessages: () => async (dispatch) => {
    dispatch({ type: clearMesagesType });
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
  switch (action.type) {
    case requestJobsType:
      return {
        ...state,
        startDateIndex: action.startDateIndex,
        isLoading: true,
      };

    case receiveJobsType:
      return {
        ...state,
        startDateIndex: action.startDateIndex,
        jobs: action.jobs,
        isLoading: false,
      };

    case requestJobByIdType:
      return {
        ...state,
        isLoading: true,
      };

    case receiveJobByIdType:
      return {
        ...state,
        jobDetail: action.job,
        isLoading: false,
      };

    case addNewJobType:
      return {
        ...state,
        processingNewJob: true,
        processedJobSuccess: "",
      };

    case newJobAddedType:
      return {
        ...state,
        processingNewJob: false,
        processedJobSuccess: action.success,
        error: action.error,
      };

    case deleteJobType:
      return {
        ...state,
        processingDeleteJob: true,
        processedJobSuccess: "",
      };

    case deleteJobSuccessType:
      return {
        ...state,
        processingDeleteJob: false,
        processedJobSuccess: action.response,
        error: action.error,
        jobs: action.jobId
          ? state.jobs.filter((job) => job.id !== action.jobId)
          : state.jobs,
      };

    case clearMesagesType:
      return {
        ...state,
        processedJobSuccess: "",
        error: "",
      };

    case updateJobType:
      return {
        ...state,
        updatingJob: true,
        processedJobSuccess: "",
      };

    case jobUpdatedType:
      return {
        ...state,
        updatingJob: false,
        processedJobSuccess: "Successfully updated job!",
      };

    default:
      return state;
  }
};
