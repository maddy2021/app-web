import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import HistoricalVolatilityForm from '../../components/pdesk/historicalVolatilityForm/HistoricalVolatilityForm';
import PlotlyPlot from '../../components/common/PlotlyPlot/PlotlyPlot';
import withAuthAndPermission from '../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import { HISTORICAL_VOLATILITY_CHART, HISTORICAL_VOLATILITY_OPERATION, HISTORICAL_VOLATILITY_Y_VARIABLE } from '../../url/pdesk';
import { get } from '../../util/servercall';

const HistoricalVolatility = () => {
  const [form] = Form.useForm();

  const [yvariable, setYvariable] = useState<any[]>([]);
  const [operations, setOperations] = useState([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState();
  const [isLoading , setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const responseParameter = await get(HISTORICAL_VOLATILITY_Y_VARIABLE);
      setYvariable(responseParameter.data);
      const responseOption = await get(HISTORICAL_VOLATILITY_OPERATION);
      setOperations(responseOption.data);
      form.setFieldsValue({ parameter: responseParameter.data[0].value , optionVal: responseOption.data[0].value });
    };
    fetchData();
  }, []);
  
  const fetchChartData = async () => {
    setLoading(true)
    const yVariableData = form.getFieldValue('parameter');
    const operationsData = form.getFieldValue('optionVal');
    
    if (yVariableData == undefined || operationsData == undefined) {
      return;
    }

    const responseChart = await get(
      HISTORICAL_VOLATILITY_CHART +`?label=${yVariableData}&operation=${operationsData}`
      );
      setLastUpdate(responseChart.data.last_updated_date);
      setChartData(responseChart.data.data);
      setLoading(false)
    };

  useEffect(() => {
    fetchChartData();
  }, [yvariable, operations]);

  const handleChange = () => {
    fetchChartData();
  };

  let chartPlotData: any[] = [];
  const optionVal = form.getFieldValue('optionVal');

    chartPlotData = chartData.map((data) => {
      return {
        x: data.x,
        y: data.y,
        hovertemplate:`Year=${data.year}<br>`+ 'Timeframe(Days)=%{x}<br>'+`Volitilyty(Perc_Change%) - ${optionVal}=%{y} <extra></extra>`,
        type: 'scatter',
        name: data.year
      };
    });

  const titleLabelArr = yvariable.filter(
    (d) => d.value == form.getFieldValue('parameter')
  );
  const titleLabel = titleLabelArr.length > 0 ? titleLabelArr[0].label : '';

  return (
    <Layout>
      <HistoricalVolatilityForm handleChange={handleChange} yvariable={yvariable} operations={operations} lastUpdate={lastUpdate} form={form}/>
      <PlotlyPlot
        loading = {isLoading}
        data={chartPlotData}
        layout={
          {
            yaxis: {
              title: `Volitilyty(Perc_Change%) - ${optionVal}`,
            },
            xaxis: {
              title: 'Timeframe(Days)',
            },
            title: {
              text: titleLabel,
              font: {
                size : 20
              }
            },
            legend: { 
              title : {
                text: 'Year'
              }
            },
          }
          
        }
        config={{
          responsive: true,
        }}
      />
    </Layout>
  );
};

export default withAuthAndPermission(HistoricalVolatility, Modules.HISTORICAL_VOLATILITY , Permissions.VIEW);
