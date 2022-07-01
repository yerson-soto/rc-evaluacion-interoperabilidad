export const paths = {
  auth: {
    index: "auth",
    login: {
      index: "iniciar-sesion",
      reverse: () => "/iniciar-sesion"
    },
    signup: {
      index: "registrarse",
      reverse: () => "/registrarse"
    },
    passwordReset: {
      index: "restablecer-p",
      reverse: () => "/restablecer-p"
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
};
