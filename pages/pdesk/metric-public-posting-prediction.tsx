import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import PredictionBarChart from '../../components/pdesk/publicPostingPrediction/PredictionChart/PredictionBarChart';
import PredictionBoxChart from '../../components/pdesk/publicPostingPrediction/PredictionChart/PredictionBoxChart';
import withAuthAndPermission from '../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import {
  PUBLIC_POSTING_Y_VARIABLE,
} from '../../url/pdesk';
import { get } from '../../util/servercall';

const MetricPublicPostingPrediction = () => {
  const [yVariable, setYvariable] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseYVariable = await get(PUBLIC_POSTING_Y_VARIABLE);
      setYvariable(responseYVariable.data);
    };
    fetchData();
  }, []);
 
  return (
    <Layout>
      <PredictionBarChart yVariable={yVariable}/>
      <PredictionBoxChart yVariable={yVariable}/> 
    </Layout>
  );
};

export default withAuthAndPermission(
  MetricPublicPostingPrediction,
  Modules.PUBLIC_POSTING_MONTH_FOR,
  Permissions.VIEW
);
