import { getText } from "i18n";
import { UserType, ContentType, EvaluationStatus } from "./enums";

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
      index: "recuperar",
      reverse: () => "/auth/recuperar",
    },
    passwordReset: {
      index: "restablecer",
      reverse: () => "/auth/restablecer",
    },
  },
  admin: {
    index: "/",
    settings: { 
      index: "configuracion",
      target: {
        index: ":tab",
        reverse: ({ tab }: { tab: string }) => `/configuracion/${tab}`,
      },
    },
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
    maturityModel: { index: "/modelo-de-madurez" }
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
    }
  },
};

export const keys = {
  linkTokenParam: "token",
  tokenLocalStorage: "jwt",
  domainParamName: "d"
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

export const contentTypeLabels = {
  [ContentType.TEXT]: getText('contentTypes.plain_text'),
  [ContentType.JPG]: getText('contentTypes.jpg'),
  [ContentType.PNG]: getText('contentTypes.png'),
  [ContentType.JPEG]: getText('contentTypes.jpeg'),
  [ContentType.CSV]: getText('contentTypes.csv'),
  [ContentType.PDF]: getText('contentTypes.pdf'),
  [ContentType.DOC]: getText('contentTypes.doc'),
  [ContentType.DOCX]: getText('contentTypes.docx'),
  [ContentType.XLS]: getText('contentTypes.xls'),
  [ContentType.XLSX]: getText('contentTypes.xlsx'),
};

export const evaluationStatusLabels = {
  [EvaluationStatus.Created]: getText('status.created'),
  [EvaluationStatus.Pending]: getText('status.pending'),
  [EvaluationStatus.Completed]: getText('status.Completada'),
}

export const evaluationStatusType = {
  [EvaluationStatus.Created]: "warning",
  [EvaluationStatus.Pending]: "processing",
  [EvaluationStatus.Completed]: "success",
}