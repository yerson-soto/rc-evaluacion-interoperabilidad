export const urls = {
  home: {
    path: "/"
  },
  evaluations: {
    path: "evaluaciones",
    detail: {
      path: ":uid",
      reverse: ({ uid }: { uid: string }) => {
        return `/evaluaciones/${uid}`;
      },
    },
    init: {
      path: ":uid/iniciar",
      reverse: ({ uid }: { uid: string }) => {
        return  `/evaluaciones/${uid}/iniciar`;
      },
    },
  },
};
