import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";
import * as courseApi from "../api/courseApi";
import * as authorApi from "../api/authorApi";

// action creator
export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    authorApi.getAuthors().then((authors) => {
      dispatcher.dispatch(
        // action itself
        {
          actionType: course.id
            ? actionTypes.UPDATE_COURSE
            : actionTypes.CREATE_COURSE,
          course: updateCourseWithAuthorName(savedCourse, authors),
        }
      );
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then((courses) => {
    authorApi.getAuthors().then((authors) => {
      dispatcher.dispatch({
        actionType: actionTypes.LOAD_COURSES,
        courses: courses.map((course) =>
          updateCourseWithAuthorName(course, authors)
        ),
      });
    });
  });
}

function updateCourseWithAuthorName(course, authors) {
  // find the author from the authors api response:
  const author = authors.find((author) => author.id === course.authorId);
  // attach the author name to the course object:
  return {
    ...course,
    authorName: author.name,
  };
}
