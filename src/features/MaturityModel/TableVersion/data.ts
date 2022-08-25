export const data = [
  {
    id: 24,
    domainResponse: {
      id: 3,
      color: "#dae1f3",
      description: "Semántico",
      acronym: "SM",
      slug: "semantico",
    },
    description: "Diseño técnico de los servicios",
    lineamentsResponses: [
      {
        id: 42,
        description: "LI.I15D.TE.05",
        definictionLineament:
          "Preferiblemente usar la arquitectura y metodología propuesta en este Marco de Interoperabilidad para la implementación de servicios de intercambio de información en las entidades\n",
        numberLineament: 5,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 40,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 41,
        responseDecription:
          "Existen varias personas responsables de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "971a3b40-4c5c-4aee-0ce3-08da81df366a",
            title: "Cedula",
            contentType: "image/jpeg,image/png,image/jpg",
            responsesId: 0,
          },
          {
            id: "73a0df2e-8b1c-4220-0ce4-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
          {
            id: "936136f4-aa74-4856-fa5c-08da8475383a",
            title: "Acta",
            contentType: "application/pdf",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 42,
        responseDecription:
          "Existe un único responsable de intercambio de información pero no es formal\n",
        levelsResponse: {
          levelsId: 3,
          level: "NIVEL 3",
          description: "INTERMEDIO",
          levelDescription:
            "La entidad ha venido trabajando en la implementación de los lineamientos del Marco de Interoperabilidad en algunos de sus servicios de intercambio de información\n",
          levelValue: 3,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 45,
        responseDecription: "Respuesta Nivel 4\n",
        levelsResponse: {
          levelsId: 4,
          level: "NIVEL 4",
          description: "CONSOLIDADO",
          levelDescription:
            "La entidad ha logrado que la implementación de los lineamientos del Marco de Interoperabilidad del Estado sea un tema conocido a nivel institucional sin embargo no ha logrado involucrar a todos los interesados\n",
          levelValue: 4,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "793b3b57-922d-4b5c-95eb-08da85fcbb11",
            title: "Texto",
            contentType: "text/plain",
            responsesId: 0,
          },
          {
            id: "7146dc91-8992-403f-95ec-08da85fcbb11",
            title: "Cedula",
            contentType: "image/jpg,image/png,image/jpeg",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 342,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 5,
          level: "NIVEL 5",
          description: "INSTITUCIONALIZADO",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
    ],
  },
  {
    id: 20,
    domainResponse: {
      id: 2,
      color: "#fce5d7",
      description: "Político Legal",
      acronym: "LG",
      slug: "politico-legal",
    },
    description: "Lenguaje común de intercambio de información",
    lineamentsResponses: [
      {
        id: 31,
        description: "LI.I15D.SM.01",
        definictionLineament:
          "Se debe utilizar el estándar de lenguaje común para el intercambio de información entre entidades\n",
        numberLineament: 1,
        criterions: null,
        domainResponse: null,
      },
      {
        id: 33,
        description: "LI.I15D.SM.03",
        definictionLineament:
          "Incorporación de estándares internacionales para el intercambio de información\n",
        numberLineament: 3,
        criterions: null,
        domainResponse: null,
      },
      {
        id: 34,
        description: "LI.I15D.SM.04",
        definictionLineament:
          "Los servicios de intercambio de información de las entidades deben cumplir con los niveles de notificación de cumplimiento establecidos para la implementación del estándar\n",
        numberLineament: 4,
        criterions: null,
        domainResponse: null,
      },
      {
        id: 36,
        description: "LI.I15D.SM.06",
        definictionLineament:
          "Realizar un uso adecuado del estándar de lenguaje común de intercambio de información\n",
        numberLineament: 6,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 40,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 41,
        responseDecription:
          "Existen varias personas responsables de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "971a3b40-4c5c-4aee-0ce3-08da81df366a",
            title: "Cedula",
            contentType: "image/jpeg,image/png,image/jpg",
            responsesId: 0,
          },
          {
            id: "73a0df2e-8b1c-4220-0ce4-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
          {
            id: "936136f4-aa74-4856-fa5c-08da8475383a",
            title: "Acta",
            contentType: "application/pdf",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 42,
        responseDecription:
          "Existe un único responsable de intercambio de información pero no es formal\n",
        levelsResponse: {
          levelsId: 3,
          level: "NIVEL 3",
          description: "INTERMEDIO",
          levelDescription:
            "La entidad ha venido trabajando en la implementación de los lineamientos del Marco de Interoperabilidad en algunos de sus servicios de intercambio de información\n",
          levelValue: 3,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 45,
        responseDecription: "Respuesta Nivel 4\n",
        levelsResponse: {
          levelsId: 4,
          level: "NIVEL 4",
          description: "CONSOLIDADO",
          levelDescription:
            "La entidad ha logrado que la implementación de los lineamientos del Marco de Interoperabilidad del Estado sea un tema conocido a nivel institucional sin embargo no ha logrado involucrar a todos los interesados\n",
          levelValue: 4,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "793b3b57-922d-4b5c-95eb-08da85fcbb11",
            title: "Texto",
            contentType: "text/plain",
            responsesId: 0,
          },
          {
            id: "7146dc91-8992-403f-95ec-08da85fcbb11",
            title: "Cedula",
            contentType: "image/jpg,image/png,image/jpeg",
            responsesId: 0,
          },
        ],
      },
    ],
  },
  {
    id: 25,
    domainResponse: {
      id: 1,
      color: "#e2efdb",
      description: "Organizacional",
      acronym: "OG",
      slug: "organizacional",
    },
    description: "Pruebas de los servicios web",
    lineamentsResponses: [
      {
        id: 42,
        description: "LI.I15D.TE.05",
        definictionLineament:
          "Preferiblemente usar la arquitectura y metodología propuesta en este Marco de Interoperabilidad para la implementación de servicios de intercambio de información en las entidades\n",
        numberLineament: 5,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 40,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 41,
        responseDecription:
          "Existen varias personas responsables de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "971a3b40-4c5c-4aee-0ce3-08da81df366a",
            title: "Cedula",
            contentType: "image/jpeg,image/png,image/jpg",
            responsesId: 0,
          },
          {
            id: "73a0df2e-8b1c-4220-0ce4-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
          {
            id: "936136f4-aa74-4856-fa5c-08da8475383a",
            title: "Acta",
            contentType: "application/pdf",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 42,
        responseDecription:
          "Existe un único responsable de intercambio de información pero no es formal\n",
        levelsResponse: {
          levelsId: 3,
          level: "NIVEL 3",
          description: "INTERMEDIO",
          levelDescription:
            "La entidad ha venido trabajando en la implementación de los lineamientos del Marco de Interoperabilidad en algunos de sus servicios de intercambio de información\n",
          levelValue: 3,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 45,
        responseDecription: "Respuesta Nivel 4\n",
        levelsResponse: {
          levelsId: 4,
          level: "NIVEL 4",
          description: "CONSOLIDADO",
          levelDescription:
            "La entidad ha logrado que la implementación de los lineamientos del Marco de Interoperabilidad del Estado sea un tema conocido a nivel institucional sin embargo no ha logrado involucrar a todos los interesados\n",
          levelValue: 4,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "793b3b57-922d-4b5c-95eb-08da85fcbb11",
            title: "Texto",
            contentType: "text/plain",
            responsesId: 0,
          },
          {
            id: "7146dc91-8992-403f-95ec-08da85fcbb11",
            title: "Cedula",
            contentType: "image/jpg,image/png,image/jpeg",
            responsesId: 0,
          },
        ],
      },
    ],
  },
  {
    id: 18,
    domainResponse: {
      id: 1,
      color: "#e2efdb",
      description: "Organizacional",
      acronym: "OG",
      slug: "organizacional",
    },
    description: "Normatividad para el intercambio de información",
    lineamentsResponses: [
      {
        id: 28,
        description: "LI.I15D.LG.01",
        definictionLineament:
          "Establecer los instrumentos legales que faciliten el uso o prestación de los servicios de intercambio de información\n",
        numberLineament: 1,
        criterions: null,
        domainResponse: null,
      },
      {
        id: 29,
        description: "LI.I15D.LG.02",
        definictionLineament:
          "Establecer la responsabilidad legal para la provisión de los servicios de intercambio de información de cada una de las partes involucradas\n",
        numberLineament: 2,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 43,
        responseDecription:
          "En la entidad no existe una gestión por procesos\n",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 17,
          description: "Adecuación de procesos",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 44,
        responseDecription:
          "La entidad tiene documentados sus procesos pero están desactualizados\n",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 17,
          description: "Adecuación de procesos",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "ed0d0d27-5b83-4641-0ce5-08da81df366a",
            title: "Excel",
            contentType: "application/vnd.ms-excel",
            responsesId: 0,
          },
        ],
      },
    ],
  },
  {
    id: 19,
    domainResponse: {
      id: 1,
      color: "#e2efdb",
      description: "Organizacional",
      acronym: "OG",
      slug: "organizacional",
    },
    description: "Manejo de la información confidencial y personal",
    lineamentsResponses: [
      {
        id: 30,
        description: "LI.I15D.LG.03",
        definictionLineament:
          "Garantizar el manejo adecuado de la información confidencial y la protección de datos personales\n",
        numberLineament: 3,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 40,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 41,
        responseDecription:
          "Existen varias personas responsables de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "971a3b40-4c5c-4aee-0ce3-08da81df366a",
            title: "Cedula",
            contentType: "image/jpeg,image/png,image/jpg",
            responsesId: 0,
          },
          {
            id: "73a0df2e-8b1c-4220-0ce4-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
          {
            id: "936136f4-aa74-4856-fa5c-08da8475383a",
            title: "Acta",
            contentType: "application/pdf",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 42,
        responseDecription:
          "Existe un único responsable de intercambio de información pero no es formal\n",
        levelsResponse: {
          levelsId: 3,
          level: "NIVEL 3",
          description: "INTERMEDIO",
          levelDescription:
            "La entidad ha venido trabajando en la implementación de los lineamientos del Marco de Interoperabilidad en algunos de sus servicios de intercambio de información\n",
          levelValue: 3,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 45,
        responseDecription: "Respuesta Nivel 4\n",
        levelsResponse: {
          levelsId: 4,
          level: "NIVEL 4",
          description: "CONSOLIDADO",
          levelDescription:
            "La entidad ha logrado que la implementación de los lineamientos del Marco de Interoperabilidad del Estado sea un tema conocido a nivel institucional sin embargo no ha logrado involucrar a todos los interesados\n",
          levelValue: 4,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "793b3b57-922d-4b5c-95eb-08da85fcbb11",
            title: "Texto",
            contentType: "text/plain",
            responsesId: 0,
          },
          {
            id: "7146dc91-8992-403f-95ec-08da85fcbb11",
            title: "Cedula",
            contentType: "image/jpg,image/png,image/jpeg",
            responsesId: 0,
          },
        ],
      },
    ],
  },
  {
    id: 15,
    domainResponse: {
      id: 2,
      color: "#fce5d7",
      description: "Político Legal",
      acronym: "LG",
      slug: "politico-legal",
    },
    description: "Liderazgo del Marco de Interoperabilidad",
    lineamentsResponses: [
      {
        id: 26,
        description: "LI.I15D.OG.04",
        definictionLineament:
          "Divulgar las necesidades, el alcance y los compromisos de los servicios de intercambio de información entre los actores involucrados\n",
        numberLineament: 4,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 40,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 41,
        responseDecription:
          "Existen varias personas responsables de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "971a3b40-4c5c-4aee-0ce3-08da81df366a",
            title: "Cedula",
            contentType: "image/jpeg,image/png,image/jpg",
            responsesId: 0,
          },
          {
            id: "73a0df2e-8b1c-4220-0ce4-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
          {
            id: "936136f4-aa74-4856-fa5c-08da8475383a",
            title: "Acta",
            contentType: "application/pdf",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 42,
        responseDecription:
          "Existe un único responsable de intercambio de información pero no es formal\n",
        levelsResponse: {
          levelsId: 3,
          level: "NIVEL 3",
          description: "INTERMEDIO",
          levelDescription:
            "La entidad ha venido trabajando en la implementación de los lineamientos del Marco de Interoperabilidad en algunos de sus servicios de intercambio de información\n",
          levelValue: 3,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 45,
        responseDecription: "Respuesta Nivel 4\n",
        levelsResponse: {
          levelsId: 4,
          level: "NIVEL 4",
          description: "CONSOLIDADO",
          levelDescription:
            "La entidad ha logrado que la implementación de los lineamientos del Marco de Interoperabilidad del Estado sea un tema conocido a nivel institucional sin embargo no ha logrado involucrar a todos los interesados\n",
          levelValue: 4,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "793b3b57-922d-4b5c-95eb-08da85fcbb11",
            title: "Texto",
            contentType: "text/plain",
            responsesId: 0,
          },
          {
            id: "7146dc91-8992-403f-95ec-08da85fcbb11",
            title: "Cedula",
            contentType: "image/jpg,image/png,image/jpeg",
            responsesId: 0,
          },
        ],
      },
    ],
  },

  {
    id: 27,
    domainResponse: {
      id: 2,
      color: "#fce5d7",
      description: "Político Legal",
      acronym: "LG",
      slug: "politico-legal",
    },
    description:
      "Infraestructura tecnológica para el intercambio de información",
    lineamentsResponses: [
      {
        id: 39,
        description: "LI.I15D.TE.02",
        definictionLineament:
          "Diseñar la arquitectura de infraestructura tecnológica de acuerdo con las necesidades de intercambio de información\n",
        numberLineament: 2,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 40,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 41,
        responseDecription:
          "Existen varias personas responsables de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "971a3b40-4c5c-4aee-0ce3-08da81df366a",
            title: "Cedula",
            contentType: "image/jpeg,image/png,image/jpg",
            responsesId: 0,
          },
          {
            id: "73a0df2e-8b1c-4220-0ce4-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
          {
            id: "936136f4-aa74-4856-fa5c-08da8475383a",
            title: "Acta",
            contentType: "application/pdf",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 42,
        responseDecription:
          "Existe un único responsable de intercambio de información pero no es formal\n",
        levelsResponse: {
          levelsId: 3,
          level: "NIVEL 3",
          description: "INTERMEDIO",
          levelDescription:
            "La entidad ha venido trabajando en la implementación de los lineamientos del Marco de Interoperabilidad en algunos de sus servicios de intercambio de información\n",
          levelValue: 3,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 45,
        responseDecription: "Respuesta Nivel 4\n",
        levelsResponse: {
          levelsId: 4,
          level: "NIVEL 4",
          description: "CONSOLIDADO",
          levelDescription:
            "La entidad ha logrado que la implementación de los lineamientos del Marco de Interoperabilidad del Estado sea un tema conocido a nivel institucional sin embargo no ha logrado involucrar a todos los interesados\n",
          levelValue: 4,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "793b3b57-922d-4b5c-95eb-08da85fcbb11",
            title: "Texto",
            contentType: "text/plain",
            responsesId: 0,
          },
          {
            id: "7146dc91-8992-403f-95ec-08da85fcbb11",
            title: "Cedula",
            contentType: "image/jpg,image/png,image/jpeg",
            responsesId: 0,
          },
        ],
      },
    ],
  },
  {
    domainResponse: {
      id: 2,
      color: "#fce5d7",
      description: "Político Legal",
      acronym: "LG",
      slug: "politico-legal",
    },
    id: 21,
    description: "Documentación de los servicios de intercambio",
    lineamentsResponses: [
      {
        id: 32,
        description: "LI.I15D.SM.02",
        definictionLineament:
          "Definición de la información objeto del intercambio\n",
        numberLineament: 2,
        criterions: null,
        domainResponse: null,
      },
      {
        id: 35,
        description: "LI.I15D.SM.05",
        definictionLineament:
          "Mantener información interpretable y reutilizable\n",
        numberLineament: 5,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 40,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 41,
        responseDecription:
          "Existen varias personas responsables de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "971a3b40-4c5c-4aee-0ce3-08da81df366a",
            title: "Cedula",
            contentType: "image/jpeg,image/png,image/jpg",
            responsesId: 0,
          },
          {
            id: "73a0df2e-8b1c-4220-0ce4-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
          {
            id: "936136f4-aa74-4856-fa5c-08da8475383a",
            title: "Acta",
            contentType: "application/pdf",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 42,
        responseDecription:
          "Existe un único responsable de intercambio de información pero no es formal\n",
        levelsResponse: {
          levelsId: 3,
          level: "NIVEL 3",
          description: "INTERMEDIO",
          levelDescription:
            "La entidad ha venido trabajando en la implementación de los lineamientos del Marco de Interoperabilidad en algunos de sus servicios de intercambio de información\n",
          levelValue: 3,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 45,
        responseDecription: "Respuesta Nivel 4\n",
        levelsResponse: {
          levelsId: 4,
          level: "NIVEL 4",
          description: "CONSOLIDADO",
          levelDescription:
            "La entidad ha logrado que la implementación de los lineamientos del Marco de Interoperabilidad del Estado sea un tema conocido a nivel institucional sin embargo no ha logrado involucrar a todos los interesados\n",
          levelValue: 4,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "793b3b57-922d-4b5c-95eb-08da85fcbb11",
            title: "Texto",
            contentType: "text/plain",
            responsesId: 0,
          },
          {
            id: "7146dc91-8992-403f-95ec-08da85fcbb11",
            title: "Cedula",
            contentType: "image/jpg,image/png,image/jpeg",
            responsesId: 0,
          },
        ],
      },
    ],
  },

  {
    id: 23,
    domainResponse: {
      id: 3,
      color: "#dae1f3",
      description: "Semántico",
      acronym: "SM",
      slug: "semantico",
    },
    description: "Diseño funcional de los servicios web",
    lineamentsResponses: [
      {
        id: 42,
        description: "LI.I15D.TE.05",
        definictionLineament:
          "Preferiblemente usar la arquitectura y metodología propuesta en este Marco de Interoperabilidad para la implementación de servicios de intercambio de información en las entidades\n",
        numberLineament: 5,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 40,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 41,
        responseDecription:
          "Existen varias personas responsables de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "971a3b40-4c5c-4aee-0ce3-08da81df366a",
            title: "Cedula",
            contentType: "image/jpeg,image/png,image/jpg",
            responsesId: 0,
          },
          {
            id: "73a0df2e-8b1c-4220-0ce4-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
          {
            id: "936136f4-aa74-4856-fa5c-08da8475383a",
            title: "Acta",
            contentType: "application/pdf",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 42,
        responseDecription:
          "Existe un único responsable de intercambio de información pero no es formal\n",
        levelsResponse: {
          levelsId: 3,
          level: "NIVEL 3",
          description: "INTERMEDIO",
          levelDescription:
            "La entidad ha venido trabajando en la implementación de los lineamientos del Marco de Interoperabilidad en algunos de sus servicios de intercambio de información\n",
          levelValue: 3,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 45,
        responseDecription: "Respuesta Nivel 4\n",
        levelsResponse: {
          levelsId: 4,
          level: "NIVEL 4",
          description: "CONSOLIDADO",
          levelDescription:
            "La entidad ha logrado que la implementación de los lineamientos del Marco de Interoperabilidad del Estado sea un tema conocido a nivel institucional sin embargo no ha logrado involucrar a todos los interesados\n",
          levelValue: 4,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "793b3b57-922d-4b5c-95eb-08da85fcbb11",
            title: "Texto",
            contentType: "text/plain",
            responsesId: 0,
          },
          {
            id: "7146dc91-8992-403f-95ec-08da85fcbb11",
            title: "Cedula",
            contentType: "image/jpg,image/png,image/jpeg",
            responsesId: 0,
          },
        ],
      },
    ],
  },
  {
    id: 26,
    domainResponse: {
      id: 3,
      color: "#dae1f3",
      description: "Semántico",
      acronym: "SM",
      slug: "semantico",
    },
    description: "Despliegue de los servicios web",
    lineamentsResponses: [
      {
        id: 42,
        description: "LI.I15D.TE.05",
        definictionLineament:
          "Preferiblemente usar la arquitectura y metodología propuesta en este Marco de Interoperabilidad para la implementación de servicios de intercambio de información en las entidades\n",
        numberLineament: 5,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 40,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 41,
        responseDecription:
          "Existen varias personas responsables de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "971a3b40-4c5c-4aee-0ce3-08da81df366a",
            title: "Cedula",
            contentType: "image/jpeg,image/png,image/jpg",
            responsesId: 0,
          },
          {
            id: "73a0df2e-8b1c-4220-0ce4-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
          {
            id: "936136f4-aa74-4856-fa5c-08da8475383a",
            title: "Acta",
            contentType: "application/pdf",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 42,
        responseDecription:
          "Existe un único responsable de intercambio de información pero no es formal\n",
        levelsResponse: {
          levelsId: 3,
          level: "NIVEL 3",
          description: "INTERMEDIO",
          levelDescription:
            "La entidad ha venido trabajando en la implementación de los lineamientos del Marco de Interoperabilidad en algunos de sus servicios de intercambio de información\n",
          levelValue: 3,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 45,
        responseDecription: "Respuesta Nivel 4\n",
        levelsResponse: {
          levelsId: 4,
          level: "NIVEL 4",
          description: "CONSOLIDADO",
          levelDescription:
            "La entidad ha logrado que la implementación de los lineamientos del Marco de Interoperabilidad del Estado sea un tema conocido a nivel institucional sin embargo no ha logrado involucrar a todos los interesados\n",
          levelValue: 4,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "793b3b57-922d-4b5c-95eb-08da85fcbb11",
            title: "Texto",
            contentType: "text/plain",
            responsesId: 0,
          },
          {
            id: "7146dc91-8992-403f-95ec-08da85fcbb11",
            title: "Cedula",
            contentType: "image/jpg,image/png,image/jpeg",
            responsesId: 0,
          },
        ],
      },
    ],
  },
  {
    id: 16,
    domainResponse: {
      id: 3,
      color: "#dae1f3",
      description: "Semántico",
      acronym: "SM",
      slug: "semantico",
    },
    description: "Cultura organizacional",
    lineamentsResponses: [
      {
        id: 27,
        description: "LI.I15D.OG.05",
        definictionLineament:
          "Desarrollar las competencias y habilidades necesarias para el consumo, implementación y prestación de servicios de intercambio de información\n",
        numberLineament: 5,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 40,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 41,
        responseDecription:
          "Existen varias personas responsables de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "971a3b40-4c5c-4aee-0ce3-08da81df366a",
            title: "Cedula",
            contentType: "image/jpeg,image/png,image/jpg",
            responsesId: 0,
          },
          {
            id: "73a0df2e-8b1c-4220-0ce4-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
          {
            id: "936136f4-aa74-4856-fa5c-08da8475383a",
            title: "Acta",
            contentType: "application/pdf",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 42,
        responseDecription:
          "Existe un único responsable de intercambio de información pero no es formal\n",
        levelsResponse: {
          levelsId: 3,
          level: "NIVEL 3",
          description: "INTERMEDIO",
          levelDescription:
            "La entidad ha venido trabajando en la implementación de los lineamientos del Marco de Interoperabilidad en algunos de sus servicios de intercambio de información\n",
          levelValue: 3,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 45,
        responseDecription: "Respuesta Nivel 4\n",
        levelsResponse: {
          levelsId: 4,
          level: "NIVEL 4",
          description: "CONSOLIDADO",
          levelDescription:
            "La entidad ha logrado que la implementación de los lineamientos del Marco de Interoperabilidad del Estado sea un tema conocido a nivel institucional sin embargo no ha logrado involucrar a todos los interesados\n",
          levelValue: 4,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "793b3b57-922d-4b5c-95eb-08da85fcbb11",
            title: "Texto",
            contentType: "text/plain",
            responsesId: 0,
          },
          {
            id: "7146dc91-8992-403f-95ec-08da85fcbb11",
            title: "Cedula",
            contentType: "image/jpg,image/png,image/jpeg",
            responsesId: 0,
          },
        ],
      },
    ],
  },
  {
    id: 17,
    domainResponse: {
      id: 4,
      color: "#fff2cd",
      description: "Técnico",
      acronym: "TE",
      slug: "tecnico",
    },
    description: "Adecuación de procesos",
    lineamentsResponses: [
      {
        id: 23,
        description: "LI.I15D.OG.01",
        definictionLineament:
          "Establecer los instrumentos legales que faciliten el uso o prestación de los servicios de intercambio de información",
        numberLineament: 1,
        criterions: null,
        domainResponse: null,
      },
      {
        id: 24,
        description: "LI.I15D.OG.02",
        definictionLineament:
          "Adecuar los procesos, trámites, servicios y otros procedimientos administrativos para la incorporación de los servicios de intercambio de información\n",
        numberLineament: 2,
        criterions: null,
        domainResponse: null,
      },
      {
        id: 25,
        description: "LI.I15D.OG.03",
        definictionLineament:
          "Establecer las relaciones organizacionales que se requieren entre las entidades cuando se provee o consume información para un trámite o servicio\n",
        numberLineament: 3,
        criterions: null,
        domainResponse: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 43,
        responseDecription:
          "En la entidad no existe una gestión por procesos\n",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 17,
          description: "Adecuación de procesos",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 44,
        responseDecription:
          "La entidad tiene documentados sus procesos pero están desactualizados\n",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 17,
          description: "Adecuación de procesos",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "ed0d0d27-5b83-4641-0ce5-08da81df366a",
            title: "Excel",
            contentType: "application/vnd.ms-excel",
            responsesId: 0,
          },
        ],
      },
    ],
  },
  {
    id: 22,
    domainResponse: {
      id: 1,
      color: "#e2efdb",
      description: "Organizacional",
      acronym: "OG",
      slug: "organizacional",
    },
    description: "Uso de servicios ciudadanos digitales",
    lineamentsResponses: [
      {
        id: 38,
        description: "LI.I15D.TE.01",
        definictionLineament:
          "Utilizar los Servicios Ciudadanos Digitales, con el fin de garantizar la interoperabilidad técnica al establecer servicios de intercambio de información que apoyen la transformación digital de las entidades\n",
        numberLineament: 1,
        criterions: null,
      },
    ],
    responseResponses: [
      {
        responsesId: 40,
        responseDecription:
          "No existe un responsable de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 1,
          level: "NIVEL 1",
          description: "AUSENTE",
          levelDescription:
            "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.\n",
          levelValue: 1,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "3743b69d-fec6-4271-0ce1-08da81df366a",
            title: "Cedula",
            contentType: "image/jpg",
            responsesId: 0,
          },
          {
            id: "29877f67-d5cf-48d5-0ce2-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 41,
        responseDecription:
          "Existen varias personas responsables de los servicios de intercambio de información",
        levelsResponse: {
          levelsId: 2,
          level: "NIVEL 2",
          description: "INICIAL",
          levelDescription:
            "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.\n",
          levelValue: 2,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "971a3b40-4c5c-4aee-0ce3-08da81df366a",
            title: "Cedula",
            contentType: "image/jpeg,image/png,image/jpg",
            responsesId: 0,
          },
          {
            id: "73a0df2e-8b1c-4220-0ce4-08da81df366a",
            title: "Acta de Nacimiento",
            contentType: "application/msword",
            responsesId: 0,
          },
          {
            id: "936136f4-aa74-4856-fa5c-08da8475383a",
            title: "Acta",
            contentType: "application/pdf",
            responsesId: 0,
          },
        ],
      },
      {
        responsesId: 42,
        responseDecription:
          "Existe un único responsable de intercambio de información pero no es formal\n",
        levelsResponse: {
          levelsId: 3,
          level: "NIVEL 3",
          description: "INTERMEDIO",
          levelDescription:
            "La entidad ha venido trabajando en la implementación de los lineamientos del Marco de Interoperabilidad en algunos de sus servicios de intercambio de información\n",
          levelValue: 3,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: false,
        requiredEvidencesResponses: [],
      },
      {
        responsesId: 45,
        responseDecription: "Respuesta Nivel 4\n",
        levelsResponse: {
          levelsId: 4,
          level: "NIVEL 4",
          description: "CONSOLIDADO",
          levelDescription:
            "La entidad ha logrado que la implementación de los lineamientos del Marco de Interoperabilidad del Estado sea un tema conocido a nivel institucional sin embargo no ha logrado involucrar a todos los interesados\n",
          levelValue: 4,
        },
        criterionResponse: {
          id: 15,
          description: "Liderazgo del Marco de Interoperabilidad",
          lineamentsResponses: null,
          responseResponses: null,
        },
        isEvidenceRequired: true,
        requiredEvidencesResponses: [
          {
            id: "793b3b57-922d-4b5c-95eb-08da85fcbb11",
            title: "Texto",
            contentType: "text/plain",
            responsesId: 0,
          },
          {
            id: "7146dc91-8992-403f-95ec-08da85fcbb11",
            title: "Cedula",
            contentType: "image/jpg,image/png,image/jpeg",
            responsesId: 0,
          },
        ],
      },
    ],
  },
];
