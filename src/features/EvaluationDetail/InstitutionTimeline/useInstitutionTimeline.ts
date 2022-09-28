import { useEffect, useState, useMemo } from "react";
import { EvaluationService } from "library/api/services/EvaluationService";
import { Evaluation } from "library/models/Evaluation";
import { TagProps, TimelineItemProps } from "antd";
import { EvaluationStatus } from "library/common/enums";
import { useTranslation } from "react-i18next";
import { evaluationStatus, evStatusLabels } from "library/common/constants";

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
  const [isLoading, setLoading] = useState(false);
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
          statusColor: evaluation.scoreColor,
          status: evaluation.score.toString(),
          color: evaluation.scoreColor,
          title: t("labels.result"),
        },
        {
          key: evaluation.uid + EvaluationStatus.Completed,
          color: "green",
          position,
          statusColor: evaluationStatus[EvaluationStatus.Completed],
          status: evStatusLabels[EvaluationStatus.Completed],
          title: evaluation.nomenclature,
          content: t("timeline.evaluation_finished", {
            dateEnd: evaluation.dateEnd,
            nomenclature: evaluation.nomenclature,
            score: evaluation.score,
          }),
        },
        {
          key: evaluation.uid + EvaluationStatus.Pending,
          color: "blue",
          position,
          statusColor: evaluationStatus[EvaluationStatus.Pending],
          status: evStatusLabels[EvaluationStatus.Pending],
          title: evaluation.nomenclature,
          content: t("timeline.evaluation_started", {
            datePending: evaluation.datePendingReadable,
            user: evaluation.manager.fullName,
          }),
        },
        {
          key: evaluation.uid + EvaluationStatus.Started,
          color: "gold",
          position,
          statusColor: evaluationStatus[EvaluationStatus.Started],
          status: evStatusLabels[EvaluationStatus.Started],
          title: evaluation.nomenclature,
          content: t("timeline.evaluation_created", {
            dateCreated: evaluation.dateStartReadable,
            nomenclature: evaluation.nomenclature,
            user: evaluation.manager.fullName,
          }),
        }
      );
    });

    return timeline;
  }, [evaluations]);

  useEffect(() => {
    const fetchTimeline = async () => {
      setLoading(true);

      try {
        const evaluations = await evaluationService.getTimeline(institutionId);
        setEvaluations(evaluations);
      } catch (errorMessage) {
        setEvaluations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();

    // eslint-disable-next-line
  }, [institutionId]);

  return { timeline, isLoading };
}
