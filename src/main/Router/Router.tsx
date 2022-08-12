import React from "react";
import { Routes, Route } from 'react-router-dom';
import { paths } from "library/common/constants";

import { AuthPanel } from 'features/AuthPanel';
import { ForgotPassword } from 'features/ForgotPassword';
import { PasswordReset } from 'features/PasswordReset';
import { ConfirmEmail } from "features/ConfirmEmail";
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
import { PermissionRoute } from "./PermissionRoute";
import { UserType } from "library/common/enums";

const { auth, admin, admin: { evaluations }, management } = paths;

export default function Router() {
  return (
    <Routes>

      {/* Routes for non authenticated users */}
      <Route element={<PublicRoute />}>
        <Route path={auth.index} element={<AuthPanel />}>
          <Route path={auth.login.index}  element={<Login />}  />
          <Route path={auth.confirmEmail.index} element={<ConfirmEmail />} />
          <Route path={auth.forgotPassword.index} element={<ForgotPassword />} />
          <Route path={auth.passwordReset.index} element={<PasswordReset />} />
        </Route>
      </Route>

      {/* Routes for authenticated users */}
      <Route element={<PrivateRoute />}>
        <Route path={admin.index} element={<AdminPanel />}>
          
          {/* Common routes */}
          <Route path={admin.settings.index} element={<Settings />} />
          <Route path={admin.index} element={<Dashboard />} />

          {/* Routes for users */}
          <Route element={<PermissionRoute for={[UserType.User]} />}>
            <Route path={admin.evaluations.index}>
              <Route index element={<EvaluationList />} />
              <Route path={evaluations.detail.index} element={<EvaluationDetail />} />
              <Route path={evaluations.init.index} element={<EvaluationInit />} />
            </Route>
          </Route>

          {/* Routes for administrators */}
          <Route element={<PermissionRoute for={[UserType.Admin, UserType.User]} />}>
            <Route path={management.users.index} element={<UserCrud />} />
            <Route path={management.domains.index} element={<DomainCrud />} />
            <Route path={management.lineaments.index} element={<LineamentCrud />} />
            <Route path={management.criterions.index} element={<CriterionCrud />} />
            <Route path={management.levels.index} element={<LevelCrud />} />
            <Route path={management.choices.index} element={<ChoiceCrud />} />
            <Route path={management.evaluations.index} element={<EvaluationCrud />} />
          </Route>
        </Route>
      </Route>

      {/* Routes for all users */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
