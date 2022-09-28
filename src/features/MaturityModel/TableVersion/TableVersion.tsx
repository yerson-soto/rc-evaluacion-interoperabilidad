import { useEffect, useRef, useMemo } from 'react';
import React from "react";
import { Table, Tag, Typography, Space, Modal, Upload } from 'antd';
import type { ColumnsType } from "antd/es/table";
import { FullCriterion } from "library/models/Criterion";
import { Domain } from "../../../library/models/Domain";
import { Lineament } from "../../../library/models/Lineament";
import { useListAction } from "../../Crud/useListAction";
import { DomainService } from "library/api/services/DomainService";
import { domainSlice } from "redux/slices/domainSlice";
import { CriterionService } from "../../../library/api/services/CriterionService";
import { LevelService } from "library/api/services/LevelService";
import { Level } from "library/models/Level";
import { levelSlice, LevelState } from "redux/slices/levelSlice";
import { Trans, useTranslation } from 'react-i18next';
import { Choice } from "library/models/Choice";
import chroma from 'chroma-js';
import { Evaluation } from 'library/models/Evaluation';
import { QuestionService } from 'library/api/services/QuestionService';
import { CompletedQuestion, Question } from '../../../library/models/Question';
import axios from 'axios';
import { backend } from '../../../library/api/services/AbstractApiService';


interface DataType extends FullCriterion {
  key: number;
  score: number;
}

interface TableVersionProps {
  
  evaluation?: Evaluation;
}

const getInitialColumns = (dataSource: DataType[], evaluation?: Evaluation, domainResults?: { id: number, result: number }[]): ColumnsType<DataType> => {
  const domainsResultList = domainResults || [];
  
  return [
    {
      title: <Trans i18nKey="labels.domain" />,
      dataIndex: ["domain", "name"],
      align: "center",
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#b4c6e7",
          },
        };
      },
      onCell: (record) => {
        const cellProps: any = { 
          style: { background: record.domain.color, fontWeight: "bold" },
        }

        const recordsByDomain = dataSource.filter(
          (criterion) => criterion.domain.id === record.domain.id
        );
  
        if (recordsByDomain.length > 0) {
          const isFirstOfType = recordsByDomain[0].id === record.id;
  
          if (isFirstOfType) {
            cellProps.rowSpan = recordsByDomain.length;
          } else {
            cellProps.rowSpan = 0;
          }
        }
  
        return cellProps;
      },
    },
    {
      title: (
        <div>
          <Trans i18nKey="labels.result" />
  
          <div style={{ background: "#ffffff" }}>
            {evaluation ? Number(evaluation.score).toFixed(2) : 0}
          </div>
        </div>
      ),
      align: "center",
      dataIndex: ["domain", "id"],
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#b4c6e7",
          },
        };
      },
      onCell: (record) => {
        const recordsByDomain = dataSource.filter(
          (criterion) => criterion.domain.id === record.domain.id
        );
  
        if (recordsByDomain.length > 0) {
          const isFirstOfType = recordsByDomain[0].id === record.id;
  
          if (isFirstOfType) {
            return { rowSpan: recordsByDomain.length };
          } else {
            return { rowSpan: 0 };
          }
        }
  
        return {};
      },
      render: (value, record, index) => {
        const punct = domainsResultList.find(d => d.id === record.domain.id);

        return punct ? Number(punct.result).toFixed(2) : 0;
      },
    },
    {
      title: <Trans i18nKey="labels.lineaments" />,
      align: "center",
      dataIndex: "lineaments",
      render: (values: Lineament[], record) => {
        return values.map((value) => <p key={value.id}>{value.nomenclature}</p>);
      },
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#b4c6e7",
          },
        };
      },
      onCell: (record) => {
        return {
          style: { background: record.domain.color, fontWeight: "bold" }
        }
      }
    },
    {
      title: <Trans i18nKey="labels.criterions" />,
      dataIndex: "name",
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#b4c6e7",
          },
        };
      },
      onCell: (record) => {
        return {
          style: { background: record.domain.color, fontWeight: "bold" },
        }
      }
    },
  ]
}


