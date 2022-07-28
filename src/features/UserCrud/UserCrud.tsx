import { ColumnsType } from "antd/lib/table";
import { Trans, useTranslation } from "react-i18next";
import { AppDrawer } from "library/components/AppDrawer";
import { UserForm } from "./UserForm";
import { UserFormSchema } from "./UserForm/UserFormSchema";
import { User } from "library/models/User";
import { UserService } from "library/api/services/UserService";
import { userSlice } from "redux/slices/userSlice";
import { Crud } from "features/Crud";
import { RoleTag } from "./RoleTag";


const columns: ColumnsType<User> = [
  {
    title: () => <Trans i18nKey="fields.first_name" />,
    dataIndex: "firstName",
    ellipsis: true,
    responsive: ["sm"],
  },
  {
    title: () => <Trans i18nKey="fields.last_name" />,
    dataIndex: "lastName",
    ellipsis: true,
    responsive: ["md"],
  },
  {
    title: () => <Trans i18nKey="fields.email" />,
    dataIndex: "email",
    ellipsis: true,
  },
  {
    title: () => <Trans i18nKey="fields.user_type" />,
    dataIndex: "type",
    responsive: ["lg"],
    render: (value) => <RoleTag role={value} />,
  },
  {
    title: () => <Trans i18nKey="fields.organization" />,
    dataIndex: ["organization", "name"],
    ellipsis: true,
    responsive: ["xl"]
  },
];


export default function UserCrud() {
  const service = new UserService();
  const { t } = useTranslation();

  return (
    <Crud<User, UserFormSchema>
      title={t("headings.user_list")}
      idSource="uid"
      columns={columns}
      service={service}
      reducer={userSlice}
      selectLoading={(state) => state.users.isLoading}
      selectResults={(state) => state.users.results}
      createModal={({ visible, loading, onSave, onClose }) => (
        <UserForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
        />
      )}
      editModal={({ record, visible, loading, onClose, onSave }) => (
        <UserForm
          show={visible}
          isLoading={loading}
          onSave={onSave}
          onHide={onClose}
          defaults={{
            ...record,
            organizationId: record.organization.id,
          }}
          isEdit
        />
      )}
      detailModal={({ record, visible, onClose }) => (
        <AppDrawer title={record.firstName} visible={visible} onClose={onClose}>
          User Detail
        </AppDrawer>
      )}
    />
  );
}
