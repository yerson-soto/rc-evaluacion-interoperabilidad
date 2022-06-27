import React, { useState } from "react";
import { Drawer, List, Grid, Badge } from "antd";
import { Question } from "features/EvaluationInit/Question";
import { Criterion } from "library/models/Criterion";
import { Domain } from "library/models/Domain";

import { useLocation } from "react-router-dom";
import { LocationState } from "library/common/interfaces";
import classes from "./Questionary.module.css";
import { useCriterionList } from "./useCriterionList";

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

interface CriterionScore {
  [id: number]: number;
}

export interface QuestionaryProps {
  isOpen: boolean;

  domain: Domain;

  // This is used to keep domain during animation
  onClose: (keepDomain: Domain) => void;
  onCloseEnd: () => void;
}

export default function Questionary(props: QuestionaryProps) {
  const [score, setScore] = useState<CriterionScore>([]);

  const { md: isDesktop } = useBreakpoint();
  const { isOpen, domain, onClose, onCloseEnd } = props;
  const { isLoading, criterions } = useCriterionList(domain.id);

  const addScore = (criterion: Criterion, level: number): void => {
    const newScore = {
      ...score,
      [criterion.id]: level,
    };

    setScore(newScore);
  };

  const getScore = (): number => {
    const total: number = Object.values(score).reduce(
      (prev, current) => prev + current,
      0
    );

    return Number((total / criterions.length).toFixed(2)) || 0;
    // returnNumber((newScore / fakeData.length).toFixed(2))
  };

  React.useEffect(() => {
    const handleNotFound = () => {
      if (!domain) onCloseEnd();
    };

    handleNotFound();
  }, []);

  const onVisibilityChange = (isVisible: boolean): void => {
    if (!isVisible) onCloseEnd();
  };

  return (
    <Drawer
      title={`Dominio ${domain.name}`}
      placement="right"
      visible={isOpen}
      width={isDesktop ? "500" : "100%"}
      extra={<Badge status="processing" text={getScore()} />}
      onClose={() => onClose(domain)}
      afterVisibleChange={onVisibilityChange}
      forceRender
      destroyOnClose
    >
      <List<Criterion>
        itemLayout="vertical"
        size="large"
        loading={isLoading}
        pagination={{
          pageSize: 1,
        }}
        dataSource={criterions}
        renderItem={(criterion, index) => (
          <Question
            key={criterion.id}
            criterion={criterion}
            onLevelChange={(level) => addScore(criterion, level)}
            onEvidenceDelete={() => {}}
            onEvidenceAdd={() => {}}
            number={index + 1}
          />
        )}
      />
    </Drawer>
  );
}
