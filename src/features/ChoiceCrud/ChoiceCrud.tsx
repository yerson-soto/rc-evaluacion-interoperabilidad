import React from "react";
import { Space } from "antd";
import { useTranslation } from "react-i18next";
import { ChoiceFormSchema } from "./ChoiceForm/ChoiceFormSchema";
import { Choice } from "library/models/Choice";
import { ChoiceService } from "library/api/services/ChoiceService";
import { choiceSlice, ChoiceState } from "redux/slices/choiceSlice";
import { ChoiceForm } from "./ChoiceForm";
import { Toolbar } from "library/components/Toolbar";
import { CreateAction } from "features/Crud/CreateAction";
import { MaturityModel } from "features/MaturityModel";


export default function ChoiceCrud() {
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={30}>
      <ChoiceToolbar />
      <MaturityModel />
    </Space>
  );
}

function ChoiceToolbar() {
  const choiceService = new ChoiceService();

  const { t } = useTranslation();

  return (
    <Toolbar
      title={t("headings.choice_config")}
      actions={
        <CreateAction<Choice, ChoiceFormSchema, ChoiceState>
          toggleKey="create-choice"
          reducer={choiceSlice}
          service={choiceService}
          selectLoading={(state) => state.auth.isLoading}
          renderForm={({ visible, loading, onClose, onSave }) => (
            <ChoiceForm
              show={visible}
              isLoading={loading}
              onHide={onClose}
              onSave={onSave}
            />
          )}
        />
      }
    />
  );
};
