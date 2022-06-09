import { Form, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import DailyPredictionForm from '../../components/pdesk/dailyPrediction/DailyPredictionForm/DailyPredictionForm';
import columns from '../../components/pdesk/dailyPrediction/DailyPredictionTable/DailyPredicationTableColumn';
import columns2 from '../../components/pdesk/dailyPrediction/DailyPredictionTable/FeaturePercentileChangeColumn';
import DailyPredictionChart from '../../components/pdesk/dailyPrediction/PlotlyPlot/DailyPredictionChart';
import withAuthAndPermission from '../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import { DAILY_PREDICTION_CHART, DAILY_PREDICTION_CURRENCY, DAILY_PREDICTION_DATA_TABLE, DAILY_PREDICTION_DATERANGE , DAILY_PREDICTION_Y_VARIABLE } from '../../url/pdesk';
import { get } from '../../util/servercall';

const DailyPrediction = () => {
  const [form] = Form.useForm();

  const [dateRange, setDateRange] = useState([]);
  const [feature, setFeature] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  const [dataTable, setDataTable] = useState([]);
  const [isLoading , setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const responseDateRange = await get(DAILY_PREDICTION_DATERANGE);
      setDateRange(responseDateRange.data);
      const responseFeature = await get(DAILY_PREDICTION_Y_VARIABLE);
      setFeature(responseFeature.data);
      const responseCurrency = await get(DAILY_PREDICTION_CURRENCY);
      setCurrency(responseCurrency.data);
      form.setFieldsValue({
        date: responseDateRange.data[0].value,
        currencyField: responseCurrency.data[0].value,
        featureField: responseFeature.data[0].value,
      });
    };
    fetchData();
  }, []);

  const fetchChartData = async () => {
    setLoading(true)
    const dateRangeData = form.getFieldValue('date');
    const featureData = form.getFieldValue('featureField');
    const currency = form.getFieldValue('currencyField');

    if (
      dateRangeData == undefined ||
      featureData == undefined ||
      currency == undefined ) {
      return;
    }

    const chart = await get(
      DAILY_PREDICTION_CHART + `?label=${featureData}&date_value=${dateRangeData}&currency=${currency}`
    );
    setLastUpdate(chart.data.last_updated_date)
    setChartData(chart.data.data);
    
    const responseDataTable = await get(
      DAILY_PREDICTION_DATA_TABLE + `?label=${featureData}&date_value=${dateRangeData}&currency=${currency}`
      );
      
    setDataTable(responseDataTable.data.data);
    setLoading(false)
  };

  useEffect(() => {
    fetchChartData();
  }, [dateRange, feature, currency , lastUpdate]);

  const handleChange = () => {
    fetchChartData();
  };
  
  const featureData = form.getFieldValue('featureField');
  const titleLabelArr:any[] = feature.filter((d:any) => d.value == featureData);
  const titleLabel = titleLabelArr.length > 0 ? titleLabelArr[0].label : '';
  
  let chartPlotData: any[] = [];
  if (chartData.length > 0) {
    chartPlotData = chartData.map((data:any) => {
      return {
        x: data.x,
        y: data.y,
        hovertemplate:
          `type=${data.name}` + '<br>Date=%{x}' + `<br>${featureData}=%{y} <extra></extra>`,
        type: 'scatter',
        name: data.name,
        label: 'type',
      };
    });
  }

  const currencyFieldVal = form.getFieldValue('currencyField');
  
  const daily_prediction_table = dataTable.map((data:any) =>{
    return (
      data.daily_prediction_table
     )
  })
  const feature_percentile_change_table = dataTable.map((data:any) =>{
    return (
      data.feature_percentile_change_table
     )
  })
  return (
    <Layout>
      
        <DailyPredictionForm handleChange={handleChange} lastUpdate={lastUpdate} dateRange={dateRange} feature={feature} currency={currency} form={form}/>
        <DailyPredictionChart loading={isLoading} chartPlotData={chartPlotData} currencyFieldVal={currencyFieldVal} titleLabel={titleLabel}/>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={daily_prediction_table[0]}
            scroll={{ y: 400 }}
            pagination={false}
            rowKey="Date"
            size="middle"
          /><br/><br/>
        <h1 className="text-center">
          <b>Feature Percentile Change</b>
        </h1>
          <Table
            loading={isLoading}
            columns={columns2}
            dataSource={feature_percentile_change_table[1]}
            scroll={{ y: 500 }}
            pagination={false}
            rowKey="Lookahead"
            size="middle"
          />
    </Layout>
  );
};

export default withAuthAndPermission(DailyPrediction, Modules.DAILY_PREDICTION , Permissions.VIEW);
