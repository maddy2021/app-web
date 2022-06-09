import { Form, FormInstance, Select } from 'antd';
import React, { FC } from 'react';

interface Props {
  handleChange: () => void;
  yVariable: any[];
  lookahead: any[];
  form: FormInstance;
}

const FeatureImportantAdminForm: FC<Props> = ({
  handleChange,
  yVariable,
  lookahead,
  form,
}) => {
  const { Option } = Select;
  return (
    <Form name="featureImportance" form={form} layout="inline">
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

      <Form.Item label="Lookahead Days" name="lookahead2">
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

export default FeatureImportantAdminForm;
