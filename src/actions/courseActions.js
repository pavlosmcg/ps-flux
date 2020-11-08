import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";
import * as courseApi from "../api/courseApi";
import * as authorApi from "../api/authorApi";

// action creator
export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    dispatcher.dispatch(
      // action itself
      {
        actionType: course.id
          ? actionTypes.UPDATE_COURSE
          : actionTypes.CREATE_COURSE,
        course: savedCourse,
      }
    );
  });
}

export function loadCourses() {
  return courseApi.getCourses().then((courses) => {
    authorApi.getAuthors().then((authors) => {
      const coursesWithAuthorNames = courses.map((course) => {
        // find the author from the authors api response:
        const author = authors.find((author) => author.id === course.authorId);
        // attach the author name to the course object:
        return {
          ...course,
          authorName: author.name,
        };
      });
      dispatcher.dispatch({
        actionType: actionTypes.LOAD_COURSES,
        courses: coursesWithAuthorNames,
      });
    });
  });
}
