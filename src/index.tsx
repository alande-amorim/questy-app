import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/Signup";
import RecoverPassword from "./pages/recover-password/RecoverPassword";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route index path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
    </Routes>
  </BrowserRouter>
);
