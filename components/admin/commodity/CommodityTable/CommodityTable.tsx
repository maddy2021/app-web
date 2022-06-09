import React, { FC } from 'react';
import { Table } from 'antd';
import commodityColumns from './commodityColumns';

interface Props {
  data: any[];
  loading: boolean;
}

const CommodityTable: FC<Props> = ({ data , loading }) => {
  return (
    <Table
      columns={commodityColumns}
      dataSource={data}
      size="middle"
      rowKey="id"
      loading={loading}
    />
  );
};

export default CommodityTable;
