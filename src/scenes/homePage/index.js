import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";
import RefreshData from "../../widgets/RefreshData";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chan_id = useSelector((state) => state.chan_id);
  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);

  useEffect(() => {
    RefreshData(dispatch, chan_token, url, chan_id);
  }, []);

  return (
    <div>
      <button onClick={() => dispatch(setLogout())}>Sign Out</button>
      <button onClick={() => navigate("/editprofile")}>Edit Profile</button>
      Home
    </div>
  );
}

export default Home;
