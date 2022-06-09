import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import MetricPublicPostingBarChart from '../../components/pdesk/metricPublicPosting/MetricPublicPostingChart/MetricPublicPostingBarChart';
import MetricPublicPostingBoxChart from '../../components/pdesk/metricPublicPosting/MetricPublicPostingChart/MetricPublicPostingBoxChart';
import withAuthAndPermission from '../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import {
  PUBLIC_POSTING_Y_VARIABLE,
} from '../../url/pdesk';
import { get } from '../../util/servercall';

const MetricPublicPosting = () => {
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
      <MetricPublicPostingBarChart yVariable={yVariable} />
      <MetricPublicPostingBoxChart yVariable={yVariable}/>
    </Layout>
  );
};

export default withAuthAndPermission(
  MetricPublicPosting,
  Modules.PUBLIC_POSTING_MONTH_IN,
  Permissions.VIEW
);
