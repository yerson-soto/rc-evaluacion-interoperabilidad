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
      index: "clave-olvidada",
      reverse: () => "/auth/clave-olvidada"
    },
    passwordReset: {
      index: "restablecer-clave",
      reverse: () => "/auth/restablecer-clave"
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
  domains: {
    index: "dominios",
  },
  lineaments: {
    index: "lineamientos"
  },
  criterions: {
    index: "criterios"
  }
};
