import { Form, FormInstance, Select, Row, Col } from 'antd';
import React, { FC } from 'react';

interface Props {
  handleChange: () => void;
  yVariable: any[];
  lookahead: any[];
  form: FormInstance;
}

const BacktestForm: FC<Props> = ({
  handleChange,
  yVariable,
  lookahead,
  form,
}) => {
  const { Option } = Select;
  return (
    <Form name="backtest" form={form} layout="inline">
      <Form.Item label="Y Variable" name="yvariable" className="w-96">
        <Select onChange={() => handleChange()}>
          {yVariable.map((variableData) => {
            return (
              <Option key={variableData.value} value={variableData.value}>
                {variableData.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Lookahead 1" name="lookahead">
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

export default BacktestForm;
