import React from "react";
import * as jose from "jose";
import { useEffect } from "react";
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
  function handleCredentialResponse(response) {
    var userObject = jose.decodeJwt(response.credential);

    // Set Login Info
    dispatch(
      setLogin({
        email: userObject.email,
        google_id: userObject.sub,
        chan_id: userObject.chan_id,
      })
    );

    // Call backend with google_id and email
    fetch(
      `${url}/auth/hasuser?email=${userObject.email}&google_id=${userObject.sub}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      if (res.ok) {
        console.log("User Found");
        let data = await res.json();
        // User Found: set User Data + ChanToken from backend, redirect to /home
        dispatch(
          setChanData({ chan_id: data.user.chan_id, chan_token: data.token })
        );
        dispatch(
          setUserData({
            username: data.user.username,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            image: data.user.image,
          })
        );
        navigate("/home");
      } else {
        // No User Found: Create New User + get newly created user + Set User Data from Google + route to /editprofile

        // 1. Make New User w/ FormData
        // 1a. Fetch the file
        console.log("User Not Found");
        fetch(userObject.picture).then(async (res) => {
          if (res.ok) {
            // 1b. Get the Image File from url
            const blob = await res.blob();
            // (Use Username as image name. )
            const file = new File([blob], `${userObject.name}.jpg`, {
              type: blob.type,
            });
            let values = {
              email: userObject.email,
              google_id: userObject.sub,
              first_name: userObject.given_name,
              last_name: userObject.family_name,
              username: userObject.name,
              image: file,
            };
            const formData = new FormData();
            for (let value in values) {
              formData.append(value, values[value]);
            }

            // 1c. Create New User
            fetch(`${url}/auth/signup`, {
              method: "POST",
              body: formData,
            }).then(async (res) => {
              if (res.ok) {
                // 2. Set User Data from Google
                let data = await res.json();
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
                // 3. Navigate
                navigate("/editprofile");
              } else {
                let data = await res.json();
                console.log(data);
              }
            });
          } else {
            console.log("File Download Failed");
            throw new Error(`File Download Failed: ${response.status}`);
          }
        });
      }
    });
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