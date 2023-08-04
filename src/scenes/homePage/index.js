import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";
function Home() {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(setLogout())}>Sign Out</button>
      Home
    </div>
  );
}

export default Home;
