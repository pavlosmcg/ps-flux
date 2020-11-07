import React from "react";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";

function CourseForm(props) {
  const options = [
    { value: "1", label: "Cory House" },
    { value: "2", label: "Scott Allen" },
  ];
  return (
    <form>
      <TextInput
        id="title"
        name="title"
        label="Title"
        onChange={props.onChange}
        value={props.course.title}
      />

      <SelectInput
        id="author"
        name="authorId"
        label="Author"
        onChange={props.onChange}
        value={props.course.authorId}
        options={options}
      />

      <TextInput
        id="category"
        name="category"
        label="Category"
        onChange={props.onChange}
        value={props.course.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

export default CourseForm;
