import { useEffect, useRef, useMemo } from 'react';
import React from "react";
import { Table, Tag, Typography } from 'antd';
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
import { Question } from '../../../library/models/Question';

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
  
        return { key };
      },
      
      onHeaderCell: (value, record) => {
        return {
          style: {
            backgroundColor: "#b4c6e7",
          },
        };
      },
      render: (value, record) => {
        return {
          props: {
            style: { background: record.domain.color },
          },
          children: value,
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
  
        return { key };
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
        return {
          props: {
            style: { background: record.domain.color },
          },
          children: values.map((value) => <p>{value.nomenclature}</p>),
        };
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
      title: "Criterio",
      dataIndex: "name",
      render: (value, record) => {
        return {
          props: {
            style: { background: record.domain.color },
          },
          children: value,
        };
      },
      onHeaderCell: (value, record) => {
        return {
          style: {
            backgroundColor: "#b4c6e7",
          },
        };
      },
    },
  ]
}


export default function TableVersion() {
  const [columns, setColumns] = React.useState<ColumnsType<DataType>>([]);
  const [records, setRecords] = React.useState<DataType[]>([]);

  const [questions, setQuestions] = React.useState<Question[]>([]);
  
  const criterionService = new CriterionService();
  const levelService = new LevelService();

  const questionService = new QuestionService();
  

  const { t } = useTranslation();
 
  useEffect(() => {
    const fetchRecords = async () => {
      const [criteria, levels] = await Promise.all([
        criterionService.getDetailed(),
        levelService.getAll()
      ]);

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
          const choice = record.choices.find(choice => choice.level.id === level.id);
          return choice ? choice.details : 'N/A';
        },
        onCell: (value, record) => {
          return {
            style: {
              backgroundColor: "#b4c6e7",
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
