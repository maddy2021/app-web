import { Form, PageHeader } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import BacktestForm from '../../components/pdesk/backtestForm/BacktestForm';
import PlotlyPlot from '../../components/common/PlotlyPlot/PlotlyPlot';
import withAuthAndPermission from '../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import {
  BACKTEST_CHART,
  BACKTEST_LOOKAHEAD,
  BACKTEST_Y_VARIABLE,
} from '../../url/pdesk';
import { get } from '../../util/servercall';

const Backtest = () => {
  const [form] = Form.useForm();
  const [yVariable, setYVariable] = useState<any[]>([]);
  const [lookahead, setLookahead] = useState([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const responseYVariable = await get(BACKTEST_Y_VARIABLE);
      setYVariable(responseYVariable.data);
      const responseLookahead = await get(BACKTEST_LOOKAHEAD);
      setLookahead(responseLookahead.data);
      form.setFieldsValue({
        yvariable: responseYVariable.data[0].value,
        lookahead: responseLookahead.data[0].value,
      });
    };
    fetchData();
  }, []);

  const fetchChartData = async () => {
    setLoading(true);
    const yVariableData = form.getFieldValue('yvariable');
    const lookAheadData = form.getFieldValue('lookahead');
    if (yVariableData == undefined || lookAheadData == undefined) {
      return;
    }
    const responseChart = await get(
      BACKTEST_CHART + `?label=${yVariableData}&lookahead=${lookAheadData}`
    );
    setChartData(responseChart.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchChartData();
  }, [lookahead, yVariable, form]);

  const handleChange = () => {
    fetchChartData();
  };

  const yVariableData = form.getFieldValue('yvariable');
  const lookAheadData = form.getFieldValue('lookahead');

  const labelNameArr = yVariable.filter((b) => b.value == yVariableData);
  const labelName = labelNameArr.length > 0 ? labelNameArr[0].label : '';
  let chartPlotData: any[] = [];

  chartPlotData = chartData.map((data) => {
    return {
      x: data.x,
      y: data.y,
      hovertemplate:
        `variable=${data.name}` +
        '<br>Date=%{x}' +
        '<br>value=%{y} <extra></extra>',
      type: 'scatter',
      name: data.name,
    };
  });

  return (
    <Layout>
      <h1 className="text-center text-xl">
        Edible Oil PDesk ModelBuilding
      </h1>
      <div className="py-3">
        <BacktestForm
          handleChange={handleChange}
          lookahead={lookahead}
          yVariable={yVariable}
          form={form}
        />
      </div>
      <div className="py-5">
        <PlotlyPlot
          loading={isLoading}
          data={chartPlotData}
          layout={{
            yaxis: {
              title: 'Price($/MT)',
            },
            xaxis: {
              title: 'Date',
            },
            title: {
              text: `Historical Backtest of ${labelName} [${lookAheadData} day lookahead]`,
              font: {
                size: 20,
              },
            },
            legend: {
              title: {
                text: 'variable',
              },
              x: 0.5,
              y: 1.15,
              orientation: 'h',
              xanchor: 'center',
            },
          }}
          config={{
            responsive: true,
          }}
        />
      </div>
    </Layout>
  );
};

export default withAuthAndPermission(
  Backtest,
  Modules.BACKTEST,
  Permissions.VIEW
);
