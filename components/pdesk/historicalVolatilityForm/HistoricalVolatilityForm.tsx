import { Form, FormInstance, PageHeader, Select } from 'antd';
import React, { FC } from 'react';

interface Props {
  handleChange: () => void;
  yvariable: any[];
  operations: any[];
  lastUpdate: any;
  form: FormInstance;
}

const HistoricalVolatilityForm: FC<Props> = ({
  handleChange,
  yvariable,
  operations,
  lastUpdate,
  form,
}) => {
  const { Option } = Select;
  return (
    <>
    <PageHeader className="font-bold text-lg">Last updated on :- {lastUpdate}</PageHeader>

    <h1 className="text-center text-xl">EdibleOil Historical Volatility</h1>

    <Form name="volatility" form={form} layout="inline">
      <Form.Item label="Choose Parameter" name="parameter" className="w-96" >
        <Select onChange={() => handleChange()}>
          {yvariable.map((variableData) => {
            return (
              <Option key={variableData.value} value={variableData.value}>
                {variableData.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Options" name="optionVal" className="w-48">
        <Select onChange={() => handleChange()}>
          {operations.map((operationsData) => {
            return (
              <Option key={operationsData.value} value={operationsData.value}>
                {operationsData.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
    </>
  );
};

export default HistoricalVolatilityForm;
