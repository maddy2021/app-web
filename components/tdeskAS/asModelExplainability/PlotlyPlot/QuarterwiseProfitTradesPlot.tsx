import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
  quarterwiseProfitTrades: any[any];
  loading: boolean;
}

const QuarterwiseProfitTradesPlot: FC<Props> = ({ loading, quarterwiseProfitTrades }) => {
  let quarterwiseProfitTradesData: any[] = [];
  quarterwiseProfitTradesData = quarterwiseProfitTrades.map((data: any) => {
    {
      return {
        x: data.x,
        y: data.y,
        type: 'bar',
        name: `${data.x}`,
        hovertemplate: `QuarterSym=${data.x}` + `<br>Profit_Trades(%)=${data.y}<extra></extra>`
      };
    }
  });

  return (
    <PlotlyPlot
      loading={loading}
      data={quarterwiseProfitTradesData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'Quarterwise Profit_Trades(%)',
        },
        xaxis: {
          title: 'Quater',
        },
        yaxis: {
          title: 'Profit_Trades(%)',
        },
        legend: { 
          title : {
            text: 'QuarterSym'
          }
        },
      }}
      config={{
        responsive: true,
      }}
    />
  );
};

export default QuarterwiseProfitTradesPlot;
