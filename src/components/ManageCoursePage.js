import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { getAuthors } from "../api/authorApi";
import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getAuthors().then((_authors) => setAuthors(_authors));
  }, []);

  function handleChange({ target }) {
    const { name, value } = target;
    const updatedCourse = {
      ...course,
      [name]: value,
    };
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);

    // if the errors object has no properties, the form is valid:
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formIsValid()) {
      courseApi.saveCourse(course).then(() => {
        props.history.push("/courses");
        toast.success("Course saved :)");
      });
    }
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        authors={authors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
