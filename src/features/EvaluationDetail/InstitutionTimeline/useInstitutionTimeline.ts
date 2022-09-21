import { useEffect, useState, useMemo } from "react";
import { EvaluationService } from "library/api/services/EvaluationService";
import { Evaluation } from "library/models/Evaluation";
import { TagProps, TimelineItemProps } from "antd";
import { evaluationStatusLabels, evaluationStatusType } from "library/common/constants";
import { EvaluationStatus } from "library/common/enums";
import { useTranslation } from "react-i18next";

interface TimelineItem {
  key: string;
  color: string;
  statusColor: TagProps["color"];
  position: TimelineItemProps["position"];
  status: string;
  title?: string;
  content?: React.ReactNode;
}

export function useInstitutionTimeline(institutionId: number) {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setloading] = useState(false);
  const evaluationService = new EvaluationService();
  const { t } = useTranslation();

  const timeline = useMemo(() => {
    const timeline: TimelineItem[] = [];

    evaluations.forEach((evaluation, key) => {
      const position = key % 2 === 0 ? "left" : "right";

      timeline.push(
        {
          key: evaluation.uid + "result",
          position,
          statusColor: evaluation.indicatorColor,
          status: evaluation.score.toString(),
          color: evaluation.indicatorColor,
          title: t("labels.result"),
        },
        {
          key: evaluation.uid + EvaluationStatus.Completed,
          color: "green",
          position,
          statusColor: evaluationStatusType[EvaluationStatus.Completed],
          status: evaluationStatusLabels[EvaluationStatus.Completed],
          title: evaluation.nomenclature,
          content: t("timeline.evaluation_finished", {
            dateEnd: evaluation.dateEnd,
            nomenclature: evaluation.user.fullName,
            score: evaluation.score,
          }),
        },
        {
          key: evaluation.uid + EvaluationStatus.Pending,
          color: "blue",
          position,
          statusColor: evaluationStatusType[EvaluationStatus.Pending],
          status: evaluationStatusLabels[EvaluationStatus.Pending],
          title: evaluation.nomenclature,
          content: t("timeline.evaluation_started", {
            datePending: evaluation.datePending,
            user: evaluation.user.fullName,
          }),
        },
        {
          key: evaluation.uid + EvaluationStatus.Created,
          color: "gold",
          position,
          statusColor: evaluationStatusType[EvaluationStatus.Created],
          status: evaluationStatusLabels[EvaluationStatus.Created],
          title: evaluation.nomenclature,
          content: t("timeline.evaluation_created", {
            dateCreated: evaluation.dateCreated,
            nomenclature: evaluation.nomenclature,
            user: evaluation.user.fullName,
          }),
        }
      );
    });

    return timeline;
  }, [evaluations]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const evaluations = await evaluationService.getTimeline(institutionId);
        setEvaluations(evaluations);
      } catch (errorMessage) {
        setEvaluations([]);
      } finally {
        setloading(false);
      }
    };

    fetchTimeline();

    // eslint-disable-next-line
  }, [institutionId]);

  return { timeline, isLoading };
}
