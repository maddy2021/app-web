import { Form, FormInstance, PageHeader, Select } from 'antd';
import React, { FC } from 'react'

interface Props {
    handleChangeDCYVariable: () => void;
    yVariable: any[];
    handleDropDownChange: () => void;
    dcMonth: any[];
    dcYear: any[];
    dcHighImpact: any[];
    form: FormInstance;
}

const MetricPublicPostingForm : FC<Props> = ({
    handleChangeDCYVariable,
    yVariable,
    handleDropDownChange,
    dcHighImpact,
    dcMonth,
    dcYear,
    form,
  }) => {
    const { Option } = Select;
  return (
    <>
    <PageHeader className="text-center font-bold text-lg">Directional Correctness based on Public Posting</PageHeader>
    <Form name="metricPosting" form={form} layout="inline">
        <Form.Item label="Y Variable" name="yvariable" className="w-96">
          <Select onChange={() => handleChangeDCYVariable()}>
            {yVariable.map((variableData) => {
              return (
                <Option key={variableData.value} value={variableData.value}>
                  {variableData.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Month in which prediction was made" name="month" >
          <Select onChange={() => handleDropDownChange()}>
            {dcMonth.map((MonthData) => {
              return (
                <Option key={MonthData.value} value={MonthData.value}>
                  {MonthData.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Choose Year of posting" name="year">
          <Select onChange={() => handleDropDownChange()}>
            {dcYear.map((yearData) => {
              return (
                <Option key={yearData.value} value={yearData.value}>
                  {yearData.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Choose High impact cases" name="highImpact">
          <Select onChange={() => handleDropDownChange()}>
            {dcHighImpact.map((depValuesData) => {
              return (
                <Option key={depValuesData.value} value={depValuesData.value}>
                  {depValuesData.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
      </>
  )
}

export default MetricPublicPostingForm