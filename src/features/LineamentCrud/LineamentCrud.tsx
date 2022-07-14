import { ColumnsType } from "antd/lib/table";
import { useTranslation } from 'react-i18next';
import { Crud } from "features/Crud";
import { AppDrawer } from "library/components/AppDrawer";
import { LineamentForm } from "./LineamentForm";
import { LineamentFormSchema } from "./LineamentForm/LineamentFormSchema";
import { Lineament } from 'library/models/Lineament';
import { LineamentService } from 'library/api/services/LineamentService';
import { lineamentSlice } from 'main/store/slices/lineamentSlice';
import { getText } from "i18n";

const columns: ColumnsType<Lineament> = [
  {
    title: getText("fields.nomenclature") as string,
    dataIndex: "nomenclature",
    ellipsis: true,
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
  {
    title: getText("fields.domain") as string,
    dataIndex: ["domain", "name"]
  }
];

export default function LineamentCrud() {
  const service = new LineamentService();
  const { t } = useTranslation();
  
  return (
    <Crud<Lineament, LineamentFormSchema>
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
