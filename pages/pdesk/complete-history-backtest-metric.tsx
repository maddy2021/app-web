import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import CompleteHistoryBacktestBarChartForm from '../../components/pdesk/completeHistoryBacktest/CompleteHistoryForm/CompleteHistoryBarChartForm';
import CompleteHistoryBacktestBoxChartForm from '../../components/pdesk/completeHistoryBacktest/CompleteHistoryForm/CompleteHistoryBoxChartForm';
import AbsoluteDeltaChart from '../../components/pdesk/completeHistoryBacktest/PlotlyPlot/AbsoluteDeltaChart';
import DirectionalCorrectnessChart from '../../components/pdesk/completeHistoryBacktest/PlotlyPlot/DirectionalCorrectnessChart';
import withAuthAndPermission from '../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import {
  BACKTEST_Y_VARIABLE,
  COMPLETE_HISTORY_ABSOLUTE_CHART,
  COMPLETE_HISTORY_CORRECTNESS_CHART,
  COMPLETE_HISTORY_PERCENTAGE,
} from '../../url/pdesk';
import { get } from '../../util/servercall';

const CompleteHistoryBacktestMetric = () => {
  const [yVariable, setYvariable] = useState<any[]>([]);
  const [percentage, setPercentage] = useState([]);
  const [chartData, setChartData] = useState<any>([]);
  const [chartData2, setChartData2] = useState<any>([]);
  const [isLoading , setLoading] = useState(false)
  const [isLoadingSecondChart , setLoadingSecondchart] = useState(false)
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const yvariable = await get(BACKTEST_Y_VARIABLE);
      setYvariable(yvariable.data);
      const getPercentage = await get(COMPLETE_HISTORY_PERCENTAGE);
      setPercentage(getPercentage.data);
      form.setFieldsValue({
        fpercentage: getPercentage.data[0].value,
        yvariable: yvariable.data[0].value,
        yvariable2: yvariable.data[0].value,
      });
    };
    fetchData();
  }, []);

  const fetchChartData = async () => {
    setLoading(true)
    const yVariableField = form.getFieldValue('yvariable');
    const percentageField = form.getFieldValue('fpercentage');
    if (yVariableField == undefined || percentageField == undefined) {
      return;
    }
    const responseChart = await get(
      COMPLETE_HISTORY_CORRECTNESS_CHART +
        `?label=${yVariableField}&high_impact_percentages=${percentageField}`
    );
    setLoading(false)
    setLoadingSecondchart(true)
    setChartData(responseChart.data.data);
    const yVariableField2 = form.getFieldValue('yvariable2');
    if (yVariableField2 == undefined) {
      return;
    }
    const responseChart2 = await get(
      COMPLETE_HISTORY_ABSOLUTE_CHART + `?label=${yVariableField2}`
    );
    setChartData2(responseChart2.data.data);
    setLoadingSecondchart(false)
  };

  useEffect(() => {
    fetchChartData();
  }, [yVariable, percentage]);

  const handleChange = () => {
    fetchChartData();
  };

  let chartPlotData: any[] = [];

  chartPlotData = chartData.map((data: any) => {
    return {
      x: data.x,
      y: data.y,
      text: data.samples,
      hovertemplate:
        `lookahead_days=${data.lookahead_days[0]}` +
        '<br>year=%{x}' +
        '<br>per_correctness=%{y}' +
        `<br>number_of_samples=%{text} <extra></extra>`,
      type: 'bar',
      name: data.lookahead_days[0],
    };
  });

  let absoluteDeltaBoxChart: any[] = [];
  absoluteDeltaBoxChart = chartData2.map((data: any) => {
    return {
      x: data.x,
      y: data.y,
      hovertemplate:
        `lookahead_days=${data.name}` +
        '<br>year=%{x}' +
        '<br>abs_delta=%{y} <extra></extra>',
      type: 'box',
      boxpoints: 'Outliers',
      name: data.name, 
    };
  });

  const titleLabelArr = yVariable.filter(
    (d) => d.value == form.getFieldValue('yvariable')
  );
  const titleLabel = titleLabelArr.length > 0 ? titleLabelArr[0].label : '';

  const titleLabelArr2 = yVariable.filter(
    (d) => d.value == form.getFieldValue('yvariable2')
  );
  const titleLabel2 = titleLabelArr2.length > 0 ? titleLabelArr2[0].label : '';

  return (
    <Layout>
      <CompleteHistoryBacktestBarChartForm 
        handleChange={handleChange}
        yVariable={yVariable}
        percentage={percentage}
        form={form}
      />
      <DirectionalCorrectnessChart loading={isLoading} chartPlotData={chartPlotData} titleLabel={titleLabel}/>
      
      <CompleteHistoryBacktestBoxChartForm
        handleChange={handleChange}
        yVariable={yVariable}
        form={form}
      />
      <AbsoluteDeltaChart loadingSecondChart={isLoadingSecondChart} absoluteDeltaBoxChart={absoluteDeltaBoxChart} titleLabel2={titleLabel2}/>
    </Layout>
  );
};

export default withAuthAndPermission(
  CompleteHistoryBacktestMetric,
  Modules.COMPLETE_HISTORY_BACKTEST_METRIC,
  Permissions.VIEW
);
