import { ColumnsType } from "antd/lib/table";
import { useTranslation } from 'react-i18next';
import { AppDrawer } from "library/components/AppDrawer";
import { UserForm } from "./UserForm";
import { UserFormSchema } from "./UserForm/UserFormSchema";
import { User } from 'library/models/User';
import { UserService } from 'library/api/services/UserService';
import { userSlice } from 'main/store/slices/userSlice';
import { Crud } from "features/Crud";
import { getText } from "i18n";

const columns: ColumnsType<User> = [
  {
    title: getText("fields.first_name") as string,
    dataIndex: "firstName",
    ellipsis: true,
    responsive: ['sm']
  },
  {
    title: getText("fields.last_name") as string,
    dataIndex: "lastName",
    ellipsis: true,
    responsive: ['md']
  },
  {
    title: getText("fields.email") as string,
    dataIndex: "email",
    ellipsis: true,
    
  }
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
          defaults={record}
          isEdit
        />
      )}
      detailModal={({ record, visible, onClose }) => (
        <AppDrawer 
          title={record.firstName} 
          visible={visible} 
          onClose={onClose}
        >
          User Detail
        </AppDrawer>
      )}
    />
  );
}
