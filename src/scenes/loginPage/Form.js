import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../state";

import { Formik } from "formik"; // Error Handling/Form Validation
import * as yup from "yup"; // Form Validation
import Dropzone from "react-dropzone"; // File Upload

function Form() {
  const dispatch = useDispatch();
  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);
  const username = useSelector((state) => state.username);
  const first_name = useSelector((state) => state.first_name);
  const last_name = useSelector((state) => state.last_name);
  const picturePath = useSelector((state) => state.picturePath);

  // Schemas
  const profileSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    username: yup.string().required("required"),
    image: yup.string().required("required"),
  });

  // NOTE: if needed, we can use the same FORM component for multiple situations.

  const initialValuesProfile = {
    first_name: first_name,
    last_name: last_name,
    username: username,
    image: picturePath,
  };

  // Send data to Backend + Save to local storage
  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    console.log(values);
    formData.append("image", values.image.name);
    const savedUserResponse = await fetch(`${url}/users`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${chan_token}` },
      body: formData,
    });
    let data = await savedUserResponse.json();
    dispatch(
      setUserData({
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        picturePath: data.url,
      })
    );

    onSubmitProps.resetForm();
    // Navigate to Homepage ->
  };

  const handleDrop = (acceptedFile) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      var image = document.createElement("img"); // result image data
      // Should display image in ref maybe
      image.src = e.target.result;
      document.body.appendChild(image);
    };
    reader.readAsDataURL(acceptedFile);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesProfile}
      validationSchema={profileSchema}
    >
      {({
        values, // Values of the form
        setFieldValue, // Sets value of a field(?)
        touched, // Corresponds to a field thats been touched/visited
        handleChange, // Change Event Listener. Handles on keystroke.
        handleBlur, // onBlur event handler. Handles when you click out of input.
        handleSubmit, // Submit event handler. Passes handleFormSubmit to <form onSubmit>.
        resetForm, // Resets form (?)
        errors, // Form validation errors
      }) => (
        <form onSubmit={handleSubmit}>
          <img src={picturePath} alt="User" />
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            onDrop={(acceptedFiles) => {
              setFieldValue("image", acceptedFiles[0]);
              handleDrop(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!values.image.name ? (
                    <p>Add Picture Here</p>
                  ) : (
                    <p>{values.image.name}</p> // If there is a file, display filename
                  )}
                </div>
              </section>
            )}
          </Dropzone>

          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            onChange={handleChange}
            value={values.first_name}
          />

          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            onChange={handleChange}
            value={values.last_name}
          />

          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={handleChange}
            value={values.username}
          />
          <button type="submit">Submit</button>
          {console.log(errors)}
          {/* {console.log(values)} */}
        </form>
      )}
    </Formik>
  );
}

export default Form;
