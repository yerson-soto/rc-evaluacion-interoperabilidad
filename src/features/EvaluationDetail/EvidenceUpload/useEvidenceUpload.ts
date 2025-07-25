import React, { useState } from "react";
import { RequiredEvidence } from "library/models/RequiredEvidence";
import { Question } from "library/models/Question";
import { AnswerEvidence, EvidenceFile } from "library/models/Question";
import isImage from "library/helpers/is-image";
import type { RcFile, UploadFile } from "antd/es/upload/interface";

const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

const createEvidenceFile = (file: UploadFile): EvidenceFile => {
  const url = window.URL.createObjectURL(file as any);
  return { uid: file.uid, name: file.name, type: file.type as string, url };
};

export interface EvidenceUploadOptions {
  question: Question;
  onChange: (evidences: AnswerEvidence[]) => void;
}

export function useEvidenceUpload({ question, onChange }: EvidenceUploadOptions) {
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewType, setPreviewType] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (isImage(file.type || '')) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }
  
      setPreviewImage(file.url || (file.preview as string));
      setPreviewVisible(true);
      setPreviewTitle(
        file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
      );
      setPreviewType(file.type || "");
    } else {
      window.open(file.url, '_blank');
    }
  };

  const handleChange = (evidence: RequiredEvidence, file: UploadFile) => {
    const shouldRestartEvidences = question.choosenAnswer?.requiredEvidences.every((re) => {
      return evidence.id !== re.id;
    });

    // Validate all evidences belongs to selected answer
    const requiredIds = question.choosenAnswer?.requiredEvidences.map(re => re.id) || [];
    const initialEvidences = question.answerEvidences.filter(ae => requiredIds.includes(ae.id)) 
    
    const newEvidences = shouldRestartEvidences ? [] : [...initialEvidences];
    const newEvidence: AnswerEvidence = {
      ...evidence,
      file: createEvidenceFile(file),
    };

    const evidenceIndex = newEvidences.findIndex((e) => e.id === evidence.id);

    if (evidenceIndex !== -1) {
      newEvidences.splice(evidenceIndex, 1, newEvidence);
    } else {
      newEvidences.push(newEvidence);
    }

    onChange(newEvidences);
  };

  const handleRemove = (evidence: RequiredEvidence) => {
    const newEvidences = [...question.answerEvidences];
    const evidenceIndex = newEvidences.findIndex((e) => e.id === evidence.id);

    if (evidenceIndex !== -1) {
      newEvidences.splice(evidenceIndex, 1);
    }

    onChange(newEvidences);
  };

  return {
    isPreviewVisible,
    previewImage,
    previewTitle,
    setPreviewVisible,
    previewType,
    handlePreview,
    handleChange,
    handleRemove,
  };
}
