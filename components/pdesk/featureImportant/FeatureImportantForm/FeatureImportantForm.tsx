import { Form, FormInstance, Select } from 'antd';
import React, { FC } from 'react';

interface Props {
  handleChange: () => void;
  yVariable: any[];
  lookahead: any[];
  form: FormInstance
}

const FeatureImportantForm:FC<Props> = ({ handleChange , yVariable , lookahead , form}) => {
  const { Option } = Select;

  return (
    <Form name="feature" form={form} layout="inline">
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

      <Form.Item label="Lookahead Days" name="lookahead">
        <Select onChange={() => handleChange()}>
          {lookahead.map((lookaheadData) => {
            return (
              <Option key={lookaheadData.value} value={lookaheadData.value}>
                {lookaheadData.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default FeatureImportantForm;
