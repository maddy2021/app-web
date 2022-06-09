import { Form } from 'antd';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import ExplainabilityForm from '../../components/tdeskAS/asModelExplainability/explainabilityForm/ExplainabilityForm';
import ExplainabilityTable from '../../components/tdeskAS/asModelExplainability/explainabilityTable/ExplainabilityTable';
import MonthwiseAbsReturnPlot from '../../components/tdeskAS/asModelExplainability/PlotlyPlot/MonthwiseAbsReturnPlot';
import MonthwiseProfitTradesPlot from '../../components/tdeskAS/asModelExplainability/PlotlyPlot/MonthwiseProfitTradesPlot';
import QuarterwiseAbsReturnPlot from '../../components/tdeskAS/asModelExplainability/PlotlyPlot/QuarterwiseAbsReturnPlot';
import QuarterwiseProfitTradesPlot from '../../components/tdeskAS/asModelExplainability/PlotlyPlot/QuarterwiseProfitTradesPlot';
import YearwiseAbsReturnPlot from '../../components/tdeskAS/asModelExplainability/PlotlyPlot/YearwiseAbsReturnPlot';
import YearWiseProfitTradesPlot from '../../components/tdeskAS/asModelExplainability/PlotlyPlot/YearWiseProfitTradesPlot';
import withAuthentication from '../../HOC/WithSuperAdmin/WithSuperAdmin';
import { LabelValue } from '../../type/common';
import {
  AS_MODEL_CHART,
  AS_MODEL_MONTH,
  AS_MODEL_SORT,
  AS_MODEL_SPREAD,
  AS_MODEL_SPREAD_TYPE,
  AS_MODEL_TABLE,
} from '../../url/pdesk';
import { get } from '../../util/servercall';

const ASModelExplainabilityLot = () => {
  const [form] = Form.useForm();
  const [Tform] = Form.useForm();
  const [spreadTypes, setSpreadTypes] = useState<LabelValue[]>([]);
  const [spread, setSpread] = useState<LabelValue[]>([]);
  const [sortBy, setSortBy] = useState<LabelValue[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [spreadMonths, setSpreadMonths] = useState<LabelValue[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  const [yearwiseProfitTrades, setYearwiseProfitTrades] = useState([]);
  const [quarterwiseProfitTrades, setQuarterwiseProfitTrades] = useState([]);
  const [monthwiseProfitTrades, setMonthwiseProfitTrades] = useState([]);

  const [yearwiseAbsReturn, setYearwiseAbsReturn] = useState([]);
  const [quarterwiseAbsReturn, setQuarterwiseAbsReturn] = useState([]);
  const [monthwiseAbsReturn, setMonthwiseAbsReturn] = useState([]);

  useEffect(() => {
    const getAllSpreadTypeAndSort = async () => {
      const responseSpreadType = await get(AS_MODEL_SPREAD_TYPE);
      setSpreadTypes(responseSpreadType.data);
      const responseSort = await get(AS_MODEL_SORT);
      console.log(responseSort);
      setSortBy(responseSort.data);
      const responseSpreadMonth = await get(AS_MODEL_MONTH);
      setSpreadMonths(responseSpreadMonth.data);
      console.log(responseSpreadMonth);
      form.setFieldsValue({
        spreadType: responseSpreadType.data[0].value,
        sortBy: responseSort.data[0].value,
      });
      Tform.setFieldsValue({
        spreadMonth: responseSpreadMonth.data[0].value,
      })
      getAllSpread();
    };
    getAllSpreadTypeAndSort();
  }, []);

  const getAllSpread = async () => {
    const spreadType = form.getFieldValue('spreadType');
    const responseSpread = await get(
      AS_MODEL_SPREAD + `?spread_type=${spreadType}`
    );
    setSpread(responseSpread.data);
    form.setFieldsValue({
      spread: responseSpread.data[0].value,
    });
    fetchChartData();
    fetchTabelData();
  };

  const fetchTabelData = async () => {
    setLoading(true)
    const spreadMonthValue = Tform.getFieldValue('spreadMonth');
    const spreadTypeValue = form.getFieldValue('spreadType');
    const spreadValue = form.getFieldValue('spread');

    if(spreadMonthValue == undefined || spreadTypeValue == undefined || spreadValue == undefined)
    {
      return
    }    
    const getTable = await get(
      AS_MODEL_TABLE +
        `?spread_type=${spreadTypeValue}&spread_name=${spreadValue}&spread_month=${spreadMonthValue}`
    );
    setTableData(getTable.data.data[0]);
    setLoading(false)
  };

  const fetchChartData = async () => {
    setLoading(true);
    const spreadTypeValue = form.getFieldValue('spreadType');
    const spreadValue = form.getFieldValue('spread');
    const sortByValue = form.getFieldValue('sortBy');

    const getAllChart = await get(
      AS_MODEL_CHART +
        `?spread_type=${spreadTypeValue}&spread_name=${spreadValue}&sort_criteria=${sortByValue}`
    );

    setMonthwiseAbsReturn(
      getAllChart.data.data[0].abs_return.monthwise_abs_return
    );
    setQuarterwiseAbsReturn(
      getAllChart.data.data[0].abs_return.quarterwise_abs_return
    );
    setYearwiseAbsReturn(
      getAllChart.data.data[0].abs_return.yearwise_abs_return
    );
    setMonthwiseProfitTrades(
      getAllChart.data.data[0].profit_trades.monthwise_profit_trades
    );
    setQuarterwiseProfitTrades(
      getAllChart.data.data[0].profit_trades.quarterwise_profit_trades
    );
    setYearwiseProfitTrades(
      getAllChart.data.data[0].profit_trades.yearwise_profit_trades
    );
    setLoading(false);
  };

  const handleSpreadAndSortChange = () => {
    fetchChartData();
    fetchTabelData();
  };

  const handleChange = () => {
    getAllSpread();
  };

  const handleTableChange = () => {
    fetchTabelData();
  };

  const spreadValue = form.getFieldValue('spread');

  console.log(tableData);
  return (
    <Layout>
      <h2 className="text-center">TDesk AFS Model Explainability(LOT)</h2>
      <ExplainabilityForm
        form={form}
        handleChange={handleChange}
        handleSpreadAndSortChange={handleSpreadAndSortChange}
        spreadTypes={spreadTypes}
        spread={spread}
        sortBy={sortBy}
      />

      <h3 className="text-center">Profit_Trades For - {spreadValue}</h3>
      <YearWiseProfitTradesPlot loading={isLoading} yearwiseProfitTrades={yearwiseProfitTrades}/>
      <QuarterwiseProfitTradesPlot loading={isLoading} quarterwiseProfitTrades={quarterwiseProfitTrades}/>
      <MonthwiseProfitTradesPlot loading={isLoading} monthwiseProfitTrades={monthwiseProfitTrades}/>

      <ExplainabilityTable loading={isLoading} form={Tform} spreadMonths={spreadMonths} handleTableChange={handleTableChange} tableData={tableData}/>
      <br />
      <h3 className="text-center">Returns For - {spreadValue}</h3>
      <YearwiseAbsReturnPlot  loading={isLoading} yearwiseAbsReturn={yearwiseAbsReturn}/>
      <QuarterwiseAbsReturnPlot loading={isLoading} quarterwiseAbsReturn={quarterwiseAbsReturn} />
      <MonthwiseAbsReturnPlot loading={isLoading} monthwiseAbsReturn={monthwiseAbsReturn}/>
    </Layout>
  );
};

export default withAuthentication(ASModelExplainabilityLot);
