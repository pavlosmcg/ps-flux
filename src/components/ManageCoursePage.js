import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { getAuthors } from "../api/authorApi";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    courseStore.addChangeListener(onChange);

    // get the authors for the dropdowns
    getAuthors().then((_authors) => setAuthors(_authors));

    // get the current course (if any) from the path "/course/:slug"
    const slug = props.match.params.slug;
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }

    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

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
      courseActions.saveCourse(course).then(() => {
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
