import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import { getAuthors } from "../api/authorApi";
import CourseList from "./CourseList";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // map courses into a collection that also includes author names:
    getAuthors().then((authors) => {
      getCourses().then((_courses) => {
        const coursesWithAuthorNames = _courses.map((course) => {
          // find the author from the authors api response:
          const author = authors.find(
            (author) => author.id === course.authorId
          );
          // attach the author name to the course object:
          return {
            ...course,
            authorName: author.name,
          };
        });
        setCourses(coursesWithAuthorNames);
      });
    });
  }, []);

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
