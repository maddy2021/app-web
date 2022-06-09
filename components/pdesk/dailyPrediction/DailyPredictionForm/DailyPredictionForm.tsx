import { Form, FormInstance, PageHeader, Select } from 'antd';
import React, { FC } from 'react';

interface Props {
  handleChange: () => void;
  lastUpdate: any;
  dateRange: any[];
  feature: any[];
  currency: any[];
  form: FormInstance;
}

const DailyPredictionForm: FC<Props> = ({
  handleChange,
  lastUpdate,
  dateRange,
  feature,
  currency,
  form,
}) => {
  const { Option } = Select;
  return (
    <>
    <PageHeader className="font-bold text-lg">Last updated on :- {lastUpdate}</PageHeader>
    <Form name="feature" form={form} layout="inline">
      <Form.Item label="Date" name="date">
        <Select onChange={() => handleChange()}>
          {dateRange.map((dateData) => {
            return (
              <Option key={dateData.value} value={dateData.value}>
                {dateData.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Select Feature:" name="featureField" className="w-96">
        <Select onChange={() => handleChange()}>
          {feature.map((featureData) => {
            return (
              <Option key={featureData.value} value={featureData.value}>
                {featureData.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Select Currency:" name="currencyField">
        <Select onChange={() => handleChange()}>
          {currency.map((currencyData) => {
            return (
              <Option key={currencyData.value} value={currencyData.value}>
                {currencyData.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
    </>
  );
};

export default DailyPredictionForm;
