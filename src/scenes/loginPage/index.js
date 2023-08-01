import React from "react";
import * as jose from "jose";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setToken, setUserData } from "../../state";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = useSelector((state) => state.url);
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "140233552046-gbopbqudj3j1004ks3agmqgo8f1ho23m.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  // Google Callback Function
  function handleCredentialResponse(response) {
    var userObject = jose.decodeJwt(response.credential);

    // Set Login Info
    dispatch(setLogin({ email: userObject.email, google_id: userObject.sub }));

    // Call backend with google_id and email
    fetch(
      `${url}/auth/hasuser?email=${userObject.email}&google_id=${userObject.sub}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      if (res.ok) {
        // User Found: set User Data + ChanToken from backend, redirect to /home
        let data = await res.json();
        dispatch(setToken({ chan_token: data.token }));
        dispatch(
          setUserData({
            userName: data.user.username,
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            profileUrl: data.user.url,
          })
        );
        navigate("/home");
      } else {
        // No User Found: Set User Data from Google + Create New User + route to /editprofile
        dispatch(
          setUserData({
            userName: userObject.name,
            firstName: userObject.given_name,
            lastName: userObject.family_name,
            profileUrl: userObject.picture,
          })
        );
        // Make New User w/ FormData
        // Fetch the file
        fetch(userObject.picture).then(async (res) => {
          if (res.ok) {
            // Get the Image File from url
            const blob = await res.blob();
            const file = new File([blob], `${userObject.name}.jpg`, {
              type: blob.type,
            });
            let values = {
              email: userObject.email,
              google_id: userObject.sub,
              first_name: userObject.given_name,
              last_name: userObject.family_name,
              username: userObject.name,
            };
            const formData = new FormData();
            for (let value in values) {
              formData.append(value, values[value]);
            }

            formData.append("image", file);

            fetch(`${url}/auth/signup`, {
              method: "POST",
              body: formData,
            }).then(async (res) => {
              if (res.ok) {
                navigate("/editprofile");
              } else {
                let data = await res.json();
                console.log(data);
              }
            });
          } else {
            throw new Error(`File Download Failed: ${response.status}`);
          }
        });
      }
    });
  }

  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
}

export default Login;
