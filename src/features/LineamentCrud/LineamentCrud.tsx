import { ColumnsType } from "antd/lib/table";
import { Trans, useTranslation } from 'react-i18next';
import { Tag } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { LineamentForm } from "./LineamentForm";
import { LineamentFormSchema } from "./LineamentForm/LineamentFormSchema";
import { Lineament } from 'library/models/Lineament';
import { LineamentService } from 'library/api/services/LineamentService';
import { lineamentSlice, LineamentState } from 'redux/slices/lineamentSlice';
import { Crud } from "features/Crud";

const columns: ColumnsType<Lineament> = [
  {
    title: <Trans i18nKey="fields.nomenclature" />,
    dataIndex: "nomenclature",
    ellipsis: true,
    render: (value) => <Tag color="magenta">{value}</Tag>,
    // sorter: (a, b) => {
    //   if (a.name < b.name) { return -1; }
    //   if (a.name > b.name) { return 1; }
    //   return 0;
    // },
  },
  {
    title: <Trans i18nKey="fields.domain" />,
    dataIndex: ["domain", "name"],
    responsive: ["lg"],
  },
  {
    title: <Trans i18nKey="fields.description" />,
    dataIndex: "description",
    ellipsis: true,
    responsive: ["lg"],
  },
];

export default function LineamentCrud() {
  const service = new LineamentService();
  const { t } = useTranslation();
  
  return (
    <Crud<
      Lineament, 
      LineamentFormSchema, 
      LineamentState
    >
      title={t("headings.lineament_list")}
      idSource="id"
      columns={columns}
      service={service}
      reducer={lineamentSlice}
      selectLoading={(state) => state.lineaments.isLoading}
      selectResults={(state) => state.lineaments.results}
      createModal={({ visible, loading, onSave, onClose }) => (
        <LineamentForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
        />
      )}
      editModal={({ record, visible, loading, onClose, onSave }) => (
        <LineamentForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
          defaults={{
            domainId: record.domain.id,
            ...record,
          }}
          isEdit
        />
      )}
      detailModal={({ record, visible, onClose }) => (
        <AppDrawer 
          title={record.nomenclature} 
          visible={visible} 
          onClose={onClose}
        >
          Lineament Detail
        </AppDrawer>
      )}
    />
  );
}
