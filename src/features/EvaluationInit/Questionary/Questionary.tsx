import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Drawer, List, Grid, Badge, Pagination, Button } from "antd";
import { QuestionItem } from "features/EvaluationInit/QuestionItem";
import { Criterion } from "library/models/Criterion";
import { useCriterionList } from "./useCriterionList";
import { PaginationProps } from "antd/es/pagination";
import { Domain } from "library/models/Domain";

import classes from "./Questionary.module.css";
import { useQuestionary } from "./useQuestionary";
import { Question } from "library/models/Question";
import { Choice } from "library/models/Choice";
import { AppDrawer } from "library/components/AppDrawer";

// const fakeData: Criterion[] = [
//   {
//     id: 3,
//     name: "Adecuación de procesos",
//     categories: [
//       {
//         id: 1,
//         nomenclature: "LI.I15D.OG.01",
//         description:
//           "El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.",
//       },
//       {
//         id: 2,
//         nomenclature: "LI.I15D.OG.02",
//         description:
//           "El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.",
//       },
//       {
//         id: 3,
//         nomenclature: "LI.I15D.OG.03",
//         description:
//           "El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Liderazgo del Marco de Interoperabilidad",
//     categories: [
//       {
//         id: 4,
//         nomenclature: "LI.I15D.OG.04",
//         description:
//           "El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Cultura organizacional",
//     categories: [
//       {
//         id: 5,
//         nomenclature: "LI.I15D.OG.05",
//         description:
//           "El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.",
//       },
//     ],
//   },
// ];

const { useBreakpoint } = Grid;

interface CriterionScore {
  [id: number]: number;
}

export interface QuestionaryProps {
  isOpen: boolean;

  domain: Domain;

  // This is used to keep domain during transition
  onClose: (keepDomain: Domain) => void;
  onCloseEnd: () => void;
}

export default function Questionary(props: QuestionaryProps) {
  const [score, setScore] = useState<CriterionScore>([]);
  const [current, setCurrent] = useState(1);

  const { uid } = useParams<Record<"uid", string>>();
  const { isOpen, domain, onClose, onCloseEnd } = props;
  const { isLoading, questions, changeResponse } = useQuestionary(domain.id);

  React.useEffect(() => {
    const handleNotFound = () => {
      if (!domain) onCloseEnd();
    };

    handleNotFound();
  }, []);

  const onResponseChange = (criterion: Criterion, choice: Choice): void => {
    changeResponse({
      evaluationInstitutionalId: uid as string,
      criterionId: criterion.id,
      responsesId: choice.id,
    });

    const newScore = {
      ...score,
      [criterion.id]: choice.level.value,
    };

    setScore(newScore);
  };

  const getScore = (): number => {
    const total: number = Object.values(score).reduce(
      (prev, current) => prev + current,
      0
    );

    return Number((total / questions.length).toFixed(2)) || 0;
  };

  const onVisibilityChange = (isVisible: boolean): void => {
    if (!isVisible) onCloseEnd();
  };

  const renderPaginationItem: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    const buttons: Record<string, any> = {
      prev: <Button style={{ fontFamily: "Maven Pro" }}>Anterior</Button>,
      next: <Button style={{ fontFamily: "Maven Pro" }}>Siguiente</Button>,
    };

    return buttons[type] || originalElement;
  };

  const onPageChange = (page: number): void => {
    setCurrent(page);
  };

  return (
    <AppDrawer
      title={domain.name}
      placement="right"
      visible={isOpen}
      extra={<Badge status="processing" text={getScore()} />}
      onClose={() => onClose(domain)}
      afterVisibleChange={onVisibilityChange}
      footer={
        <Pagination
          pageSize={1}
          total={questions.length}
          itemRender={renderPaginationItem}
          onChange={onPageChange}
          current={current}
        />
      }
      forceRender
      destroyOnClose
    >
      <List<Question>
        itemLayout="vertical"
        size="large"
        loading={isLoading}
        pagination={{
          pageSize: 1,
          current: current,
          style: {
            display: "none",
          },
        }}
        split={false}
        dataSource={questions}
        renderItem={(question) => (
          <QuestionItem
            key={question.criterion.id}
            question={question}
            onLevelChange={(choice) =>
              onResponseChange(question.criterion, choice)
            }
            onEvidenceDelete={() => {}}
            onEvidenceAdd={() => {}}
            number={current}
          />
        )}
      />
    </AppDrawer>
  );
}
