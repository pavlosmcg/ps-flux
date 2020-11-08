import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";
import * as courseApi from "../api/courseApi";

// action creator
export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    dispatcher.dispatch(
      // action itself
      {
        actionType: actionTypes.CREATE_COURSE,
        course: savedCourse,
      }
    );
  });
}
