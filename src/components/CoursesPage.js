import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import { getAuthors } from "../api/authorApi";
import CourseList from "./CourseList";
import { loadCourses } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) loadCourses();
    return () => courseStore.removeChangeListener(onChange); // cleanup on unmount
  }, []);

  function onChange() {
    // map courses into a collection that also includes author names:
    getAuthors().then((authors) => {
      const coursesWithAuthorNames = courseStore.getCourses().map((course) => {
        // find the author from the authors api response:
        const author = authors.find((author) => author.id === course.authorId);
        // attach the author name to the course object:
        return {
          ...course,
          authorName: author.name,
        };
      });
      setCourses(coursesWithAuthorNames);
    });
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} />
    </>
  );
}

export default CoursesPage;
