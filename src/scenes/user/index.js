import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GetUser } from "../../api/users/UserCalls.js";
import { useSelector } from "react-redux";

function User() {
  let [user, setUser] = useState({});
  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);
  let { chan_id } = useParams();

  async function getUserData() {
    try {
      const res = await GetUser({
        url: url,
        chan_token: chan_token,
        chan_id: chan_id,
      });
      setUser(res);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <button onClick={() => getUserData()}>Get User</button>
      User {chan_id}
    </div>
  );
}

export default User;
