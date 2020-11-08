import React from "react";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";
import { PropTypes } from "prop-types";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        name="title"
        label="Title"
        onChange={props.onChange}
        value={props.course.title}
        error={props.errors.title}
      />

      <SelectInput
        id="author"
        name="authorId"
        label="Author"
        onChange={props.onChange}
        value={props.course.authorId}
        options={props.authors.map((author) => {
          return { value: author.id.toString(), label: author.name };
        })}
        error={props.errors.authorId}
      />

      <TextInput
        id="category"
        name="category"
        label="Category"
        onChange={props.onChange}
        value={props.course.category}
        error={props.errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  course: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CourseForm;
