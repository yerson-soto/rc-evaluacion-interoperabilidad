import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FullCriterion } from 'library/models/Criterion';
import { Domain } from '../../../library/models/Domain';
import { Lineament } from '../../../library/models/Lineament';


// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const sharedOnCell = (_: DataType, index: number) => {
  if (index === 4) {
    return { colSpan: 0 };
  }

  return {};
};

interface DataType extends FullCriterion {
  key: number;
  domain: Domain;
  color: string;
}

const dataSource: DataType[] = [
  {
    id: 1,
    key: 2,
    color: "red",
    name: "Liderazgo del Marco de Interoperabilidad",
    domain: {
      id: 2,
      name: "Dominio Organizacional",
      slug: "organizacional",
      acronym: "OG"
    },
    lineaments: [
      {
        id: 1,
        description: "Establecer los instrumentos legales que faciliten el uso o prestación de los servicios de intercambio de información",
        nomenclature: "LI.IOP.LG.01",
      },
      {
        id: 2,
        description: "Establecer los instrumentos legales que faciliten el uso o prestación de los servicios de intercambio de información",
        nomenclature: "LI.IOP.OG.05",
      }
    ],
    choices: [
      {
        id: 1,
        criterion: {
          id: 1,
          lineaments: [],
          name: "Liderazgo del Marco de Interoperabilidad"
        },
        details: "No existe un responsable de los servicios de intercambio de información",
        level: {
          id: 1,
          description: "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.",
          name: "Ausente",
          value: 1
        },
        requiredEvidences: [],
        isEvidenceRequired: false
      },
      {
        id: 2,
        criterion: {
          id: 1,
          lineaments: [],
          name: "Liderazgo del Marco de Interoperabilidad"
        },
        details: "Existen varias personas responsables de los servicios de intercambio de información",
        level: {
          id: 2,
          description: "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.",
          name: "Inicial",
          value: 2
        },
        requiredEvidences: [],
        isEvidenceRequired: false
      }
    ]
  },
  {
    id: 2,
    key: 2,
    color: "blue",
    name: "Cultura organizacional",
    domain: {
      id: 2,
      name: "Dominio Organizacional",
      slug: "organizacional",
      acronym: "OG"
    },
    lineaments: [
      {
        id: 1,
        description: "Establecer los instrumentos legales que faciliten el uso o prestación de los servicios de intercambio de información",
        nomenclature: "LI.IOP.LG.01",
      }
    ],
    choices: [
      {
        id: 1,
        criterion: {
          id: 1,
          lineaments: [],
          name: "Cultura organizacional"
        },
        details: "La entidad no promueve una cultura de intercambio de información mediante comunicaciones internas, campañas o actividades ni capacita al recurso humano en temas de interoperabilidad",
        level: {
          id: 1,
          description: "La entidad no ha empezado a implementar los lineamientos del Marco de Interoperabilidad del Estado y carece de las capacidades necesarias para implementarlo.",
          name: "Ausente",
          value: 1
        },
        requiredEvidences: [],
        isEvidenceRequired: false
      },
      {
        id: 2,
        criterion: {
          id: 1,
          lineaments: [],
          name: "Cultura organizacional"
        },
        details: "La entidad capacita al recurso humano en temas de interoperabilidad pero no divulga a las áreas la de la implementación del Marco de Interoperabilidad ",
        level: {
          id: 2,
          description: "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.",
          name: "Inicial",
          value: 2
        },
        requiredEvidences: [],
        isEvidenceRequired: false
      },
      {
        id: 3,
        criterion: {
          id: 1,
          lineaments: [],
          name: "Cultura organizacional"
        },
        details: "La entidad capacita al recurso humano en temas de interoperabilidad pero no divulga a las áreas la de la implementación del Marco de Interoperabilidad ",
        level: {
          id: 2,
          description: "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.",
          name: "Inicial",
          value: 2
        },
        requiredEvidences: [],
        isEvidenceRequired: false
      },
      {
        id: 4,
        criterion: {
          id: 1,
          lineaments: [],
          name: "Cultura organizacional"
        },
        details: "La entidad capacita al recurso humano en temas de interoperabilidad pero no divulga a las áreas la de la implementación del Marco de Interoperabilidad ",
        level: {
          id: 2,
          description: "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.",
          name: "Inicial",
          value: 2
        },
        requiredEvidences: [],
        isEvidenceRequired: false
      },
      {
        id: 5,
        criterion: {
          id: 1,
          lineaments: [],
          name: "Cultura organizacional"
        },
        details: "La entidad capacita al recurso humano en temas de interoperabilidad pero no divulga a las áreas la de la implementación del Marco de Interoperabilidad ",
        level: {
          id: 2,
          description: "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.",
          name: "Inicial",
          value: 2
        },
        requiredEvidences: [],
        isEvidenceRequired: false
      }
    ]
  },
  {
    id: 3,
    key: 3,
    color: "green",
    name: "Normatividad para el intercambio de información",
    domain: {
      id: 3,
      name: "Dominio Semantico",
      slug: "semantico",
      acronym: "SE"
    },
    lineaments: [
      {
        id: 1,
        description: "Establecer los instrumentos legales que faciliten el uso o prestación de los servicios de intercambio de información",
        nomenclature: "LI.IOP.LG.01",
      }
    ],
    choices: [
      {
        id: 1,
        criterion: {
          id: 1,
          lineaments: [],
          name: "Normatividad para el intercambio de información"
        },
        details: "La entidad no promueve una cultura de intercambio de información mediante comunicaciones internas, campañas o actividades ni capacita al recurso humano en temas de interoperabilidad",
        level: {
          id: 1,
          description: "La entidad no intercambia información",
          name: "Ausente",
          value: 1
        },
        requiredEvidences: [],
        isEvidenceRequired: false
      },
      {
        id: 2,
        criterion: {
          id: 1,
          lineaments: [],
          name: "Normatividad para el intercambio de información"
        },
        details: "La entidad intercambia información pero no existe normatividad asociada a los servicios de intercambio de información",
        level: {
          id: 2,
          description: "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad.",
          name: "Inicial",
          value: 2
        },
        requiredEvidences: [],
        isEvidenceRequired: false
      }
    ]
  },
]

