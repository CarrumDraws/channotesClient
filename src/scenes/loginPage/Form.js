import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../state";

import { Formik } from "formik"; // Error Handling/Form Validation
import * as yup from "yup"; // Form Validation
import Dropzone from "react-dropzone"; // File Upload
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Avatar, TextField, Typography, Button, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);
  const username = useSelector((state) => state.username);
  const first_name = useSelector((state) => state.first_name);
  const last_name = useSelector((state) => state.last_name);
  // const image = useSelector((state) => state.image);
  const [image, setImage] = useState(useSelector((state) => state.image));

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
    formData.append("image", values.image.name);
    fetch(`${url}/users`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${chan_token}` },
      body: formData,
    }).then(async (res) => {
      if (res.ok) {
        let data = await res.json();
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
      setImage(e.target.result); // result image data
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
        setFieldValue, // Sets value of a field on command (good for images)
        handleChange, // Change Event Listener. Alters 'values' object.
        values, // Map of fields as key-value pairs, where key=name/id and value=value
        handleBlur, // onBlur Event Listener. Alters 'touched' object.
        touched, // Map of fields to if theyve been visited
        handleSubmit, // Submit event handler. Passes handleFormSubmit to <form onSubmit>.
        errors, // Map of fields as key-value pairs, where key=name/id and value=error if theres one
        resetForm, // Resets form (?)
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
            <Dropzone
              acceptedFiles=".jpg, .jpeg, .png"
              multiple={false}
              onDrop={(acceptedFiles) => {
                setFieldValue("image", acceptedFiles[0]);
                handleDrop(acceptedFiles[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <Box {...getRootProps()} sx={{ padding: "20px" }}>
                  <input {...getInputProps()} />
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      alt="Current User"
                      src={image}
                      sx={{ width: 96, height: 96 }}
                    />
                    <AddCircleIcon
                      sx={{
                        position: "absolute",
                        fontSize: "35px",
                        left: "105%",
                        transform: "translate(-100%, -100%)",
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Dropzone>

            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <TextField
                  id="username"
                  name="username"
                  label="User Name"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.username}
                  onBlur={handleBlur}
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  fullWidth
                />
              </Grid2>
              <Grid2 xs={6}>
                <TextField
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.first_name}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.first_name) && Boolean(errors.first_name)
                  }
                  helperText={touched.first_name && errors.first_name}
                />
              </Grid2>
              <Grid2 xs={6}>
                <TextField
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.last_name}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.last_name) && Boolean(errors.last_name)
                  }
                  helperText={touched.last_name && errors.last_name}
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
