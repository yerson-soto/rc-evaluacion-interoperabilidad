import React from "react";
import { Routes, Route } from 'react-router-dom';
import { paths } from "library/common/constants";

import { AuthPanel } from 'features/AuthPanel';
import { ForgotPassword } from 'features/ForgotPassword';
import { PasswordReset } from 'features/PasswordReset';
import { Login } from 'features/Login';

import { AdminPanel } from 'features/AdminPanel';
import { Dashboard } from 'features/Dashboard';
import { EvaluationList } from 'features/EvaluationList';
import { EvaluationDetail } from 'features/EvaluationDetail';
import { EvaluationInit } from 'features/EvaluationInit';
import { DomainCrud } from 'features/DomainCrud';
import { UserCrud } from 'features/UserCrud';
import { ChoiceCrud } from "features/ChoiceCrud";
import { LevelCrud } from "features/LevelCrud";
import { CriterionCrud } from "features/CriterionCrud";
import { LineamentCrud } from "features/LineamentCrud";
import { NotFound } from 'features/NotFound';
import { Settings } from 'features/Settings';
import { EvaluationCrud } from 'features/EvaluationCrud';

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export default function Router() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={paths.auth.index} element={<AuthPanel />}>
          <Route
            path={paths.auth.login.index} 
            element={<Login />} 
          />
          <Route
            path={paths.auth.forgotPassword.index}
            element={<ForgotPassword />}
          />
          <Route
            path={paths.auth.passwordReset.index}
            element={<PasswordReset />}
          />
        </Route>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path={paths.admin} element={<AdminPanel />}>
          <Route
            path={paths.dashboard} 
            element={<Dashboard />} 
          />
          <Route 
            path={paths.users.index} 
            element={<UserCrud />} 
          />
          <Route 
            path={paths.settings.index}
            element={<Settings />}
          />
          <Route 
            path={paths.domains.index} 
            element={<DomainCrud />} 
          />
          <Route 
            path={paths.lineaments.index} 
            element={<LineamentCrud />} 
          />
          <Route 
            path={paths.criterions.index} 
            element={<CriterionCrud />} 
          />
          <Route 
            path={paths.levels.index} 
            element={<LevelCrud />} 
          />
          <Route 
            path={paths.choices.index} 
            element={<ChoiceCrud />} 
          />
          <Route 
            path={paths.evaluationsCrud.index} 
            element={<EvaluationCrud />} 
          />
          
          <Route path={paths.evaluations.index}>
            <Route 
              index
              element={<EvaluationList />} 
            />
            <Route
              path={paths.evaluations.detail.index}
              element={<EvaluationDetail />}
            />
            <Route
              path={paths.evaluations.init.index}
              element={<EvaluationInit />}
            />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
