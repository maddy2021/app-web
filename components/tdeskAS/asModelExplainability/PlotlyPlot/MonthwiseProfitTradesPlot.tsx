import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
    monthwiseProfitTrades: any[any];
    loading: boolean;
}

const MonthwiseProfitTradesPlot:FC<Props> = ({loading , monthwiseProfitTrades}) => {
  let monthwiseProfitTradesData: any[] = [];
  monthwiseProfitTradesData = monthwiseProfitTrades.map((data: any) => {
    {
      return {
        x: data.x,
        y: data.y,
        type: 'bar',
        name: `${data.x}`,
        hovertemplate: `Month=${data.x}` + `<br>Profit_Trades(%)=${data.y}<extra></extra>`
      };
    }
  });

  return (
    <PlotlyPlot
      loading={ loading }
      data={monthwiseProfitTradesData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'Monthwise Profit_Trades(%)',
        },
        xaxis: {
          title: 'Month',
        },
        yaxis: {
          title: 'Profit_Trades(%)',
        },
        legend: { 
          title : {
            text: 'Month'
          }
        },
      }}
      config={{
        responsive: true,
      }}
    />
  );
};

export default MonthwiseProfitTradesPlot;