export default function TableVersion(props: TableVersionProps) {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [columns, setColumns] = React.useState<ColumnsType<DataType>>([]);
  const [records, setRecords] = React.useState<DataType[]>([]);

  const [questions, setQuestions] = React.useState<CompletedQuestion[]>([]);
  const [currentLevels, setCurrentLevels] = React.useState<Record<number, number>>({});
  
  const criterionService = new CriterionService();
  const levelService = new LevelService();

  const questionService = new QuestionService();
  const { evaluation } = props;
  
  const { t } = useTranslation();
 
  useEffect(() => {
    const fetchRecords = async () => {
      // const [criteria, levels] = await Promise.all([
      //   criterionService.getDetailed(),
      //   levelService.getAll()
      // ]);
      setLoading(true);
      const criteria = await criterionService.getDetailed();
      const levels = await levelService.getAll();

      const domainResponses: any = evaluation 
      ? await backend.get(`/evaluationInstitutional/resultCurrent/${evaluation.uid}`)
      : [];
      
      const domainResults = evaluation 
      ? domainResponses.data.result.map((res: any) => ({
        id: res.domainResponse?.id,
        result: res.currentResult
      })) : [];

      const completedQuestions = evaluation 
        ? await questionService.getCompletedQuestions(evaluation.uid)
        : [];

      setQuestions(completedQuestions);      

      const dataSource: DataType[] = criteria
          .sort((a, b) => a.domain.id - b.domain.id)
          .map((criterion) => ({
            ...criterion,
            score: 0,
            key: criterion.id,
          }));

      const colorRange = chroma
        .scale(["#fce4d7", "#fff1cf", "#feffd5", "#e2efda", "#c6e0b3"])
        .colors(levels.length);

      const newColumns: ColumnsType<DataType> = levels.map((level, index) => ({
        title: <div style={{ textAlign: 'center'}}>
         { `${t("labels.level")} ${level.value}`}
         <div>
          {level.name}
         </div>
        </div>,
        onHeaderCell: (value, record) => {
          return {
            style: {
              backgroundColor: colorRange[index],
            },
          };
        },
        render: (value, record) => {
          const question = questions.find(q => q.criterion.id === record.id && q.choosenAnswer.level.id === level.id);
          const choice = record.choices.find(choice => choice.level.id === level.id);

          if (question) {
            setCurrentLevels({
              ...currentLevels,
              [question.criterion.id]: question.choosenAnswer.level.value
            })
          }
         
          return <Space direction="vertical">
            <div>
            {choice ? choice.details : 'N/A'}
            </div>
            {question?.answerEvidences.length ? <a href="" onClick={(e) => {
              e.preventDefault();
              Modal.info({
                okText: "Cerrar",
                title: `${record.name} - Evidencias`,
                content: (
                  <Upload 
                  showUploadList={{
                    showRemoveIcon: false,
                  }}
                  listType="picture" 
                  defaultFileList={question.answerEvidences.map(q => ({ ...q.file, name: q.title }))}
                  >
                    
                  </Upload>
                ),
                onOk() {},
              });
            }}>Ver evidencias</a> : null}
          </Space>;
        },
        onCell: (record, key) => {
          const isSelected = questions.some(q => q.criterion.id === record.id && q.choosenAnswer.level.id === level.id);

          return {
            style: {
              backgroundColor: isSelected ? "#e6efff" : "#ffffff",
              border: isSelected ? "1px solid #b4c6e7" : "1px solid #f0f0f0",
              // backgroundColor: isSelected ? colorRange[index] : "#ffffff",
            },
          };
        },
      }))

      setRecords(dataSource);

      let allColumns = getInitialColumns(dataSource, evaluation, domainResults).concat(newColumns);

      if (evaluation) {
        allColumns = allColumns.concat([
          {
            title: "Nivel Actual",
            dataIndex: "id",
            fixed: "right",
            onHeaderCell: (value, record) => {
              return {
                style: {
                  backgroundColor: "#b4c6e7",
                },
              };
            },
            render: (value, record) => {
              const question = questions.find(q => q.criterion.id === record.id);
              return question ? question.choosenAnswer.level.value : '-';
            },
          },
        ])
      }

      setColumns(allColumns);
      setLoading(false);
    };

    fetchRecords();
  }, [questions.length, evaluation]);

  return (
    <Table
      loading={isLoading}
      bordered
      // sticky={{
      //   offsetHeader: 46,
      // }}
      dataSource={records}
      columns={columns}
      size="small"
      pagination={false}
      // scroll={{ x: 1500, y: 300 }}
    />
  );
}
