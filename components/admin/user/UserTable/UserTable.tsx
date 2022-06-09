import React, { FC } from 'react';
import { Table } from 'antd';
import userColumn from './userColumns';

interface Props {
  data: any[];
  loading: boolean;
}

const UserTable: FC<Props> = ({ data, loading }) => {
  return (
    <Table
      columns={userColumn}
      dataSource={data}
      rowKey="id"
      size="middle"
      loading={loading}
    />
  );
};

export default UserTable;
