import { ColumnsType } from "antd/lib/table";
import { Trans, useTranslation } from 'react-i18next';
import { Tag } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { LevelForm } from "./LevelForm";
import { LevelFormSchema } from "./LevelForm/LevelFormSchema";
import { Level } from 'library/models/Level';
import { LevelService } from 'library/api/services/LevelService';
import { levelSlice } from 'redux/slices/levelSlice';
import { Crud } from "features/Crud";
import { LevelState } from 'redux/slices/levelSlice';

const columns: ColumnsType<Level> = [
  {
    title: <Trans i18nKey="fields.level" />,
    dataIndex: "value",
    responsive: ["lg"]
  },
  {
    title: <Trans i18nKey="fields.name" />,
    dataIndex: "name",
    ellipsis: true,
    render: (value) => <Tag color="magenta">{value}</Tag>,
    // sorter: (a, b) => {
    //   if (a.name < b.name) { return -1; }
    //   if (a.name > b.name) { return 1; }
    //   return 0;
    // },
  },
  {
    title: <Trans i18nKey="fields.description" />,
    dataIndex: "description",
    ellipsis: true,
    responsive: ["lg"],
  },
];

export default function LevelCrud() {
  const service = new LevelService();
  const { t } = useTranslation();
  
  return (
    <Crud<
      Level, 
      LevelFormSchema, 
      LevelState
    >
      title={t("headings.level_list")}
      idSource="id"
      columns={columns}
      service={service}
      reducer={levelSlice}
      selectLoading={(state) => state.levels.isLoading}
      selectResults={(state) => state.levels.results}
      createModal={({ visible, loading, onSave, onClose }) => (
        <LevelForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
        />
      )}
      editModal={({ record, visible, loading, onClose, onSave }) => (
        <LevelForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
          defaults={record}
          isEdit
        />
      )}
      detailModal={({ record, visible, onClose }) => (
        <AppDrawer 
          title={record.name} 
          visible={visible} 
          onClose={onClose}
        >
          Level Detail
        </AppDrawer>
      )}
    />
  );
}
