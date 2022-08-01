import { Space, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Trans, useTranslation } from "react-i18next";
import { Crud } from "features/Crud";
import { AppDrawer } from "library/components/AppDrawer";
import { LightLineament } from "library/models/Lineament";
import { CriterionForm } from "./CriterionForm";
import { CriterionFormSchema } from "./CriterionForm/CriterionFormSchema";
import { Criterion } from "library/models/Criterion";
import { CriterionService } from "library/api/services/CriterionService";
import { criterionSlice } from "redux/slices/criterionSlice";
import { CriterionState } from 'redux/slices/criterionSlice';

const columns: ColumnsType<Criterion> = [
  {
    title: <Trans i18nKey="fields.name" />,
    dataIndex: "name",
    ellipsis: true,
    // sorter: (a, b) => {
    //   if (a.name < b.name) { return -1; }
    //   if (a.name > b.name) { return 1; }
    //   return 0;
    // },
  },
  {
    title: <Trans i18nKey="fields.lineaments" />,
    dataIndex: "lineaments",
    ellipsis: true,
    responsive: ["lg"],
    render: (lineaments: LightLineament[]) => {
      const total = lineaments.length;
      const showResponsiveTag = total > 2;
      const showLineaments = showResponsiveTag
        ? lineaments.slice(0, 2)
        : lineaments;

      return (
        <Space>
          {showLineaments.map((value) => (
            <Tag key={value.id}>{value.nomenclature}</Tag>
          ))}

          {showResponsiveTag && <Tag key="more">+ {total - 2}</Tag>}
        </Space>
      );
    },
  },
  // {
  //   title: getText("fields.domain") as string,
  //   dataIndex: ["domain", "name"],
  // },
];

const mapFormSchema = (criterion: Criterion): CriterionFormSchema => ({
  name: criterion.name,
  lineaments: criterion.lineaments.map((lineament) => lineament.id),
});

export default function CriterionCrud() {
  const service = new CriterionService();
  const { t } = useTranslation();

  return (
    <Crud<
      Criterion, 
      CriterionFormSchema, 
      CriterionState
    >
      title={t("headings.criterion_list")}
      idSource="id"
      columns={columns}
      service={service}
      reducer={criterionSlice}
      selectLoading={(state) => state.criterions.isLoading}
      selectResults={(state) => state.criterions.results}
      createModal={({ visible, loading, onSave, onClose }) => (
        <CriterionForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
        />
      )}
      editModal={({ record, visible, loading, onClose, onSave }) => (
        <CriterionForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
          defaults={mapFormSchema(record)}
          isEdit
        />
      )}
      detailModal={({ record, visible, onClose }) => (
        <AppDrawer title={record.name} visible={visible} onClose={onClose}>
          Criterion Detail
        </AppDrawer>
      )}
    />
  );
}
