import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import BasisRiskForm from '../../components/pdesk/basisRiskForm/BasisRiskForm';
import PlotlyPlot from '../../components/common/PlotlyPlot/PlotlyPlot';
import withAuthAndPermission from '../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import { BASISRISK_CHART, BASISRISK_Y_VARIABLE } from '../../url/pdesk';
import { get } from '../../util/servercall';

const BasisRisk = () => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [yVariable, setYVariable] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<any>();
  const [isLoading , setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const responseYVariable = await get(BASISRISK_Y_VARIABLE);
      setYVariable(responseYVariable.data);
      form.setFieldsValue({ yvariable: responseYVariable.data[0].value });
    };
    fetchData();
  }, []);

  const fetchChartData = async () => {
    setLoading(true)
    const yVariableData = form.getFieldValue('yvariable');
    if(yVariableData == undefined) return
    const responseChart = await get(BASISRISK_CHART + `?label=${yVariableData}`);
    setLastUpdate(responseChart.data.last_updated_date);
    setChartData(responseChart.data.data);
    setLoading(false)
  };

  useEffect(() => {
    fetchChartData()
  }, [yVariable]);

  const handleChange = () => {
    fetchChartData()
  };

  let chartPlotData: any[] = [];

    chartPlotData = chartData.map((data) => {
      return {
        x: data.x,
        y: data.y,
        hovertemplate:`Year=${data.year}`+'<br>Timeframe(Days)=%{x}'+'<br>Correlation=%{y} <extra></extra>',
        type: 'scatter',
        name: data.year
      };
    });

  const yVariableData = form.getFieldValue('yvariable');

  return (
    <Layout>
      <BasisRiskForm lastUpdate={lastUpdate} handleChange={handleChange} yVariable={yVariable} form={form}/>
      <PlotlyPlot
        loading={isLoading}
        data={chartPlotData}
        layout={{ 
            height: 500,
            yaxis:{
                title:"Correlation"
            },
            xaxis:{
                title:"Timeframe(Days)"
            },
            title: {
              text: yVariableData,
              font: {
                size : 20
              }
            },
            legend: { 
              title : {
                text: 'Year'
              }
            },
        }}
        config={{
          responsive: true,
        }}
      />
    </Layout>
  );
};

export default withAuthAndPermission(BasisRisk , Modules.BASIS_RISK , Permissions.VIEW);