const columns: ColumnsType<DataType> = [
  {
    title: 'Dominio',
    dataIndex: ["domain", "name"],
    // onCell: (_, index) => ({
    //   colSpan: (index as number) < 4 ? 1 : 5,
    // }),

    onCell: (record, index) => {
      if (index === 0) {
        return { rowSpan: 2 };
      }
      // These two are merged into above cell
      if (index === 1) {
        return { rowSpan: 0 };
      }
      // if (index === 4) {
      //   return { colSpan: 0 };
      // }

      return {};
    },
  },
  {
    title: 'Lineamiento',
    dataIndex: "lineaments",
    render: (values: Lineament[]) => {
      return values.map(value => (
        <p>{value.nomenclature}</p>
      ))
    }
    // onCell: sharedOnCell,
  },
  {
    title: 'Criterio',
    dataIndex: 'name',
    // colSpan: 2,
    // onCell: (_, index) => {
    //   if (index === 2) {
    //     return { rowSpan: 2 };
    //   }
    //   // These two are merged into above cell
    //   if (index === 3) {
    //     return { rowSpan: 0 };
    //   }
    //   if (index === 4) {
    //     return { colSpan: 0 };
    //   }

    //   return {};
    // },
  },
  // {
  //   title: 'Phone',
  //   colSpan: 0,
  //   dataIndex: 'phone',
  //   onCell: sharedOnCell as any,
  // },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   onCell: sharedOnCell as any,
  // },
  {
    title: 'Nivel 1',
    dataIndex: ["choices", 0, "details"],
  },
  {
    title: 'Nivel 2',
    dataIndex: ["choices", 1, "details"],
  },
  {
    title: 'Nivel 3',
    dataIndex: ["choices", 2, "details"],
  },
  {
    title: 'Nivel 4',
    dataIndex: ["choices", 3, "details"],
  },
  {
    title: 'Nivel 5',
    dataIndex: ["choices", 4, "details"],
  },
];

export default function TableVersion() {
  return (
    <Table dataSource={dataSource} size="small">
      <Table.Column
      
        key="domain"
        title={'Dominio'}
        dataIndex={["domain", "name"]}
        onCell={(record, index) => {
          if (index === 0) {
            return { rowSpan: 2 };
          }
          // These two are merged into above cell
          if (index === 1) {
            return { rowSpan: 0 };
          }
          // if (index === 4) {
          //   return { colSpan: 0 };
          // }

          return {};
        }}
      />

      <Table.Column
        key="lineaments"
        title={'Lineamiento'}
        dataIndex={"lineaments"}
        render={(values: Lineament[]) => {
          return values.map(value => (
            <p>{value.nomenclature}</p>
          ))
        }
        }
      />
      <Table.Column
        key="criterion"
        title={'Criterio'}
        dataIndex={'name'}
      />

      <Table.Column key="level-1" title={'Nivel 1'} dataIndex={["choices", 0, "details"]}/>
      <Table.Column key="level-2" title={'Nivel 2'} dataIndex={["choices", 1, "details"]}/>
      <Table.Column key="level-3" title={'Nivel 4'} dataIndex={["choices", 2, "details"]}/>
      <Table.Column key="level-4" title={'Nivel 4'} dataIndex={["choices", 3, "details"]}/>
      <Table.Column key="level-5" title={'Nivel 5'} dataIndex={["choices", 4, "details"]}/>
    </Table>
  )
} 