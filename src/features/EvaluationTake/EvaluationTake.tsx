import React from "react";
import { ParamKeyValuePair, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import {
  PageHeader,
  Collapse,
  Row,
  Col,
  Typography,
  Tag,
  Card,
  Space,
  Affix,
  Descriptions,
} from "antd";

import { Box } from "library/components/Box";

import { AnswerRadio } from "features/EvaluationTake/AnswerRadio";

import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { Score } from "library/components/Score";
import { DomainList } from "./DomainList";
import { Questionary } from "./Questionary";
import { Domain } from "library/models/Domain";
import { reverse } from "named-urls";
import { paths } from "library/common/constants";

// import { useLocation } from "react-router";

// export default function useQueryParams(): URLSearchParams {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   return queryParams;
// }

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default function EvaluationTake() {
  const [visible, setVisible] = React.useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    'domain': 'slug'
  })
  
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation();

  const [value, setValue] = React.useState(1);
  
  const showEvaluation = (domain: Domain) => {
    // setVisible(true);
    navigate('/evaluaciones/abcd/iniciar/dominio-organizacion');
  };

  const closeEvaluation = () => {
    navigate('/evaluaciones/abcd/iniciar');
    // setVisible(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  console.log(params, searchParams);

  console.log(reverse(paths.evaluations.detail.evaluate.domain, {
    uid: "5",
    domainSlug: "dominio-organizacional",
  }))
  return (
    <Box>
      <PageHeader
        onBack={() => navigate("/evaluaciones")}
        title={t("headings.complete_evaluation")}
      />

      <DomainList onEvaluate={showEvaluation} onReset={() => {}} />
      <Questionary isOpen={!!params.slug} onClose={closeEvaluation} />
    </Box>
  );
}
