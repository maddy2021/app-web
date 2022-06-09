import { Button, Form, Input, Select, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import PlotlyPlot from '../../components/common/PlotlyPlot/PlotlyPlot';
import Layout from '../../components/Layout/Layout';
import withAuthAndPermission from '../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import {
  WHAT_IF_INPUT_FEATURE_AND_CHART,
  WHAT_IF_Y_VARIABLE,
} from '../../url/pdesk';
import { get, post } from '../../util/servercall';

const WhatIf = () => {
  const [form] = Form.useForm();
  const [depform] = Form.useForm();
  const [yVariable, setyVariable] = useState<any[]>([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [actualFeature, setActualFeature] = useState<any>([]);
  const [lastRowData, setLastRowData] = useState<any>({});
  const [enteredPercentages, setEnteredPercentages] = useState<[]>([]);

  const PREFIX = 'Percentage_';

  const { Option } = Select;
  useEffect(() => {
    const fetchData = async () => {
      const Yvariable = await get(WHAT_IF_Y_VARIABLE);
      setyVariable(Yvariable.data);
      form.setFieldsValue({
        yvariable: Yvariable.data[1].value,
      });
      getAllData();
    };
    fetchData();
  }, []);

  const getAllData = async () => {
    const getYvariable = form.getFieldValue('yvariable');
    const getInputFeatures = await get(
      WHAT_IF_INPUT_FEATURE_AND_CHART + `${getYvariable}/input_features`
    );
    const responseData = getInputFeatures.data;
    console.log(Object.keys(responseData));
    setActualFeature(Object.keys(responseData));
    const formData: any = {};
    for (let [key, value] of Object.entries(responseData)) {
      formData[key] = value;
      formData[PREFIX + key] = 0;
    }
    console.log(formData);
    setLastRowData(formData);
    depform.setFieldsValue(formData);
  };

  const handleChange = () => {
    setChartData([]);
    setSubmit(false)
    getAllData();
  };
  console.log(lastRowData);

  let chartPlotData: any[] = [];

  chartPlotData = chartData.map((data: any) => {
    return {
      x: data.x,
      y: data.y,
      type: 'scatter',
      name: data.name,
    };
  });

  const onFinish = async (values: any) => {
    console.log(values);
    const enteredValues: any = [];
    setLoading(true);
    setSubmit(true);
    const data: any = {};
    for (let key of actualFeature) {
      const perValue = parseInt(values[PREFIX + key]);
      if (perValue != 0) {
        enteredValues.push({ key, value: perValue });
      }
      data[key] = perValue;
    }

    const getYvariable = form.getFieldValue('yvariable');
    const chartData = await post(
      WHAT_IF_INPUT_FEATURE_AND_CHART + `${getYvariable}/chart/`,
      data
    );
    setEnteredPercentages(enteredValues);
    setChartData(chartData.data.data);
    setLoading(false);
  };

  // const displayData = enteredValues.map((finalData:any)=>{
  // return finalData
  // })
  // console.log(displayData)
  return (
    <Layout>
      <Form name="whatif" form={form}>
        <Form.Item label="Y Variable" name="yvariable">
          <Select onChange={() => handleChange()}>
            {yVariable.map((yVariableData) => {
              return (
                <Option key={yVariableData.value} value={yVariableData.value}>
                  {yVariableData.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>

      <Form name="depdata" form={depform} onFinish={onFinish} layout="inline" className='what-if-form'>
        {actualFeature.map((key: string) => {
          return (
            <Form.Item label={key} key={key} className="mt-4" >
              <Form.Item name={PREFIX + key} rules={[{ required: true }]}>
                <Input
                  type="number"
                  addonAfter="%"
                  addonBefore={lastRowData[key]}
                />
              </Form.Item>
            </Form.Item>
          );
        })}
        <div className='w-full mt-6'></div>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form>

      <div className='mt-3'>
        {
          isSubmit && !isLoading ?
          enteredPercentages.map((data: { key: string; value: string }) => {
            return (
              <h3>
                {' '}
                {+data.value > 0  ? "+" + data.value : data.value}% {data.key}
              </h3>
            );
          })
          :
          null
        }
      </div>
      {isSubmit && (
        <PlotlyPlot
          loading={isLoading}
          data={chartPlotData}
          layout={{
            title: {
              text: 'What if simulation',
              font: {
                size: 20,
              },
            },
            yaxis: {
              title: 'Price',
            },
            height: 500,
          }}
          config={{
            responsive: true,
          }}
        />
      )}
    </Layout>
  );
};
export default withAuthAndPermission(WhatIf, Modules.WHAT_IF, Permissions.VIEW);
