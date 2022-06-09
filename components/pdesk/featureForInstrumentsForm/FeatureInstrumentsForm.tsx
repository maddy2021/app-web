import { Form, FormInstance, Select } from 'antd';
import React, { FC } from 'react';

interface Props {
  handleChange: () => void;
  feature: any[];
  activeMonth: any[];
  form: FormInstance;
}

const FeatureInstrumentsForm: FC<Props> = ({
  handleChange,
  feature,
  activeMonth,
  form,
}) => {
  const { Option } = Select;
  return (
    <>
      <h1 className="text-center text-xl">Features for Instruments</h1>
      <Form name="feature" form={form} layout="inline">
        <Form.Item label="Select Feature :" name="featureField" className="w-96">
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

        <Form.Item label="Select active month soyoil :" name="activeMonth">
          <Select onChange={() => handleChange()}>
            {activeMonth.map((activeData) => {
              return (
                <Option key={activeData.value} value={activeData.value}>
                  {activeData.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};

export default FeatureInstrumentsForm;
