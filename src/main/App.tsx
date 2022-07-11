import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminPanel } from "features/AdminPanel";
import { Dashboard } from "features/Dashboard";
import { EvaluationList } from "features/EvaluationList";
import { EvaluationDetail } from "features/EvaluationDetail";
import { EvaluationInit } from "features/EvaluationInit";
import { store } from "./store/index";
import { paths } from "library/common/constants";
import { Login } from "features/Login";
import { AuthPanel } from "features/AuthPanel";
import { PasswordReset } from "features/PasswordReset";
import { ForgotPassword } from "features/ForgotPassword";
import { NotFound } from "features/NotFound";
import { DomainCrud } from "features/DomainCrud";
import Crud from '../library/components/Crud/Crud';

function App() {
  const basename = process.env.PUBLIC_URL;

  return (
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path={paths.auth.index} element={<AuthPanel />}>
            <Route path={paths.auth.login.index} element={<Login />} />
            <Route
              path={paths.auth.forgotPassword.index}
              element={<ForgotPassword />}
            />
            <Route
              path={paths.auth.passwordReset.index}
              element={<PasswordReset />}
            />
          </Route>

          <Route path={paths.admin} element={<AdminPanel />}>
            <Route path={paths.dashboard} element={<Dashboard />} />
            <Route path={paths.evaluations.index}>
              <Route index element={<EvaluationList />} />
              <Route
                path={paths.evaluations.detail.index}
                element={<EvaluationDetail />}
              />
              <Route
                path={paths.evaluations.init.index}
                element={<EvaluationInit />}
              />
            </Route>

            <Route path={paths.domains.index} element={<Crud />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
