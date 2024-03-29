import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setMode } from "../../state";

import { Formik } from "formik"; // Error Handling/Form Validation
import * as yup from "yup"; // Form Validation
import Dropzone from "react-dropzone"; // File Upload
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Avatar,
  TextField,
  Typography,
  useTheme,
  Button,
  Box,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// NOTE: if needed, we can use the same FORM component for multiple situations.

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chan_id = useSelector((state) => state.chan_id);
  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);
  const username = useSelector((state) => state.username);
  const first_name = useSelector((state) => state.first_name);
  const last_name = useSelector((state) => state.last_name);
  const [image, setImage] = useState(useSelector((state) => state.image));

  const { palette, transitions } = useTheme();

  // Schemas
  const profileSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    username: yup.string().required("required"),
    image: yup.string().required("required"),
  });

  // Initial Values
  const initialValuesProfile = {
    first_name: first_name,
    last_name: last_name,
    username: username,
    image: image,
  };

  // Send data to Backend + Save to local storage
  async function handleFormSubmit(values, onSubmitProps) {
    try {
      let returnedData;
      if (typeof values.image === "string") {
        console.log("Image Unchanged");
        let { data } = await axios.put(
          `${url}/users/noimage`,
          {
            first_name: values.first_name,
            last_name: values.last_name,
            username: values.username,
          },
          {
            headers: {
              Authorization: `Bearer ${chan_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        returnedData = data;
      } else {
        console.log("New Image");
        // Prep Image File
        const newFile = new File([values.image], values.image.name, {
          type: values.image.type,
        });
        let formDataValues = {
          first_name: values.first_name,
          last_name: values.last_name,
          username: values.username,
          image: newFile,
        };
        const formData = new FormData();
        for (let formDataValue in formDataValues) {
          formData.append(formDataValue, formDataValues[formDataValue]);
        }
        // Send Data
        let { data } = await axios.put(`${url}/users`, formData, {
          headers: { Authorization: `Bearer ${chan_token}` },
        });
        returnedData = data;
      }
      // Set State Info
      dispatch(
        setUserData({
          username: returnedData.username,
          first_name: returnedData.first_name,
          last_name: returnedData.last_name,
          image: returnedData.image,
        })
      );
      // onSubmitProps.resetForm();

      // Navigate Home
      navigate("/");
    } catch (error) {
      if (error?.response?.data?.message)
        console.log(error.response.data.message); // AxiosError
      else console.log(error.message);

      navigate("/error");
    }
  }

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
                      alt={username}
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
                  fullWidth
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
                  fullWidth
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
