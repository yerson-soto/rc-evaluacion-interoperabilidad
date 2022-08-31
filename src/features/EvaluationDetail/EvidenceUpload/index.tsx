import React from "react";
import { Image, ImageProps, Space, Tooltip } from "antd";
import { useEvidenceUpload, EvidenceUploadOptions } from "./useEvidenceUpload";
import { withIfDirective } from "library/hocs/withIfDirective";
import { RequiredEvidence } from "library/models/RequiredEvidence";

import Upload from "./EvidenceUpload";
import isImage from "library/helpers/is-image";
import classes from "./EvidenceUpload.module.css";

const PreviewIf = withIfDirective<ImageProps>(Image);

export function EvidenceUpload(props: EvidenceUploadOptions) {
  const { question, onChange } = props;
  const questionEvidences = question.choosenAnswer?.requiredEvidences || [];
  const {
    isPreviewVisible,
    previewImage,
    previewTitle,
    setPreviewVisible,
    previewType,
    handleChange,
    handlePreview,
    handleRemove,
  } = useEvidenceUpload(props);


  const renderEvidence = (evidence: RequiredEvidence) => {
    const providedEvidence = question.answerEvidences.find(
      (answerEvidence) => answerEvidence.id === evidence.id
    );
    const defaultFile = providedEvidence ? providedEvidence.file : null;

    return (
      <Tooltip key={evidence.id} title={evidence.title}>
        <div className={classes.previewBox}>
          <Upload
            file={defaultFile}
            title={evidence.title}
            accept={evidence.contentType.join(",")}
            onPreview={handlePreview}
            onChangeFile={(file) => handleChange(evidence, file)}
            onRemoveFile={() => handleRemove(evidence)}
          />
        </div>
      </Tooltip>
    );
  }

  return (
    <React.Fragment>
      <Space size="middle" wrap>
        {questionEvidences.map(renderEvidence)}
      </Space>

      <PreviewIf
        if={isImage(previewType)}
        title={previewTitle}
        style={{ display: "none" }}
        preview={{
          visible: isPreviewVisible,
          src: previewImage,
          onVisibleChange: (value) => {
            setPreviewVisible(value);
          },
        }}
      />
    </React.Fragment>
  );
}
