import { Form } from "antd";
import { LineamentFormSchema } from "./LineamentFormSchema";
import { useListAction } from "features/Crud/useListAction";
import { DomainService } from "library/api/services/DomainService";
import { Domain } from "library/models/Domain";
import { domainSlice } from "main/store/slices/domainSlice";

export function useLineamentForm() {
  const [form] = Form.useForm<LineamentFormSchema>();

  const domainService = new DomainService();

  const { results: domains } = useListAction<Domain>({
    selectLoading: (state) => state.domains.isLoading,
    selectResults: (state) => state.domains.results,
    reducer: domainSlice,
    service: domainService,
  });

  const resetForm = (): void => {
    form.resetFields();
  };

  return { form, domains, resetForm };
}
