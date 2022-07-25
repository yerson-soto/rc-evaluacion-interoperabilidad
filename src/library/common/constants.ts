import { UserType } from './enums';
import { getText } from 'i18n';

export const paths = {
  auth: {
    index: "auth",
    login: {
      index: "iniciar-sesion",
      reverse: () => "/auth/iniciar-sesion"
    },
    signup: {
      index: "registrarse",
      reverse: () => "/auth/registrarse"
    },
    forgotPassword: {
      index: "verificar",
      reverse: () => "/auth/verificar"
    },
    passwordReset: {
      index: "restablecer",
      reverse: () => "/auth/restablecer"
    }
  },
  admin: "/",  
  dashboard: "",
  evaluations: {
    index: "evaluaciones",
    detail: {
      index: ":uid",
      reverse: ({ uid }: { uid: string }) => `/evaluaciones/${uid}`,
    },
    init: {
      index: ":uid/iniciar",
      reverse: ({ uid }: { uid: string }) => `/evaluaciones/${uid}/iniciar`,
    },
  },
  domains: { index: "/admin/dominios" },
  lineaments: { index: "/admin/lineamientos" },
  criterions: { index: "/admin/criterios" },
  levels: { index: "/admin/niveles" },
  choices: { index: "/admin/respuestas" },
  users: { index: "/admin/usuarios" },
  settings: { index: "/settings" },
  evaluationsCrud: { index: "admin/evaluaciones" },
};

export const keys = {
  resetTokenParam: 'token',
  tokenLocalStorage: 'mdmitkn'
}

export const roleLabels = {
  [UserType.Admin]: getText("roles.admin"),
  [UserType.Role2]: getText("roles.role2"),
  [UserType.Role3]: getText("roles.role3"),
}

export const roleColors = {
  [UserType.Admin]: "blue",
  [UserType.Role2]: "orange",
  [UserType.Role3]: "green",
}
