import React from "react";
import { setUserData } from "../state";

// Refreshes Redux User Data
function RefreshData(dispatch, chan_token, url, chan_id) {
  // Call backend with google_id and email
  console.log("Refresh");
  fetch(`${url}/users?chan_id=${chan_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${chan_token}`,
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    console.log(res);
    if (res.ok) {
      console.log("User Found");
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
    } else {
      throw new Error("User Not Found");
    }
  });
}

export default RefreshData;
