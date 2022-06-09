import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
  pprofitableTradesByDate: any[];
  loading: boolean;
}

const PProfitableTradesByDatePlot: FC<Props> = ({
  loading,
  pprofitableTradesByDate,
}) => {

  let p_profitableTradesByDateData: any[] = [];

  p_profitableTradesByDateData = pprofitableTradesByDate.map((data) => {
    return {
      x: data.x,
      y: data.y,
      type: 'scatter',
      hovertemplate:
        `Profitable_Trade=${data.year}` +
        '<br>Final_Trigger_date=%{x}' +
        '<br>count=%{y} <extra></extra>',
      name: data.year,
    };
  });

  return (
    <PlotlyPlot
      loading={loading}
      data={p_profitableTradesByDateData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'Profitable Trades By Date',
        },
        xaxis: {
          title: 'Final Trigger Date',
        },
        yaxis: {
          title: 'Count',
        },
        legend: {
          title: {
            text: 'Profitable_Trade',
          },
        },
      }}
      config={{
        responsive: true,
      }}
    />
  );
};

export default PProfitableTradesByDatePlot;
