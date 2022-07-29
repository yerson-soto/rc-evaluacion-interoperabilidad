import { ColumnsType } from "antd/lib/table";
import { Trans, useTranslation } from 'react-i18next';
import { Crud } from "features/Crud";
import { EvaluationService } from "library/api/services/EvaluationService";
import { AppDrawer } from "library/components/AppDrawer";
import { Evaluation } from "library/models/Evaluation";
import { evaluationSlice } from "redux/slices/evaluationSlice";
import { EvaluationForm } from "./EvaluationForm";
import { EvaluationFormSchema } from "./EvaluationForm/EvaluationFormSchema";
import { getText } from 'i18n';

const columns: ColumnsType<Evaluation> = [
  {
    title: <Trans key="fields.evaluation" />,
    dataIndex: "uid",
    render: () => "EV.20.12"
  },
  {
    title: <Trans key="fields.organization" />,
    dataIndex: ["organization", "name"],
    ellipsis: true,
  },
  {
    title: <Trans key="fields.score" />,
    dataIndex: "score",
    ellipsis: true,
    // render: () => "4.5"
  },
];

export default function EvaluationCrud() {
  const service = new EvaluationService();
  const { t } = useTranslation();
  
  return (
    <Crud<Evaluation, EvaluationFormSchema>
      title={t("headings.Evaluation_list")}
      idSource="uid"
      columns={columns}
      service={service}
      reducer={evaluationSlice}
      selectLoading={(state) => state.evaluations.isLoading}
      selectResults={(state) => state.evaluations.results}
      createModal={({ visible, loading, onSave, onClose }) => (
        <EvaluationForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
        />
      )}
      editModal={({ record, visible, loading, onClose, onSave }) => (
        <EvaluationForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
          defaults={({
            // TODO: Refactor
            startDate: record.dateCreated,
            endDate: record.dateCreated,
            organizationId: record.organization.id
          })}
          isEdit
        />
      )}
      detailModal={({ record, visible, onClose }) => (
        <AppDrawer 
          title={record.organization.name} 
          visible={visible} 
          onClose={onClose}
        >
          Evaluation Detail
        </AppDrawer>
      )}
    />
  );
}
