import { ColumnsType } from "antd/lib/table";
import { useTranslation } from 'react-i18next';
import { Tag } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { ChoiceForm } from "./ChoiceForm";
import { ChoiceFormSchema } from "./ChoiceForm/ChoiceFormSchema";
import { Choice } from 'library/models/Choice';
import { ChoiceService } from 'library/api/services/ChoiceService';
import { choiceSlice } from 'redux/slices/choiceSlice';
import { Crud } from "features/Crud";
import { getText } from "i18n";

const columns: ColumnsType<Choice> = [
  {
    title: getText("fields.response") as string,
    dataIndex: "details",
    ellipsis: true,
    // sorter: (a, b) => {
    //   if (a.name < b.name) { return -1; }
    //   if (a.name > b.name) { return 1; }
    //   return 0;
    // },
  },
  {
    title: getText("fields.level") as string,
    dataIndex: ["level", "name"],
    responsive: ["lg"],
    render: (value) => <Tag color="magenta">{value}</Tag>,
  },
  {
    title: getText("fields.criterion") as string,
    dataIndex: ["criterion", "name"],
    ellipsis: true,
    responsive: ["lg"],
  },
];

export default function ChoiceCrud() {
  const service = new ChoiceService();
  const { t } = useTranslation();
  
  return (
    <Crud<Choice, ChoiceFormSchema>
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
