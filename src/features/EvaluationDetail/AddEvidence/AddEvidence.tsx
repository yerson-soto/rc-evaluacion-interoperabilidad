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
import { Button, message } from 'antd';
import { ContentType } from "library/common/enums";
import type { RcFile, UploadFile, UploadListType } from "antd/es/upload/interface";

import { GrDocumentPdf, GrDocumentTxt } from 'react-icons/gr';
import { SiMicrosoftword, SiMicrosoftexcel } from 'react-icons/si';
import { AiOutlineFileUnknown } from 'react-icons/ai';

import classes from "./AddEvidence.module.css";
import { AppBox } from "library/components/AppBox";
import { useTranslation } from "react-i18next";
import ImgCrop from "antd-img-crop";

import WordPreview from "resources/images/word-preview.svg";
import ExcelPreview from "resources/images/excel-preview.svg";
import PDFPreview from "resources/images/pdf-preview.svg";
import {ReactComponent as PDFPreviewIcon} from "resources/images/pdf-preview.svg";
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
  const { question } = props;
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewType, setPreviewType] = useState("");

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const evidences = question.selectedAnswer?.requiredEvidences || [];

  const handleCancel = () => setPreviewVisible(false);

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

  const completeQuestion: UploadProps["onChange"] = (params) => {
    const { fileList: newFileList } = params;

    if (newFileList.length > 0) {
      dispatch(actions.completeSuccess(question));
    } else {
    }
  };

  return (
    <React.Fragment>
      <Space size="middle" wrap>
        {evidences.map((evidence) => (
          <AppBox className={classes.previewBox}>
          <EvidenceUpload
            key={evidence.id}
            title={evidence.title}
            accept={evidence.contentType.join(",")}
            onPreview={handlePreview}
            onChange={completeQuestion}
          />
        </AppBox>
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

  const previewFile: UploadProps<any>["previewFile"] = (file: File | Blob) => {
    return new Promise((resolve, reject) => {
      const isWord = ContentType.WORD === file.type;
      const isExcel = ContentType.EXCEL === file.type;
      const isPdf = ContentType.PDF === file.type;

      if (isWord) {
        resolve(WordPreview);
      } else if (isExcel) {
        resolve(ExcelPreview);
      } else if (isPdf) {
        resolve(PDFPreview);
      }
    });
  };

  const renderPreview = (file: UploadFile): React.ReactNode => {
    const isWord = ContentType.WORD === file.type;
    const isExcel = ContentType.EXCEL === file.type;
    const isPdf = ContentType.PDF === file.type;
    const isTxt = ContentType.TEXT === file.type;

    if (isWord) {
      return <SiMicrosoftword style={{ color: "#2A5699" }} size={28}/>;
    } else if (isExcel) {
      return <SiMicrosoftexcel style={{ color: "#0D9048" }} size={28} />;
    } else if (isPdf) {
      return <GrDocumentPdf style={{ color: "#C80A0A" }} size={28} />;
    } else if (isTxt) {
      return <GrDocumentTxt style={{ color: "#688D89" }} size={28} />
    } else {
      return <AiOutlineFileUnknown style={{ color: "#A4A4A4" }} size={28} />
    }
  }

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
      onRemove={handleRemove}
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
