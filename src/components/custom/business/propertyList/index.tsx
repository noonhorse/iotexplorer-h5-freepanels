/*
 * @Author: wrq
 * @Date: 2021-09-20 10:40:50
 * @Description: 通用布局样式 以每行为准，均分
 */
import React, { useMemo } from 'react';
import { Row, Col } from '../../layout';
import { groupArrayItems } from '../../../utils';

// 每行最大允许列数
const MAX_COL_COUNT = 12;

export enum PropertyLayoutType {
  Mini = 'mini',
  Medium = 'medium',
  Wide = 'wide'
}

const LayoutTypes = {
  [PropertyLayoutType.Mini]: {
    name: '小按钮',
    colSpan: 4,
    cardDirection: 'column'
  },
  [PropertyLayoutType.Medium]: {
    name: '中按钮',
    colSpan: 6,
    cardDirection: 'row'
  },
  [PropertyLayoutType.Wide]: {
    name: '长按钮',
    colSpan: 12,
    cardDirection: 'row'
  }
};

export interface PropertyConfig {
  id: string | number;
  name: string;
  title: string;
  icon?: string;
}

export interface PropertyListProps {
  templateList: PropertyConfig[];
  renderProperty: (options: {
    templateConfig: PropertyConfig;
    cardDirection: string;
  }) => React.ReactNode;
  // 布局类型
  layoutType: PropertyLayoutType; // 长按钮:wide, 中按钮:medium, 小按钮:mini
}

export function PropertyList({
  templateList,
  renderProperty,
  layoutType
}: PropertyListProps) {
  const cardLayoutParams = LayoutTypes[layoutType];

  // 模板数据计算 - 当 cardLayoutParams 或 templateList 改变时进行计算
  const groupedTemplateList: PropertyConfig[][] = useMemo(() => {
    return groupArrayItems(
      templateList,
      MAX_COL_COUNT / cardLayoutParams.colSpan
    );
  }, [cardLayoutParams, templateList]);

  return (
    <>
      {groupedTemplateList.map((row, index) => (
        <Row key={index}>
          {row.map((templateConfig, index) => (
            <Col span={cardLayoutParams.colSpan} key={index}>
              {renderProperty({
                templateConfig,
                cardDirection: cardLayoutParams.cardDirection
              })}
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
}
