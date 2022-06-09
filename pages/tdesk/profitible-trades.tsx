import { Form, Select, Table } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import withAuthentication from '../../HOC/WithSuperAdmin/WithSuperAdmin';
import { LabelValue } from '../../type/common';
import {
  AS_MODEL_MONTH,
  AS_MODEL_PERCENTAGE,
  AS_MODEL_PROFIT_TRADES,
} from '../../url/pdesk';
import { get } from '../../util/servercall';

const ProfitibleTrades = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [percentage, setPercentage] = useState([]);
  const [month, setMonth] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading , setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const responsePercentage = await get(AS_MODEL_PERCENTAGE);
      setPercentage(responsePercentage.data);
      const responseMonth = await get(AS_MODEL_MONTH);
      setMonth(responseMonth.data);
      form.setFieldsValue({
        precentage: responsePercentage.data[0].value,
        month: responseMonth.data[0].value,
      });
    };
    fetchData();
  }, []);

  const fetchTableData = async () => {
    setLoading(true)
    const percentageData = form.getFieldValue('precentage');
    const monthData = form.getFieldValue('month');

    if (percentageData == undefined || monthData == undefined) {
      return;
    }

    const responseTable = await get(
      AS_MODEL_PROFIT_TRADES +
        `?spread_percentage=${percentageData}&spread_month=${monthData}`
    );
    setTableData(responseTable.data.data);
    setLoading(false)
  };

  useEffect(() => {
    fetchTableData();
  }, [percentage, month]);

  const handleChange = () =>{
    fetchTableData();
  }
  const column = [
    {
      title: 'Spread_Names',
      dataIndex: 'Spread_Name',
      key: 'spread_name',
      className: 'font-semibold',
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      key: 'year',
      className: 'text-gray-600',
    },
    {
      title: 'Profit_Trades(%)',
      dataIndex: 'Profit_Trades(%)',
      key: 'profit_trades(%)',
      className: 'text-gray-600',
    },
  ];

  return (
    <Layout>
      <h2 className="text-center">TDesk AFS Profitible Trades(LOT)</h2>
      <Form name="explainability" form={form} layout="inline">
        <Form.Item label="Select Percentage:" name="precentage" >
          <Select onChange={() => handleChange()}>
            {percentage.map((data: LabelValue) => {
              return (
                <Option key={data.value} value={data.value}>
                  {data.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Select Month:" name="month">
          <Select onChange={() => handleChange()}>
            {month.map((data: LabelValue) => {
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
        loading={isLoading}
        style={{ width: '500' }}
        columns={column}
        dataSource={tableData[0]}
        pagination={false}
        scroll={{ y: 400 }}
        rowKey="spread_name"
        size="middle"
      />
    </Layout>
  );
};

export default withAuthentication(ProfitibleTrades);
