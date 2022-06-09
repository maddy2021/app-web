import React, { FC } from 'react';
import { Table } from 'antd';
import subscriberColumns from './SubscriberColumns';

interface Props {
  data: any[];
  loading: boolean;
}

const SubscriberTable: FC<Props> = ({ data, loading }) => {
  return (
    <Table
      columns={subscriberColumns}
      dataSource={data}
      rowKey="id"
      size="middle"
      loading={loading}
    />
  );
};

export default SubscriberTable;
