import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./scenes/homePage";
import Login from "./scenes/loginPage";
import Form from "./scenes/loginPage/Form";
function App() {
  const isAuth = Boolean(useSelector((state) => state.chan_token));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Login />} />
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/editprofile"
            element={isAuth ? <Form /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
