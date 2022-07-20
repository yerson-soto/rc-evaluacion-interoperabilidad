import { RouteObject } from "react-router-dom";
import { UserType } from 'library/common/enums';
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

interface RouteConfig extends RouteObject {
  permissions: UserType[] | 'none';
}

const routes: RouteConfig[] = [
  {
    path: paths.auth.index,
    permissions: 'none',
    element: <AuthPanel />,
    children: [
      { path: paths.auth.login.index, element: <Login /> },
      { path: paths.auth.forgotPassword.index, element: <ForgotPassword /> },
      { path: paths.auth.passwordReset.index, element: <PasswordReset /> },
    ],
  },
  {
    path: paths.admin,
    permissions: [UserType.Admin],
    element: <AdminPanel />,
    children: [
      { path: paths.users.index, element: <UserCrud /> },
      { path: paths.domains.index, element: <DomainCrud /> },
      { path: paths.lineaments.index, element: <LineamentCrud /> },
      { path: paths.criterions.index, element: <CriterionCrud /> },
      { path: paths.levels.index, element: <LevelCrud /> },
      { path: paths.choices.index, element: <ChoiceCrud /> },
      { path: paths.dashboard, element: <Dashboard /> },
      { path: paths.evaluations.index, children: [
        { index: true, element: <EvaluationList /> },
        { path: paths.evaluations.detail.index, element: <EvaluationDetail /> },
        { path: paths.evaluations.init.index, element: <EvaluationInit /> },
      ]},
    ],
  },
  { path: "*", element: <NotFound />, permissions: 'none' }
];

export default routes;
  