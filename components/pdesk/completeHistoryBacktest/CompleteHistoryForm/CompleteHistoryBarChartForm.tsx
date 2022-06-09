import { Form, Select , FormInstance } from 'antd';
import React, { FC } from 'react';

interface Props {
    handleChange : () => void;
    yVariable : any[];
    percentage : any[];
    form : FormInstance
}

const CompleteHistoryBacktestBarChartForm:FC<Props> = ({ handleChange , yVariable , percentage , form}) => {
  const { Option } = Select;

  return (
    <>
      <h1 className="text-center text-xl">
        Edible Oil PDesk Model Directional Correctness Yearwise Backtest
      </h1>
      <br/>
      <Form name="directionalCorrectness" form={form} layout="inline">
        <Form.Item label="Y Variable" name="yvariable" className="w-96">
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

        <Form.Item label="Choose High impact cases" name="fpercentage">
          <Select onChange={() => handleChange()}>
            {percentage.map((percentageData) => {
              return (
                <Option key={percentageData.value} value={percentageData.value}>
                  {percentageData.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};

export default CompleteHistoryBacktestBarChartForm;
