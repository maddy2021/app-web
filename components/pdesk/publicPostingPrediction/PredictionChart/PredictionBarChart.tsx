import { Form } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import { MONTH_FOR_PREDICTION_D_C_CHART, PUBLIC_POSTING_MONTH_YEAR_IMPACT } from '../../../../url/pdesk';
import { get } from '../../../../util/servercall';
import DirectionalCorrectnessChart from '../PlotlyPlot/DirectionalCorrectnessChart'
import MetricPredictionBarChartForm from '../PredictionForm/PredictionBarChartForm'

interface Props {
  yVariable : any;    
}

const PredictionBarChart:FC<Props> = ({yVariable}) => {
  const [dcForm] = Form.useForm();
  const [dcMonth, setDCMonth] = useState([]);
  const [dcYear, setDCYear] = useState([]);
  const [startDate, setStartDate] = useState();
  const [lastUpdateDate, setLastUpdateDate] = useState();
  const [dcHighImpact, setDCHighImpact] = useState([]);
  const [directionalCorrectnessGraph, setDirectionalCorrectnessGraph] =
    useState<any[]>([]);
  const [isLoading , setLoading] = useState(false)


  useEffect(() => {
  const fetchData = async () => {
    const selectedYVariable = yVariable.length > 0?  yVariable[0].value: null;
      dcForm.setFieldsValue({
        yvariable: selectedYVariable,
      });
      fetchDependentData();
    };
    fetchData();
  }, [yVariable]);

  const fetchChartData = async () => {
    setLoading(true)
    const YvariableValue = dcForm.getFieldValue('yvariable');
    const yearValue = dcForm.getFieldValue('year');
    const highimpectValue = dcForm.getFieldValue('highImpact');
    const monthValue = dcForm.getFieldValue('month');

    const directional_correctness_graph = await get(
      MONTH_FOR_PREDICTION_D_C_CHART +
        `?label=${YvariableValue}&high_impact_case=${highimpectValue}&month=${monthValue}&year=${yearValue}`
    );
    setStartDate(directional_correctness_graph.data.start_date);
    setLastUpdateDate(directional_correctness_graph.data.last_updated_date);
    setDirectionalCorrectnessGraph(directional_correctness_graph.data.data);
    setLoading(false)
  };

  const fetchDependentData = async () => {
    const YvariableData = dcForm.getFieldValue('yvariable');
    if (YvariableData == undefined) return;

    const depValues = await get(
      PUBLIC_POSTING_MONTH_YEAR_IMPACT + `?label=${YvariableData}`
    );

    setDCMonth(depValues.data.months);
    setDCYear(depValues.data.years);
    setDCHighImpact(depValues.data.high_impact_cases);

    const indexMonth = depValues.data.months.length > 0 ? depValues.data.months[0].value: null;    
    const indexYear = depValues.data.years.length > 0 ? depValues.data.years[0].value : null;
    const indexHighImpact = depValues.data.high_impact_cases.length > 0 ? depValues.data.high_impact_cases[0].value : null;

    dcForm.setFieldsValue({
      month: indexMonth,
      year: indexYear,
      highImpact: indexHighImpact,
    });

    fetchChartData();
  };

  const handleDropDownChange = () => {
    fetchChartData();
  };

  const handleChangeDCYVariable = () => {
    dcForm.setFieldsValue({ month: '', year: '', highImpact: '' });
    fetchDependentData();
  };

  let chartPlotData = [];
  chartPlotData = directionalCorrectnessGraph.map((data)=>{
    return {
      x: data.x,
      y: data.y,
      type: 'bar',
      text: data.samples,
      hovertemplate:
        `lookahead_days=%{x}<br>` +
        'directional_correctness=%{y}<br>' +
        'number_of_samples=%{text} <extra></extra>',
    }
  })
  
  const titleLabelArr = yVariable.filter(
    (d:any) => d.value == dcForm.getFieldValue('yvariable')
  );
  const titleLabel = titleLabelArr.length > 0 ? titleLabelArr[0].label : '';
  const highimpectData = dcForm.getFieldValue('highImpact');

  return (
    <>
    <MetricPredictionBarChartForm
        handleChangeDCYVariable={handleChangeDCYVariable}
        yVariable={yVariable}
        handleDropDownChange={handleDropDownChange}
        dcHighImpact={dcHighImpact}
        dcMonth={dcMonth}
        dcYear={dcYear}
        form={dcForm}
      />
      <h1 className="text-center mt-6">
      <b>
          Public Posting for {titleLabel} started on {startDate}, latest updated
          on {lastUpdateDate}
        </b>
      </h1>
      
      <DirectionalCorrectnessChart loading={isLoading} chartPlotData={chartPlotData} highimpectData={highimpectData} titleLabel={titleLabel}/> 

    </>
  )
}

export default PredictionBarChart