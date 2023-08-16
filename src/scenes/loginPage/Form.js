import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../state";

import { Formik } from "formik"; // Error Handling/Form Validation
import * as yup from "yup"; // Form Validation
import Dropzone from "react-dropzone"; // File Upload
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Avatar, TextField, Button, Box } from "@mui/material";

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);
  const username = useSelector((state) => state.username);
  const first_name = useSelector((state) => state.first_name);
  const last_name = useSelector((state) => state.last_name);
  const image = useSelector((state) => state.image);

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
    image: image,
  };

  // Send data to Backend + Save to local storage
  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    console.log("handleFormSubmit");
    console.log(values);
    formData.append("image", values.image.name);
    fetch(`${url}/users`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${chan_token}` },
      body: formData,
    }).then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        dispatch(
          setUserData({
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            image: data.image,
          })
        );

        onSubmitProps.resetForm();
        navigate("/home");
      } else {
        console.log("handleFormSubmit Failed");
      }
    });
  };

  const handleDrop = (acceptedFile) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      var image = document.createElement("img"); // result image data
      // Should display image in ref maybe ??
      image.src = e.target.result;
      // document.body.appendChild(image);
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
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              top: "25%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Avatar
              alt="Current User"
              src={image}
              sx={{ width: 96, height: 96 }}
            />
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

            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <TextField
                  id="username"
                  label="User Name"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.username}
                  required
                  fullWidth
                />
              </Grid2>{" "}
              <Grid2 xs={6}>
                <TextField
                  id="first_name"
                  label="First Name"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.first_name}
                  required
                />
              </Grid2>
              <Grid2 xs={6}>
                <TextField
                  id="last_name"
                  label="Last Name"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.last_name}
                  required
                />
              </Grid2>
              <Grid2 xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default Form;
