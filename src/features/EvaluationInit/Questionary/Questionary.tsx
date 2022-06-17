import React from "react";
import { Drawer, List, Grid, Badge } from "antd";
import { Question } from "features/EvaluationInit/Question";
import { Criterion } from "library/models/Criterion";
import { Domain } from "library/models/Domain";

import classes from "./Questionary.module.css";

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

export interface QuestionaryProps {
  isOpen: boolean;
  domain: Domain;
  onClose: () => void;
}

export default function Questionary(props: QuestionaryProps) {
  const [score, setScore] = React.useState(0);
  const { md: isDesktop } = useBreakpoint();
  const { isOpen, onClose, domain } = props;

  const calcScore = (level: number): void => {
    const newScore = score + level;
    setScore(Number((newScore / fakeData.length).toFixed(2)));
  };

  return (
    <Drawer
      title={`Dominio ${domain.name}`}
      placement="right"
      visible={isOpen}
      onClose={onClose}
      width={isDesktop ? "500" : "100%"}
      extra={<Badge status="processing" text={score} />}
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
            onLevelChange={calcScore}
            onEvidenceDelete={() => {}}
            onEvidenceAdd={() => {}}
            number={index + 1}
          />
        )}
      />
    </Drawer>
  );
}
