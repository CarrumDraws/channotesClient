import React from "react";
import { useParams } from "react-router-dom";
function User() {
  let { chan_id } = useParams();
  return <div>User {chan_id}</div>;
}

export default User;
