import { UserType } from "./enums";
import { getText } from "i18n";

export const paths = {
  auth: {
    index: "auth",
    login: {
      index: "iniciar-sesion",
      reverse: () => "/auth/iniciar-sesion",
    },
    signup: {
      index: "registrarse",
      reverse: () => "/auth/registrarse",
    },
    confirmEmail: {
      index: "confirmar-correo",
      reverse: () => "/auth/confirmar-correo"
    },
    forgotPassword: {
      index: "verificar",
      reverse: () => "/auth/verificar",
    },
    passwordReset: {
      index: "restablecer",
      reverse: () => "/auth/restablecer",
    },
  },
  management: {
    index: "mat",
    domains: {
      index: "dominios",
      reverse: () => "/mat/dominios",
    },
    lineaments: {
      index: "lineamientos",
      reverse: () => "/mat/lineamientos",
    },
    criterions: {
      index: "criterios",
      reverse: () => "/mat/criterios",
    },
    levels: {
      index: "niveles",
      reverse: () => "/mat/niveles",
    },
    choices: {
      index: "respuestas",
      reverse: () => "/mat/respuestas",
    },
    users: {
      index: "usuarios",
      reverse: () => "/mat/usuarios",
    },
    evaluations: {
      index: "evaluaciones",
      reverse: () => "/mat/evaluaciones",
    },
  },
  admin: {
    index: "/",
    settings: { index: "/settings" },
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
  },
};

export const keys = {
  linkTokenParam: "token",
  tokenLocalStorage: "mdmitkn",
};

export const roleLabels = {
  [UserType.User]: getText("roles.user"),
  [UserType.Support]: getText("roles.support"),
  [UserType.Admin]: getText("roles.admin"),
};

export const roleColors = {
  [UserType.User]: "orange",
  [UserType.Support]: "green",
  [UserType.Admin]: "blue",
};
