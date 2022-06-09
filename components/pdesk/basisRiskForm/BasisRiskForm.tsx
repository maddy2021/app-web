import { Form, FormInstance, PageHeader, Select } from 'antd';
import React, { FC } from 'react';

interface Props {
  lastUpdate: any;
  handleChange: () => void;
  yVariable: any[];
  form: FormInstance;
}

const BasisRiskForm: FC<Props> = ({
  lastUpdate,
  handleChange,
  yVariable,
  form,
}) => {
  const { Option } = Select;

  return (
    <>
    <PageHeader className="font-bold text-lg">Last updated on :- {lastUpdate}</PageHeader>
      
    <h1 className="text-center text-xl">India BasisRisk</h1>
    
    <Form name="basisrisk" form={form}>
      <Form.Item label="Select Parameter" name="yvariable">
        <Select
          onChange={() => {
            handleChange();
          }}
        >
          {yVariable.map((yariabledata) => {
            return (
              <Option key={yariabledata.value} value={yariabledata.value}>
                {yariabledata.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
   </>       
  );
};

export default BasisRiskForm;
