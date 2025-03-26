import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QuestyQueryProvider } from "./services/questy/query-provider";
import SignIn from "./pages/auth/sign-in/SignIn";
import SignUp from "./pages/auth/sign-up/Signup";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import PrivateRoute from "./routes/PrivateRoute";
import AuthRoute from "./routes/AuthRoute";
import Projects from "./pages/app/projects/Projects";
import EditProject from "./pages/app/project/EditProject";
import Project from "./pages/app/project/Project";
import CreateProject from "./pages/app/project/CreateProject";
import Board from "./pages/app/project/board/Board";
import Members from "./pages/app/project/members/Members";
import Backlog from "./pages/app/project/backlog/Backlog";
import Settings from "./pages/app/project/settings/Settings";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QuestyQueryProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" />} />

        <Route element={<AuthRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/recover-password" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/projects" element={<Projects />} />

          <Route path="/project">
            <Route path="create" element={<CreateProject />} />
            <Route path=":projectId">
              <Route index element={<Project />} />
              <Route path="edit" element={<EditProject />} />
              <Route path="board" element={<Board />} />
              <Route path="members" element={<Members />} />
              <Route path="backlog" element={<Backlog />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QuestyQueryProvider>
);
