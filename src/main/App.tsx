import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminPanel } from "features/AdminPanel";
import { Dashboard } from "features/Dashboard";
import { EvaluationList } from "features/EvaluationList";
import { EvaluationDetail } from "features/EvaluationDetail";
import { EvaluationInit } from "features/EvaluationInit";
import { store } from "./store/index";
import { urls } from "library/common/constants";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={urls.home.path} element={<AdminPanel />}>
            <Route index element={<Dashboard />} />

            <Route path={urls.evaluations.path}>
              <Route index element={<EvaluationList />} />
              <Route
                path={urls.evaluations.detail.path}
                element={<EvaluationDetail />}
              />
              <Route
                path={urls.evaluations.init.path}
                element={<EvaluationInit />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
