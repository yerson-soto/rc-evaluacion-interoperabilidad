import { getText } from "i18n";
import { UserType, ContentType, EvaluationStatus } from "./enums";

export const paths = {
  auth: {
    index: "/auth",
    login: {
      index: "iniciar-sesion",
      fullPath: "/auth/iniciar-sesion",
    },
    signup: {
      index: "registrarse",
      fullPath: "/auth/registrarse",
    },
    confirmEmail: {
      index: "confirmar-correo",
      fullPath: "/auth/confirmar-correo"
    },
    forgotPassword: {
      index: "recuperar",
      fullPath: "/auth/recuperar",
    },
    passwordReset: {
      index: "restablecer",
      fullPath: "/auth/restablecer",
    },
  },
  admin: {
    index: "/",
    settings: { 
      index: "/configuracion",
      general: {
        index: "general",
        fullPath: "/configuracion/general"
      },
      password: {
        index: "password",
        fullPath: "/configuracion/password",
      },
    },
    evaluations: {
      index: "/evaluaciones",
      detail: {
        index: ":uid",
        fullPath: '/evaluaciones/:uid',
        reverse: ({ uid }: { uid: string }) => `/evaluaciones/${uid}`,
      },
      init: {
        index: ":uid/iniciar",
        fullPath: "/evaluaciones/:uid/iniciar",
        reverse: ({ uid }: { uid: string }) => `/evaluaciones/${uid}/iniciar`,
      },
    },
    maturityModel: { 
      index: "/modelo-de-madurez" 
    },
    schedule: {
      index: "/calendario"
    },
    ranking: {
      index: "/puntuaciones"
    }
    
  },
  management: {
    domains: {
      index: "/dominios",
      fullPath: "/dominios",
    },
    lineaments: {
      index: "lineamientos",
      fullPath: "/lineamientos",
    },
    criterions: {
      index: "criterios",
      fullPath: "/criterios",
    },
    levels: {
      index: "niveles",
      fullPath: "/niveles",
    },
    choices: {
      index: "respuestas",
      fullPath: "/respuestas",
    },
    users: {
      index: "usuarios",
      fullPath: "/usuarios",
    }
  },
};

export const keys = {
  linkTokenParam: "token",
  tokenLocalStorage: "jwt",
  domainParamName: "d",
  viewParamName: "view",
  actionParamName: "action"
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

// TODO: Use translation only inside React lifecycle
export const evStatusLabels = {
  [EvaluationStatus.Scheduled]: getText('status.scheduled'),
  [EvaluationStatus.Started]: getText('status.started'),
  [EvaluationStatus.Pending]: getText('status.pending'),
  [EvaluationStatus.Completed]: getText('status.completed'),
}

export const evaluationStatus = {
  [EvaluationStatus.Scheduled]: "error",
  [EvaluationStatus.Started]: "warning",
  [EvaluationStatus.Pending]: "processing",
  [EvaluationStatus.Completed]: "success",
}

export const levelColors = [
  "#fce4d7", 
  "#fff1cf", 
  "#feffd5", 
  "#e2efda", 
  "#c6e0b3"
]