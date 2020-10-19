import {
  ADD_LECTURERTIMETABLE_FAILURE,
  ADD_LECTURERTIMETABLE_REQUEST,
  ADD_LECTURERTIMETABLE_SUCCESS,
  GET_LECTURERTIMETABLE_FAILURE,
  GET_LECTURERTIMETABLE_REQUEST,
  GET_LECTURERTIMETABLE_SUCCESS,
} from "./lecturerType";

const lecturertimetable_addReducer = (
  state = { loading: true, lectimetabledata: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_LECTURERTIMETABLE_REQUEST:
      return { ...state, loading: true };
    case ADD_LECTURERTIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        lectimetabledata: action.payload,
        error: "",
      };
    case ADD_LECTURERTIMETABLE_FAILURE:
      return {
        ...state,
        loading: false,
        lectimetabledata: {},
        error: action.error,
      };
    default:
      return state;
  }
};

const lecturertimetable_getReducer = (
  state = { loading: true, lectimetabledatas: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_LECTURERTIMETABLE_REQUEST:
      return { ...state, loading: true };
    case GET_LECTURERTIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        lectimetabledatas: action.payload,
        error: "",
      };
    case GET_LECTURERTIMETABLE_FAILURE:
      return {
        ...state,
        loading: false,
        lectimetabledatas: [],
        error: action.error,
      };
    default:
      return state;
  }
};

export { lecturertimetable_addReducer, lecturertimetable_getReducer };
