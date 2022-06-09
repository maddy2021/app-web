import { Form, PageHeader, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { get } from '../../util/servercall';
import columns from '../../components/tdeskAS/tdeskASTable/tdeskColumns';
import withAuthentication from '../../HOC/WithSuperAdmin/WithSuperAdmin';
import { TDESK_DAILY_PREDICTION_PREDICTED_DATE, TDESK_DAILY_PREDICTION_TABLE, TDESK_DAILY_PREDICTION_Y_VARIABLE } from '../../url/pdesk';

const TdeskNonIndia = () => {
  const [yVariable, setYVariable] = useState<any[]>([]);
  const [predictedDate, setPredictedDate] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [lastUpdateDate, setLastUpdateDate] = useState<any[]>([]);
  const [isLoading , setLoading] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    const fetchData = async () => {
      const responseYVariable = await get(
        TDESK_DAILY_PREDICTION_Y_VARIABLE
      );
      setYVariable(responseYVariable.data);
      const responseDate = await get(
        TDESK_DAILY_PREDICTION_PREDICTED_DATE
      );
      setPredictedDate(responseDate.data);
      form.setFieldsValue({
        date: responseDate.data[0].value,
        yvariable: responseYVariable.data[0].value,
      });
    };
    fetchData();
  }, []);

  const fetchTableData = async () => {
    setLoading(true)
    const yVariableData = form.getFieldValue('yvariable');
    const predictedDate = form.getFieldValue('date');
    if (yVariableData == undefined || predictedDate == undefined) {
      return;
    }
    const responseTable = await get(
      TDESK_DAILY_PREDICTION_TABLE + `?label=${yVariableData}&predicted_date=${predictedDate}`
    );
    console.log(responseTable)
    setLastUpdateDate(responseTable.data.last_updated_date);
    setTableData(responseTable.data.data);
    setLoading(false)
  };

  useEffect(() => {
    fetchTableData();
  }, [yVariable, predictedDate, form]);

  const handleChange = () => {
    fetchTableData();
  };

  const tdesk_daily_pred = tableData.map((data) => {
    return data.tdesk_daily_pred;
  });

  return (
    <Layout>
      <PageHeader className="font-bold text-lg">Last updated on :-{lastUpdateDate}</PageHeader>
      <h1 className='text-center text-lg'>TDesk AFS Non-India (LOT)</h1>
      
      <Form name="backtest" form={form} layout="inline">
        <Form.Item label="Select Predicted Date:" name="date" className="w-64">
          <Select onChange={() => handleChange()}>
            {predictedDate.map((date) => {
              return (
                <Option key={date.value} value={date.value}>
                  {date.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Y Variable" name="yvariable" className="w-96">
          <Select onChange={() => handleChange()}>
            {yVariable.map((Yvariabledata) => {
              return (
                <Option key={Yvariabledata.value} value={Yvariabledata.value}>
                  {Yvariabledata.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>

      <Table
        loading={isLoading}
        columns={columns}
        scroll={{ x: 400 }}
        pagination={false}
        dataSource={tdesk_daily_pred[0]}
        rowKey="spread_name_continuous"
        size="middle"
        className="mt-6"
      />
    </Layout>
  );
};

export default withAuthentication(TdeskNonIndia);
