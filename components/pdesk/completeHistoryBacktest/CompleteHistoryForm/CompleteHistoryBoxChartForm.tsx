import { Form, FormInstance, Select } from 'antd';
import React, { FC } from 'react';

interface Props {
  handleChange: () => void;
  yVariable: any[];
  form: FormInstance;
}

const CompleteHistoryBacktestBoxChartForm: FC<Props> = ({
  handleChange,
  yVariable,
  form,
}) => {
  const { Option } = Select;

  return (
    <>
    <h1 className="text-center text-xl">
       Edible Oil PDesk Model Absolute Delta Yearwise Backtest
    </h1>
    <Form name="absoluteDelta" form={form}>
      <Form.Item label="Y Variable" name="yvariable2" className="w-96">
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
    </>
  );
};

export default CompleteHistoryBacktestBoxChartForm;
