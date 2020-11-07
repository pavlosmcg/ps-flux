import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { getAuthors } from "../api/authorApi";
import * as courseApi from "../api/courseApi";

const ManageCoursePage = (props) => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getAuthors().then((_authors) =>
      setAuthors(
        _authors.map((author) => {
          return { value: author.id.toString(), label: author.name };
        })
      )
    );
  }, []);

  function handleChange({ target }) {
    const { name, value } = target;
    const updatedCourse = {
      ...course,
      [name]: value,
    };
    setCourse(updatedCourse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    courseApi.saveCourse(course).then(() => {
      props.history.push("/courses");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        authors={authors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
