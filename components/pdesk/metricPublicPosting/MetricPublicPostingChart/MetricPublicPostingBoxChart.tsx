import { Form } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { MONTH_IN_PREDICTION_ABSOLUTE_DELTA_CHART, PUBLIC_POSTING_MONTH_YEAR_IMPACT } from '../../../../url/pdesk';
import { get } from '../../../../util/servercall';
import MetricPublicPostingBoxForm from '../MetricPublicPostingForm/MetricPublicPostingBoxForm';
import AbsoluteDeltaChart from '../PlotlyPlot/AbsoluteDeltaChart';

interface Props {
    yVariable : any;    
}

const MetricPublicPostingBoxChart:FC<Props> = ({yVariable}) => {
  const [form] = Form.useForm();
  const [dcMonth, setDCMonth] = useState([]);
  const [dcYear, setDCYear] = useState([]);
  const [startDate, setStartDate] = useState();
  const [lastUpdateDate, setLastUpdateDate] = useState();
  const [absoluteDeltaGraph, setAbsoluteDeltaGraph] = useState<any[]>([]);
  const [isLoading , setLoading] = useState(false)

  useEffect(() => {
    const selectedYVariable = yVariable.length > 0?  yVariable[0].value: null;
    if (!selectedYVariable) return
    form.setFieldsValue({
      yvariable: selectedYVariable,
    });
    fetchDependentData();
  }, [yVariable]);

  const fetchChartdata = async () => {
    setLoading(true)
    const yVariableValue = form.getFieldValue('yvariable');
    const monthValue = form.getFieldValue('month');
    const yearValue = form.getFieldValue('year');

    const absolute_delta_graph = await get(
      MONTH_IN_PREDICTION_ABSOLUTE_DELTA_CHART + `?label=${yVariableValue}&month=${monthValue}&year=${yearValue}`
    );
    setStartDate(absolute_delta_graph.data.start_date);
    setLastUpdateDate(absolute_delta_graph.data.last_updated_date);
    setAbsoluteDeltaGraph(absolute_delta_graph.data.data);
    setLoading(false)
  };

  const fetchDependentData = async () => {
    const YvariableData = form.getFieldValue('yvariable');
    if (YvariableData == undefined) return;
    const depValues = await get(
      PUBLIC_POSTING_MONTH_YEAR_IMPACT + `?label=${YvariableData}`
    );

    setDCMonth(depValues.data.months);
    setDCYear(depValues.data.years);

    const indexMonth = depValues.data.months.length > 0 ? depValues.data.months[0].value : null ;
    const indexYear = depValues.data.years.length > 0 ? depValues.data.years[0].value : null;

    form.setFieldsValue({
      month: indexMonth,
      year: indexYear,
    });
    fetchChartdata();
  };

  const handleChangeDCYVariable = () => {
    form.setFieldsValue({
      month: '',
      year: '',
    });
    fetchDependentData();
  };

  const handleDropDownChange = () => {
    fetchChartdata();
  };

  let publicPostingBoxPlot = [];
  publicPostingBoxPlot = absoluteDeltaGraph.map((data) => {
    return {
      y: data.y,
      type: 'box',

    };
  });

  const titleLabelArr = yVariable.filter(
    (d:any) => d.value == form.getFieldValue('yvariable')
  );
  const titleLabel = titleLabelArr.length > 0 ? titleLabelArr[0].label : '';

  return (
    <>
      <MetricPublicPostingBoxForm
        handleChangeDCYVariable={handleChangeDCYVariable}
        yVariable={yVariable}
        handleDropDownChange={handleDropDownChange}
        dcMonth={dcMonth}
        dcYear={dcYear}
        form={form}
      />
      <h1 className="text-center">
        <b>
          Public Posting for {titleLabel} started on {startDate}, latest updated
          on {lastUpdateDate}
        </b>
      </h1>

      <AbsoluteDeltaChart
        loading={isLoading}
        publicPostingBoxPlot={publicPostingBoxPlot}
        titleLabel={titleLabel}
      />
    </>
  );
};

export default MetricPublicPostingBoxChart;
