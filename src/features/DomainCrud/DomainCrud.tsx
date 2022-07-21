import { ColumnsType } from "antd/lib/table";
import { useTranslation } from 'react-i18next';
import { Crud } from "features/Crud";
import { DomainService } from "library/api/services/DomainService";
import { AppDrawer } from "library/components/AppDrawer";
import { Domain } from "library/models/Domain";
import { domainSlice } from "redux/slices/domainSlice";
import { DomainForm } from "./DomainForm";
import { DomainFormSchema } from "./DomainForm/DomainFormSchema";
import { getText } from 'i18n';
import { Tag } from "antd";

const columns: ColumnsType<Domain> = [
  {
    title: getText("fields.domain") as string,
    dataIndex: "name",
    ellipsis: true,
    sorter: (a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    },
  },
  {
    title: getText("fields.slug") as string,
    dataIndex: "slug",
    responsive: ["lg"],
  },
  {
    title: getText("fields.domain_acronym") as string,
    dataIndex: "acronym",
    responsive: ["lg"],
    render: (value) => <Tag color="#d46b08">{value}</Tag>,
  },
];

export default function DomainCrud() {
  const service = new DomainService();
  const { t } = useTranslation();
  
  return (
    <Crud<Domain, DomainFormSchema>
      title={t("headings.domain_list")}
      idSource="id"
      columns={columns}
      service={service}
      reducer={domainSlice}
      selectLoading={(state) => state.domains.isLoading}
      selectResults={(state) => state.domains.results}
      createModal={({ visible, loading, onSave, onClose }) => (
        <DomainForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
        />
      )}
      editModal={({ record, visible, loading, onClose, onSave }) => (
        <DomainForm
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
          Domain Detail
        </AppDrawer>
      )}
    />
  );
}
