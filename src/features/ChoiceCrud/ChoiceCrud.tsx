import { ColumnsType } from "antd/lib/table";
import { Tag } from "antd";
import { Trans, useTranslation } from 'react-i18next';
import { ChoiceFormSchema } from "./ChoiceForm/ChoiceFormSchema";
import { Choice } from 'library/models/Choice';
import { ChoiceService } from 'library/api/services/ChoiceService';
import { AppDrawer } from "library/components/AppDrawer";
import { Crud } from "features/Crud";
import { choiceSlice, ChoiceState } from 'redux/slices/choiceSlice';
import { ChoiceForm } from "./ChoiceForm";

const columns: ColumnsType<Choice> = [
  {
    title: <Trans key="fields.response" />,
    dataIndex: "details",
    ellipsis: true,
    // sorter: (a, b) => {
    //   if (a.name < b.name) { return -1; }
    //   if (a.name > b.name) { return 1; }
    //   return 0;
    // },
  },
  {
    title: <Trans key="fields.level" />,
    dataIndex: ["level", "name"],
    responsive: ["lg"],
    render: (value) => <Tag color="magenta">{value}</Tag>,
  },
  {
    title: <Trans key="fields.criterion" />,
    dataIndex: ["criterion", "name"],
    ellipsis: true,
    responsive: ["lg"],
  },
];

export default function ChoiceCrud() {
  const service = new ChoiceService();
  const { t } = useTranslation();
  
  return (
    <Crud<
      Choice,
      ChoiceFormSchema, 
      ChoiceState
    >
      title={t("headings.choice_list")}
      idSource="id"
      columns={columns}
      service={service}
      reducer={choiceSlice}
      selectLoading={(state) => state.choices.isLoading}
      selectResults={(state) => state.choices.results}
      createModal={({ visible, loading, onSave, onClose }) => (
        <ChoiceForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
        />
      )}
      editModal={({ record, visible, loading, onClose, onSave }) => (
        <ChoiceForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
          defaults={{
            criterionId: record.criterion.id,
            levelId: record.level.id,
            details: record.details
          }}
          isEdit
        />
      )}
      detailModal={({ record, visible, onClose }) => (
        <AppDrawer 
          title={record.level.name} 
          visible={visible} 
          onClose={onClose}
        >
          Choice Detail
        </AppDrawer>
      )}
    />
  );
}
