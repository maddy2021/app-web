import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import FeatureImportantAdminForm from '../../components/pdesk/featureImportant/FeatureImportantForm/FeatureImportantAdminForm';
import FeatureImportantForm from '../../components/pdesk/featureImportant/FeatureImportantForm/FeatureImportantForm';
import FeatureImportantAdminChart from '../../components/pdesk/featureImportant/PlotlyPlot/FeatureImportantAdminChart';
import FeatureImportantChart from '../../components/pdesk/featureImportant/PlotlyPlot/FeatureImportantChart';
import withAuthAndPermission from '../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import { FEATURE_IMPORTANCE_ADMIN_CHART, FEATURE_IMPORTANCE_CHART, FEATURE_IMPORTANCE_LOOKAHEAD, FEATURE_IMPORTANCE_Y_VARIABLE } from '../../url/pdesk';
import { get } from '../../util/servercall';
import { isSuperAdmin } from '../../util/tokenutil';

const FeatureImportance = () => {
  const [form] = Form.useForm();
  const [yVariable, setYVariable] = useState<any[]>([]);
  const [lookahead, setLookahead] = useState([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [adminChart, setAdminChart] = useState<any[]>([]);
  const [isLoading , setLoading] = useState(false)
  const [isLoadingSecondChart , setLoadingSecondchart] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const responseYVariable = await get(FEATURE_IMPORTANCE_Y_VARIABLE);
      setYVariable(responseYVariable.data);
      const responseLookahead = await get(FEATURE_IMPORTANCE_LOOKAHEAD);
      setLookahead(responseLookahead.data);
      form.setFieldsValue({ yvariable: responseYVariable.data[0].value , yvariable2: responseYVariable.data[0].value , lookahead: responseLookahead.data[0].value ,lookahead2: responseLookahead.data[0].value });
  };
    fetchData();    
  }, []);

  const fetchChartData = async () => {
    setLoading(true)
    const yVariableData = form.getFieldValue('yvariable');
    const lookAheadData = form.getFieldValue('lookahead');
    if (yVariableData == undefined || lookAheadData == undefined) {
      return;
    }
    const responseChart = await get(
      FEATURE_IMPORTANCE_CHART + `?label=${yVariableData}&lookahead=${lookAheadData}&is_internal=${false}`);
      setChartData(responseChart.data.data);
    setLoading(false)
    
    setLoadingSecondchart(true)
    const yVariableData2 = form.getFieldValue('yvariable2');
    const lookAheadData2 = form.getFieldValue('lookahead2');
    if (yVariableData2 == undefined || lookAheadData2 == undefined) {
      return;
    }
    const responseChart2 = await get(
      FEATURE_IMPORTANCE_ADMIN_CHART + `?label=${yVariableData2}&lookahead=${lookAheadData2}`
      );
      setAdminChart(responseChart2.data.data);  
    setLoadingSecondchart(false)
    };

  useEffect(() => {
    fetchChartData();
  }, [lookahead, yVariable]);

  const handleChange = () => {
    fetchChartData();
  };
 
  let chartPlotData: any[] = [];
  chartPlotData = chartData.map((data)=>{
    return {
      x: data.x,
      y: data.y,
      hovertemplate: 'Feature Name=%{x}' + '<br>Feature Importance=%{y} <extra></extra>',
      type: 'bar',
    }
  })
   
  let featureAdminChart : any[] =[];
  
  featureAdminChart = adminChart.map((data)=>{
    return {
      x: data.x,
      y: data.y,
      hovertemplate: 'feature_name=%{x}' + '<br>final_coefficient_in_per=%{y} <extra></extra>',
      type: 'bar',
    }
  })
  
  const featureTitlearr = yVariable.filter(d=>d.value == form.getFieldValue('yvariable'));
  const featureTitle = featureTitlearr.length>0 ?featureTitlearr[0].label : "";

  const featureTitlearr2 = yVariable.filter(d=>d.value == form.getFieldValue('yvariable2'));
  const featureTitle2 = featureTitlearr2.length>0 ?featureTitlearr2[0].label : "";
 
  const lookAheadData = form.getFieldValue('lookahead');
  const lookAheadData2 = form.getFieldValue('lookahead2');

  const accessToken:any = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  return (
    <Layout>
      
      <FeatureImportantForm handleChange={handleChange} yVariable={yVariable} lookahead={lookahead} form={form}/>
      <FeatureImportantChart loading={isLoading} chartPlotData={chartPlotData} featureTitle={featureTitle} lookAheadData={lookAheadData}/>

    {isSuperAdmin(accessToken) ?
      <>
      <FeatureImportantAdminForm handleChange={handleChange} yVariable={yVariable} lookahead={lookahead} form={form}/>       
      <FeatureImportantAdminChart loadingSecondChart={isLoadingSecondChart} featureAdminChart={featureAdminChart} featureTitle2={featureTitle2} lookAheadData2={lookAheadData2}/>
     </>
       : null}
    </Layout>
  );
};

export default withAuthAndPermission(FeatureImportance,Modules.FEATURE_IMPORTANCE , Permissions.VIEW);