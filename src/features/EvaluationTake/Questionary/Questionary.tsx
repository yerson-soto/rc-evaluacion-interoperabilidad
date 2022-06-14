import React from "react";
import { Drawer, List, Grid } from "antd";
import { Question } from "features/EvaluationTake/Question";
import { Criterion } from "library/models/Criterion";

const fakeData: Criterion[] = [
  {
    id: 3,
    name: "Adecuación de procesos",
    categories: [
      {
        id: 1,
        nomenclature: "LI.I15D.OG.01",
        description:
          "El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.",
      },
      {
        id: 2,
        nomenclature: "LI.I15D.OG.02",
        description:
          "El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.",
      },
      {
        id: 3,
        nomenclature: "LI.I15D.OG.03",
        description:
          "El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.",
      },
    ],
  },
  {
    id: 2,
    name: "Liderazgo del Marco de Interoperabilidad",
    categories: [
      {
        id: 4,
        nomenclature: "LI.I15D.OG.04",
        description:
          "El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.",
      },
    ],
  },
  {
    id: 3,
    name: "Cultura organizacional",
    categories: [
      {
        id: 5,
        nomenclature: "LI.I15D.OG.05",
        description:
          "El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.",
      },
    ],
  },
];

const { useBreakpoint } = Grid;

interface QuestionaryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Questionary(props: QuestionaryProps) {
  const { isOpen, onClose } = props;
  const { md: isDesktop } = useBreakpoint();

  return (
    <Drawer
      title="Dominio Organizacional"
      placement="right"
      visible={isOpen}
      onClose={onClose}
      width={isDesktop ? "500" : "100%"}
      forceRender
      destroyOnClose
    >
      <List<Criterion>
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 1,
        }}
        dataSource={fakeData}
        renderItem={(criterion, index) => (
          <Question
            key={criterion.id}
            criterion={criterion}
            onLevelChange={() => {}}
            onEvidenceChange={() => {}}
            number={index + 1}
          />
        )}
      />
    </Drawer>
  );
}
