import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik"; // Error Handling/Form Validation
import * as yup from "yup"; // Form Validation
import Dropzone from "react-dropzone"; // File Upload

function Form() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  const userName = useSelector((state) => state.userName);
  const firstName = useSelector((state) => state.firstName);
  const lastName = useSelector((state) => state.lastName);
  const profileUrl = useSelector((state) => state.profileUrl);
  // Schemas
  const profileSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    userName: yup.string().required("required"),
    picture: yup.string().required("required"),
  });

  // NOTE: if needed, we can use the same FORM component for multiple situations.

  const initialValuesProfile = {
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    profileUrl: profileUrl,
  };

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    const savedUserResponse = await fetch(`${url}/auth/register`, {
      method: "POST",
      body: formData,
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
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
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={handleChange}
            value={values.firstName}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={handleChange}
            value={values.lastName}
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="userName"
            name="userName"
            type="text"
            onChange={handleChange}
            value={values.userName}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
}

export default Form;
