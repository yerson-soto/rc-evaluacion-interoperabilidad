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
      reverse: () => "/auth/recuperar",
    },
    passwordReset: {
      index: "restablecer",
      reverse: () => "/auth/restablecer",
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
  management: {
    domains: {
      index: "dominios",
      reverse: () => "/dominios",
    },
    lineaments: {
      index: "lineamientos",
      reverse: () => "/lineamientos",
    },
    criterions: {
      index: "criterios",
      reverse: () => "/criterios",
    },
    levels: {
      index: "niveles",
      reverse: () => "/niveles",
    },
    choices: {
      index: "respuestas",
      reverse: () => "/respuestas",
    },
    users: {
      index: "usuarios",
      reverse: () => "/usuarios",
    },
    evaluations: {
      index: "m/evaluaciones",
      reverse: () => "/m/evaluaciones",
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
