import { Form, FormInstance, Select } from 'antd';
import React, { FC } from 'react';

interface Props {
    handleChange : () => void;
    feature : any[];
    lookahead : any[];
    form: FormInstance
}

const FeatureForImportanceForm:FC<Props> = ({ handleChange ,feature ,lookahead , form}) => {
  const { Option } = Select;
  return (
    <>
    <h1 className="text-center text-xl">Feature Importance</h1>

    <Form name="featureImportance" form={form} layout="inline">
      <Form.Item label="Select Feature :" name="featureField2" className="w-96">
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

      <Form.Item label="Select lookahed days :" name="lookahead2" >
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
    </>
  );
};

export default FeatureForImportanceForm;
