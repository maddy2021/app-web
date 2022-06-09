import { Form, Select, Table } from 'antd';
import React, { FC } from 'react';
import { LabelValue } from '../../../../type/common';

interface Props{
  form: any,
  spreadMonths : any[],
  handleTableChange : () => void,
  tableData : any[]
  loading : boolean;
}

const ExplainabilityTable:FC<Props> = ({form , spreadMonths , handleTableChange , tableData , loading}) => {
  const { Option } = Select;
  const column = [
    {
      title: 'Spread Month',
      dataIndex: 'Spread Month',
      key: 'spread_month',
      className: 'font-semibold',
    },
    {
      title: 'Value',
      dataIndex: 'Value',
      key: 'value',
      className: 'text-gray-600',
    },
  ];
  return (
    <>
      <Form name="table" form={form}>
        <Form.Item label="Month" name="spreadMonth" className="w-48">
          <Select onChange={() => handleTableChange()}>
            {spreadMonths.map((data: LabelValue) => {
              return (
                <Option key={data.value} value={data.value}>
                  {data.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
      <Table
        loading={loading}
        style={{ width: '500' }}
        columns={column}
        dataSource={tableData}
        pagination={false}
        scroll={{ y: 400 }}
        rowKey="spread_month"
        size="middle"
      />
    </>
  );
};

export default ExplainabilityTable;
