import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Modal,
  Upload,
  Image as AntImage,
  Alert,
  Space,
  UploadProps,
  Tooltip,
} from "antd";
import { useUploadHandler } from "./useAddEvidence";
import { UploadOutlined } from "@ant-design/icons";
import { RequiredEvidence } from "library/models/RequiredEvidence";
import { Button, message } from "antd";
import { ContentType } from "library/common/enums";
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadListType,
} from "antd/es/upload/interface";

import { GrDocumentPdf, GrDocumentTxt, GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftword, SiMicrosoftexcel } from "react-icons/si";
import { AiOutlineFileUnknown } from "react-icons/ai";

import classes from "./AddEvidence.module.css";
import { AppBox } from "library/components/AppBox";
import { useTranslation } from "react-i18next";
import ImgCrop from "antd-img-crop";

import WordPreview from "resources/images/word-preview.svg";
import ExcelPreview from "resources/images/excel-preview.svg";
import PDFPreview from "resources/images/pdf-preview.svg";
import { ReactComponent as PDFPreviewIcon } from "resources/images/pdf-preview.svg";
import { Question } from "library/models/Question";
import { useAppDispatch } from "redux/hooks";
import { actions } from "redux/slices/questionSlice";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface AddEvidenceProps {
  question: Question;
  onChange: (fileList: UploadFile[]) => void;
}

const getSrcFromFile = (file: UploadFile): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj as Blob);
    reader.onload = () => resolve(reader.result as string);
  });
};

const isImage = (contentType: string | ContentType): boolean => {
  return [ContentType.JPEG, ContentType.JPG, ContentType.PNG].includes(
    contentType as ContentType
  );
};



export default function AddEvidence(props: AddEvidenceProps) {
  // const [fileList, setFileList] = useState<EvidenceList[]>([]);
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewType, setPreviewType] = useState("");

  const { question, onChange } = props;

  const evidences = question.choosenAnswer?.requiredEvidences || [];

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
    setPreviewType(file.type || "");
  };

  const handleChange = (evidence: RequiredEvidence, file: UploadFile) => {
    // onChange([...]);
  };

  const handleRemove = (evidence: RequiredEvidence) => {
    // const newFileList = [...fileList].filter(file => file.evidenceId === evidence.id);

    // setFileList(newFileList);
  }

  return (
    <React.Fragment>
      <Space size="middle" wrap>
        {evidences.map((evidence) => (
          <Tooltip key={evidence.id} title={evidence.title}>
            <div className={classes.previewBox}>
              <EvidenceUpload
                title={evidence.title}
                accept={evidence.contentType.join(",")}
                onPreview={handlePreview}
                // onAddFile={handleChange}
                // onRemoveFile={handleRemove}
              />
            </div>
          </Tooltip>
        ))}
      </Space>

      {isImage(previewType) && (
        <AntImage
          style={{ display: "none" }}
          preview={{
            visible: isPreviewVisible,
            src: previewImage,
            onVisibleChange: (value) => {
              setPreviewVisible(value);
            },
          }}
        />
      )}
    </React.Fragment>
  );
}

interface EvidenceUploadProps extends UploadProps {
  title: string;
  // onAddFile: (file: UploadFile) => void;
  // onRemoveFile: () => void;
}

export function EvidenceUpload(props: EvidenceUploadProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { title = "Subir", onChange, ...extraProps } = props;

  const fileType = fileList[0]?.type || "";
  const showImagePreview = isImage(fileType);
  
  const contentTypes = extraProps.accept?.split(",") || [];
  const isOnlyImage = contentTypes.every(isImage);
  
  const handleChange: UploadProps["onChange"] = (params) => {
    const { fileList: newFileList } = params;
    setFileList(newFileList);

    if (onChange) onChange(params);
  };
  
  const handleRemove = (file: UploadFile<any>) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const beforeUpload = async (file: RcFile) => {
    if (isOnlyImage) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newFile = file as UploadFile;
        newFile.url = reader.result as any;
        setFileList([...fileList, newFile]);
      };
    } else {
      setFileList([...fileList, file]);
    }

    return false;
  };

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
      // onRemove={handleRemove}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      fileList={fileList}
      {...extraProps}
    >
      {fileList.length >= 1 ? null : uploadButton}
    </Upload>
  );

  return isOnlyImage ? <ImgCrop rotate>{upload}</ImgCrop> : upload;
}
