import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, UploadProps } from "antd";
import { ContentType } from "library/common/enums";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { GrDocumentPdf, GrDocumentTxt, GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftword, SiMicrosoftexcel } from "react-icons/si";
import { AiOutlineFileUnknown } from "react-icons/ai";
import { AppBox } from "library/components/AppBox";

import isImage from "library/helpers/is-image";
import ImgCrop from "antd-img-crop";
import classes from "./EvidenceUpload.module.css";

const renderPreview = (file: UploadFile): React.ReactNode => {
  const isCsv = ContentType.CSV === file.type;
  const isPdf = ContentType.PDF === file.type;
  const isTxt = ContentType.TEXT === file.type;
  const isWord = [ContentType.DOC, ContentType.DOCX].includes(
    file.type as ContentType
  );
  const isExcel = [ContentType.XLS, ContentType.XLSX].includes(
    file.type as ContentType
  );

  if (isWord) {
    return <SiMicrosoftword color="#2A5699" size={28} />;
  } else if (isExcel) {
    return <SiMicrosoftexcel color="#0D9048" size={28} />;
  } else if (isCsv) {
    return <GrDocumentCsv className={classes.csv} size={28} />;
  } else if (isPdf) {
    return <GrDocumentPdf className={classes.pdf} size={28} />;
  } else if (isTxt) {
    return <GrDocumentTxt className={classes.txt} size={28} />;
  } else {
    return <AiOutlineFileUnknown size={28} />;
  }
};

interface EvidenceUploadProps extends UploadProps {
  title: string;
  file: UploadFile | null;
  onChangeFile: (file: UploadFile) => void;
  onRemoveFile: (file: UploadFile) => void;
}

export default function(props: EvidenceUploadProps) {
  const { title, file, onChange, onChangeFile, onRemoveFile, ...extraProps } =
    props;

  const fileList = file ? [file] : [];
  const contentTypes = extraProps.accept?.split(",") || [];
  const isOnlyImage = contentTypes.every(isImage);

  const handleChange: UploadProps["onChange"] = (params) => {
    const { fileList: newFileList } = params;

    if (newFileList.length > 0) {
      onChangeFile(newFileList[0]);
    }
  };

  const beforeUpload = async (file: RcFile) => {
    if (isOnlyImage) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newFile = file as UploadFile;
        newFile.url = reader.result as any;
        onChangeFile(newFile);
      };
    } else {
      onChangeFile(file);
    }

    return false;
  };

  const uploadButton = (
    <AppBox className={classes.uploadContent}>
      <PlusOutlined />
      <AppBox className={classes.title}>{title}</AppBox>
    </AppBox>
  );

  const upload = (
    <Upload
      listType="picture-card"
      maxCount={1}
      iconRender={renderPreview}
      onRemove={onRemoveFile}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      fileList={fileList}
      {...extraProps}
    >
      {file ? null : uploadButton}
    </Upload>
  );

  return isOnlyImage ? <ImgCrop rotate>{upload}</ImgCrop> : upload;
}
