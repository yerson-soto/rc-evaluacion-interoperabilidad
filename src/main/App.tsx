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
import { LineamentCrud } from "features/LineamentCrud";

function App() {
  // Create feature to prevent useList executes many times in range of time
  // useInitialData();
  
  const basename = process.env.PUBLIC_URL;

  // TODO: Refactor as object
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

            <Route path={paths.domains.index} element={<DomainCrud />} />
            <Route path={paths.lineaments.index} element={<LineamentCrud />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
