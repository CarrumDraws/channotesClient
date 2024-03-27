import React from "react";
import * as jose from "jose";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setChanData, setUserData } from "../../state";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = useSelector((state) => state.url);
  const { palette, transitions } = useTheme();

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "140233552046-gbopbqudj3j1004ks3agmqgo8f1ho23m.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "filled_black",
      size: "large",
      shape: "pill",
      type: "standard",
      text: "signin_with",
    });
    google.accounts.id.prompt();
  }, []);

  // Google Callback Function
  async function handleCredentialResponse(response) {
    var userObject = jose.decodeJwt(response.credential);
    try {
      let { data } = await axios.get(
        `${url}/auth/hasuser?email=${userObject.email}&google_id=${userObject.sub}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      // [User Found]
      console.log("Existing User Found");

      // Set State Info
      SetInfo(data);

      // Navigate Home
      navigate("/home");
    } catch (error) {
      // [New User]
      console.log("New User");
      try {
        // Fetch Image File
        const image = await fetch(userObject.picture);
        const blob = await image.blob();
        const file = new File([blob], `${userObject.name}.jpg`, {
          type: blob.type,
        });
        // Prep FormData (Used for file upload)
        let values = {
          google_id: userObject.sub,
          first_name: userObject.given_name,
          last_name: userObject.family_name,
          username: userObject.name,
          email: userObject.email,
          image: file,
        };
        const formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        // Create New User
        try {
          let { data } = await axios.post(`${url}/auth/signup`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          // Set State Info
          SetInfo(data);

          // 3. Navigate to Edit Profile
          navigate("/editprofile");
        } catch (error) {
          if (error?.response?.data?.message)
            console.log(error.response.data.message); // AxiosError
          else console.log("User Creation Error");
        }
      } catch (error) {
        console.log("Image Creation Error");
      }
    }
  }

  function SetInfo(data) {
    // Set State Info
    dispatch(
      setLogin({
        email: data.user.email,
        google_id: data.user.google_id,
      })
    );
    dispatch(
      setChanData({
        chan_id: data.user.chan_id,
        chan_token: data.token,
      })
    );
    dispatch(
      setUserData({
        username: data.user.username,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        image: data.user.image,
      })
    );
  }

  return (
    <Box
      gap={2}
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
      <Typography variant="large">ChanNotes</Typography>
      <Typography variant="exSmall">Start Notetaking Today</Typography>
      <Box
        sx={{
          maxWidth: "217.7px",
        }}
        id="signInDiv"
      />
    </Box>
  );
}

export default Login;
