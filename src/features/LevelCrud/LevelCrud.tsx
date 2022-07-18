import { ColumnsType } from "antd/lib/table";
import { useTranslation } from 'react-i18next';
import { Tag } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { LevelForm } from "./LevelForm";
import { LevelFormSchema } from "./LevelForm/LevelFormSchema";
import { Level } from 'library/models/Level';
import { LevelService } from 'library/api/services/LevelService';
import { levelSlice } from 'main/store/slices/levelSlice';
import { Crud } from "features/Crud";
import { getText } from "i18n";

const columns: ColumnsType<Level> = [
  {
    title: getText("fields.level") as string,
    dataIndex: "value",
    responsive: ["lg"]
  },
  {
    title: getText("fields.name") as string,
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
    title: getText("fields.description") as string,
    dataIndex: "description",
    ellipsis: true,
    responsive: ["lg"],
  },
];

export default function LevelCrud() {
  const service = new LevelService();
  const { t } = useTranslation();
  
  return (
    <Crud<Level, LevelFormSchema>
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
