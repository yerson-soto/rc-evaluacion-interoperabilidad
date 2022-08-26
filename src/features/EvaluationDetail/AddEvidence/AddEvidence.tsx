import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Image as AntImage, Alert, Space, UploadProps } from "antd";
import { useUploadHandler } from "./useAddEvidence";
import { UploadOutlined } from "@ant-design/icons";
import { RequiredEvidence } from "library/models/RequiredEvidence";
import { Button, message } from "antd";
import { ContentType } from "library/common/enums";
import type { RcFile, UploadFile } from "antd/es/upload/interface";

import classes from "./AddEvidence.module.css";
import { AppBox } from "library/components/AppBox";
import { useTranslation } from "react-i18next";
import ImgCrop from "antd-img-crop";

import WordPreview from "resources/images/word-preview.svg";
import ExcelPreview from "resources/images/excel-preview.svg";
import PDFPreview from "resources/images/pdf-preview.svg";
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

const getSrcFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
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

  const onPreview = async (file: any) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };
  
  return (
    <React.Fragment>
      <Space wrap>
        {evidences.map((evidence) => (
          <EvidenceUpload
            key={evidence.id}
            title={evidence.title}
            accept={evidence.contentType.join(",")}
            onPreview={handlePreview}
            onChange={completeQuestion}
          />
        ))}
      </Space>

      {[ContentType.JPEG, ContentType.JPG, ContentType.PNG].includes(
        previewType as ContentType
      ) && (
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
  // const [uploading, setUploading] = useState(false);

  const { title = "Subir", onChange, ...extraProps } = props;

  const handleChange: UploadProps["onChange"] = (params) => {
    const { fileList: newFileList } = params;
    setFileList(newFileList);

    if (onChange) onChange(params);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{title}</div>
    </div>
  );

  const handleRemove = (file: UploadFile<any>) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const beforeUpload = (file: RcFile) => {
    setFileList([...fileList, file]);

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

  const contentTypes = extraProps.accept?.split(",") || [];
  const isImage = contentTypes.some((contentType) =>
    [ContentType.JPEG, ContentType.JPG, ContentType.PNG].includes(
      contentType as ContentType
    )
  );

  const upload = (
    <Upload
      listType="picture-card"
      maxCount={1}
      onRemove={handleRemove}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      previewFile={isImage ? undefined : previewFile}
      fileList={fileList}
      {...extraProps}
    >
      {fileList.length >= 1 ? null : uploadButton}
    </Upload>
  );

  return isImage ? <ImgCrop rotate>{upload}</ImgCrop> : upload;
}

export function Manually() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    listType: "picture-card",
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      {/* <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button> */}
    </>
  );
}
