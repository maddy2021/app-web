import { DatePicker, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import FinalTriggerPlot from '../../components/tdeskAS/asModelPref/PlotlyPlot/FinalTriggerPlot';
import MedianOfHoldingPlot from '../../components/tdeskAS/asModelPref/PlotlyPlot/MedianOfHoldingPlot';
import PLNetGbFtDtPlot from '../../components/tdeskAS/asModelPref/PlotlyPlot/PLNetGbFtDtPlot';
import PLNetGbFtPlot from '../../components/tdeskAS/asModelPref/PlotlyPlot/PLNetGbFtPlot';
import PLNetUsdPlot from '../../components/tdeskAS/asModelPref/PlotlyPlot/PLNetUsdPlot';
import PProfitableTradesByDatePlot from '../../components/tdeskAS/asModelPref/PlotlyPlot/PProfitableTradesByDatePlot';
import PredictedDistributionPlot from '../../components/tdeskAS/asModelPref/PlotlyPlot/PredictedDistributionPlot';
import TdeskRealizedPositionsPlot from '../../components/tdeskAS/asModelPref/PlotlyPlot/TdeskRealizedPositionsPlot';
import { get } from '../../util/servercall';
import { datewise_predictions_column } from '../../components/tdeskAS/asModelPref/datewiseColumn/datewiseColumn';
import { print_output_column } from '../../components/tdeskAS/asModelPref/outputColumn/outputColumn';
import withAuthentication from '../../HOC/WithSuperAdmin/WithSuperAdmin';
import { AS_MODEL_PREF_NON_INDIA } from '../../url/pdesk';

const AsModelPerf = () => {
  const [tableData, setTableData] = useState([]);
  const [predictedDirectionDistribution, setPredictedDirectionDistribution] =
    useState([]);
  const [finalTriggerDistribution, setFinalTriggerDistribution] = useState([]);
  const [medianOfHoldingPeriod, setMedianOfHoldingPeriod] = useState([]);
  const [plNetGbFt, setPlNetGbFt] = useState([]);
  const [plNetGbFtDt, setPlNetGbFtDt] = useState([]);
  const [tdeskNonIndiaRealizedPositions, setTdeskNonIndiaRealizedPositions] =
    useState([]);
  const [pprofitableTradesByDate, setPprofitableTradesByDate] = useState([]);
  const [plNetUsd, setPlNetUsd] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onchange = (value: any, dateString: string[]) => {
    const startDate = dateString[0];
    const endDate = dateString[1];
    const fetchData = async () => {
      setLoading(true);
      const getData = await get(
        AS_MODEL_PREF_NON_INDIA + `?start_date=${startDate}&end_date=${endDate}`
      );
      setTableData(getData.data.data[0].table.data);
      setPredictedDirectionDistribution(
        getData.data.data[0].charts.predicted_direction_distribution
      );
      setFinalTriggerDistribution(
        getData.data.data[0].charts.final_trigger_distribution
      );
      setMedianOfHoldingPeriod(
        getData.data.data[0].charts.median_of_holding_period
      );
      setPlNetGbFt(getData.data.data[0].charts['p&l_net_gb_ft']);
      setPlNetGbFtDt(getData.data.data[0].charts['p&l_net_gb_ft_dt'].data);
      setTdeskNonIndiaRealizedPositions(
        getData.data.data[0].charts.tdesk_non_india_realized_positions
      );
      setPprofitableTradesByDate(
        getData.data.data[0].charts['p&profitable_trades_by_date'].data
      );
      setPlNetUsd(getData.data.data[0].charts['p&l_net_usd']);
      setLoading(false);
    };
    fetchData();
  };

  useEffect(() => {
    onchange([], ['2021-07-28', '2022-05-20']);
  }, []);

  const date_source = tableData.map((data: any) => {
    return data.datewise_predictions;
  });

  const print_output_source = tableData.map((data: any) => {
    return data.print_output;
  });

  return (
    <Layout>
      <h2 className="text-center">Non India AS Model Performance ($/LOT)</h2>
      <Space direction="vertical" size={12}>
        Select Date Range
        <DatePicker.RangePicker style={{ width: '100%' }} onChange={onchange} />
      </Space>

      <h2 className="mt-5">Number Of Predictions Datewise</h2>
      <Table
        loading={isLoading}
        style={{ width: '500' }}
        columns={datewise_predictions_column}
        dataSource={date_source[0]}
        pagination={false}
        scroll={{ y: 400 }}
        rowKey="Predicted_Date"
        size="middle"
      />
      <h2 className="mt-5">Print Outputs</h2>
      <Table
        loading={isLoading}
        style={{ width: '500' }}
        columns={print_output_column}
        dataSource={print_output_source[0]}
        pagination={false}
        rowKey="Name"
        size="middle"
      />

      <div className="display-flex">
        <PredictedDistributionPlot
          loading={isLoading}
          predictedDirectionDistribution={predictedDirectionDistribution}
        />
        <FinalTriggerPlot
          loading={isLoading}
          finalTriggerDistribution={finalTriggerDistribution}
        />
      </div>

      <div className="display-flex">
        <MedianOfHoldingPlot
          loading={isLoading}
          medianOfHoldingPeriod={medianOfHoldingPeriod}
        />
        <PLNetGbFtPlot loading={isLoading} plNetGbFt={plNetGbFt} />
      </div>

      <div className="display-flex">
        <PLNetGbFtDtPlot loading={isLoading} plNetGbFtDt={plNetGbFtDt} />
        <TdeskRealizedPositionsPlot
          loading={isLoading}
          tdeskNonIndiaRealizedPositions={tdeskNonIndiaRealizedPositions}
        />
      </div>

      <div className="display-flex">
        <PProfitableTradesByDatePlot
          loading={isLoading}
          pprofitableTradesByDate={pprofitableTradesByDate}
        />
        <PLNetUsdPlot loading={isLoading} plNetUsd={plNetUsd} />
      </div>
    </Layout>
  );
};

export default withAuthentication(AsModelPerf);
