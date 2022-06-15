import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminPanel } from "features/AdminPanel";
import { Dashboard } from "features/Dashboard";
import { EvaluationList } from "features/EvaluationList";
import { EvaluationDetail } from "features/EvaluationDetail";
import { EvaluationTake } from "features/EvaluationTake";
import { store } from './store/index';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminPanel />}>
            <Route index element={<Dashboard />} />
            <Route path="evaluaciones" element={<EvaluationList />} />
            <Route path="evaluaciones/:slug" element={<EvaluationDetail />} />
            {/* <Route
              path="evaluaciones/:uid/iniciar"
              element={<EvaluationTake />}
            />
            <Route
              path="evaluaciones/:uid/iniciar/:domain-slug"
              element={<EvaluationTake />}
            /> */}

            <Route path="evaluaciones/:uid/iniciar">
              <Route index element={<EvaluationTake />} />
              <Route path=":slug" element={<EvaluationTake />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
