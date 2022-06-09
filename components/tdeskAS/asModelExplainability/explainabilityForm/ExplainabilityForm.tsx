import { Form, FormInstance, Select } from 'antd';
import React, { FC } from 'react';
import { LabelValue } from '../../../../type/common';

interface Props {
  form: FormInstance;
  handleChange: () => void;
  handleSpreadAndSortChange: () => void;
  spreadTypes: LabelValue[];
  spread: LabelValue[];
  sortBy: LabelValue[];
}
const ExplainabilityForm: FC<Props> = ({
  form,
  handleChange,
  handleSpreadAndSortChange,
  spreadTypes,
  spread,
  sortBy
}) => {
  const { Option } = Select;

  return (
    <Form name="explainability" form={form} layout="inline">
      <Form.Item label="Select Spread Type:" name="spreadType" className="w-64">
        <Select onChange={() => handleChange()}>
          {spreadTypes.map((data: LabelValue) => {
            return (
              <Option key={data.value} value={data.value}>
                {data.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Select Spread:" name="spread" className="w-80">
        <Select onChange={() => handleSpreadAndSortChange()}>
          {spread.map((data: LabelValue) => {
            return (
              <Option key={data.value} value={data.value}>
                {data.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Sort By:" name="sortBy" className="w-48">
        <Select onChange={() => handleSpreadAndSortChange()}>
          {sortBy.map((data: LabelValue) => {
            return (
              <Option key={data.value} value={data.value}>
                {data.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default ExplainabilityForm;
