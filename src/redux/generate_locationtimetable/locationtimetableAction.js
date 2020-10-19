import {
  ADD_LOCATIONTIMETABLE_FAILURE,
  ADD_LOCATIONTIMETABLE_REQUEST,
  ADD_LOCATIONTIMETABLE_SUCCESS,
  GET_LOCATIONTIMETABLE_FAILURE,
  GET_LOCATIONTIMETABLE_REQUEST,
  GET_LOCATIONTIMETABLE_SUCCESS,
} from "./locationtimetableType";
import { db } from "../../firebase";
import firebase from "firebase";

const Addlocationtimetable = (locationtimetabledata) => {
  return async (dispatch) => {
    dispatch({ type: ADD_LOCATIONTIMETABLE_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("location_timetable")
        .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            id: doc.id,
          }));

          db.collection("location_timetable")
            .add({
              ...locationtimetabledata,
            })
            .then(() => {
              dispatch({
                type: ADD_LOCATIONTIMETABLE_SUCCESS,
                payload: {
                  ...locationtimetabledata,
                  timestamp,
                },
              });
            })
            .catch((err) => {
              dispatch({
                type: ADD_LOCATIONTIMETABLE_FAILURE,
                error: err,
              });
            });
        });
    } catch (err) {}
  };
};

const GetLocationtimetable = (roomId) => {
  return async (dispatch) => {
    dispatch({ type: GET_LOCATIONTIMETABLE_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("location_timetable").onSnapshot((snapshot) => {
        const tempData = snapshot.docs.filter(
          (res) => res.data().selectedValueroom === roomId
        );
        const saveData = tempData.map((res) => res.data());

        dispatch({
          type: GET_LOCATIONTIMETABLE_SUCCESS,
          payload: saveData,
        });
      });
    } catch (err) {
      dispatch({
        type: GET_LOCATIONTIMETABLE_FAILURE,
        error: err,
      });
    }
  };
};

export { Addlocationtimetable, GetLocationtimetable };
