import { useEffect, useRef, useMemo } from 'react';
import React from "react";
import { Table, Tag, Typography, Space } from 'antd';
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
import { useTranslation } from 'react-i18next';
import { Choice } from "library/models/Choice";
import chroma from 'chroma-js';
import { Evaluation } from 'library/models/Evaluation';
import { QuestionService } from 'library/api/services/QuestionService';
import { CompletedQuestion, Question } from '../../../library/models/Question';

// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const sharedOnCell = (_: DataType, index: number) => {
  if (index === 4) {
    return { colSpan: 0 };
  }

  return {};
};

interface DataType extends FullCriterion {
  key: number;
  score: number;
}

interface TableVersionProps {
  evaluation?: Evaluation;
}

const getInitialColumns = (dataSource: DataType[]): ColumnsType<DataType> => {
  return [
    {
      title: "Dominio",
      dataIndex: ["domain", "name"],
      align: "center",
      onCell: (record, key ) => {
        const cellProps: any = { 
          style: { background: record.domain.color },
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
      
      onHeaderCell: (value, record) => {
        return {
          style: {
            backgroundColor: "#b4c6e7",
          },
        };
      },
    },
    {
      title: (
        <div>
          Resultado
  
          <div style={{ background: "#ffffff" }}>
            0
          </div>
        </div>
      ),
      align: "center",
      dataIndex: "score",
      onCell: (record, key) => {
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
  
        return { };
      },
      onHeaderCell: (value, record) => {
        return {
          style: {
            backgroundColor: "#b4c6e7",
          },
        };
      },
    },
    {
      title: "Lineamiento",
      align: "center",
      dataIndex: "lineaments",
      render: (values: Lineament[], record) => {
        return values.map((value) => <p key={value.id}>{value.nomenclature}</p>);
      },
      onHeaderCell: (value, record) => {
        return {
          style: {
            backgroundColor: "#b4c6e7",
          },
        };
      },
      onCell: (record, key) => {
        return {
          style: { background: record.domain.color }
        }
      }
    },
    {
      title: "Criterio",
      dataIndex: "name",
      onHeaderCell: (value, record) => {
        return {
          style: {
            backgroundColor: "#b4c6e7",
          },
        };
      },
      onCell: (record, key) => {
        return {
          style: { background: record.domain.color },
        }
      }
    },
  ]
}


export default function TableVersion(props: TableVersionProps) {
  const [columns, setColumns] = React.useState<ColumnsType<DataType>>([]);
  const [records, setRecords] = React.useState<DataType[]>([]);

  const [questions, setQuestions] = React.useState<CompletedQuestion[]>([]);
  
  const criterionService = new CriterionService();
  const levelService = new LevelService();

  const questionService = new QuestionService();
  const { evaluation } = props;
  

  const { t } = useTranslation();
 
  useEffect(() => {
    const fetchRecords = async () => {
      const [criteria, levels, completedQuestions] = await Promise.all([
        criterionService.getDetailed(),
        levelService.getAll(),
        evaluation && questionService.getCompletedQuestions(evaluation.uid)
      ]);

      if (completedQuestions) {
        setQuestions(completedQuestions);
      }

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
        title: `${t("labels.level")} ${level.value}`,
        onHeaderCell: (value, record) => {
          return {
            style: {
              backgroundColor: colorRange[index],
            },
          };
        },
        render: (value, record) => {
          const question = questions.find(q => q.criterion.id === record.id && q.choosenAnswer.level.id === level.id);
          // console.log(questions);
          const choice = record.choices.find(choice => choice.level.id === level.id);
          return <Space direction="vertical">
            <div>
            {choice ? choice.details : 'N/A'}
            </div>
            {question && <a href="">Ver evidencias</a>}
          </Space>;
        },
        onCell: (record, key) => {
          const isSelected = questions.some(q => q.criterion.id === record.id && q.choosenAnswer.level.id === level.id);
          
          return {
            style: {
              backgroundColor: isSelected ? colorRange[index] : "#ffffff",
            },
          };
        },
      }))

      setRecords(dataSource);
      setColumns(getInitialColumns(dataSource).concat(newColumns).concat([
        {
          title: "Nivel Actual",
          fixed: "right",
          onHeaderCell: (value, record) => {
            return {
              style: {
                backgroundColor: "#b4c6e7",
              },
            };
          },
        },
      ]));
    };

    fetchRecords();
  }, []);

  return (
    <Table
      bordered
      sticky={{
        offsetHeader: 46,
      }}
      dataSource={records}
      columns={columns}
      size="small"
      pagination={false}
      // scroll={{ x: 1500, y: 300 }}
    />
  );
}
