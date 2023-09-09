import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";
import RefreshData from "../../widgets/RefreshData";
function Home() {
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
      Home
    </div>
  );
}

export default Home;
