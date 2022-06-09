import React, { FC } from 'react'
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot'

interface Props {
    yearwiseProfitTrades: any[any];
    loading: boolean;
}

const YearWiseProfitTradesPlot:FC<Props> = ({loading , yearwiseProfitTrades}) => {

  let yearwiseProfitTradesData: any[] = [];
  yearwiseProfitTradesData = yearwiseProfitTrades.map((data: any) => {
    {
      return {
        x: data.x,
        y: data.y,
        type: 'bar',
        name: `${data.x}`,
        hovertemplate:
        `Year=${data.x}` +
        `<br>Profit_Trades(%)=${data.y}<extra></extra>`,
      };
    }
  });

  return (
    <PlotlyPlot
        loading={loading}
        data={yearwiseProfitTradesData}
        layout={{
          width: 500,
          height: 500,
          title: {
            text: 'Yearwise Profit_Trades(%)',
          },
          xaxis: {
            title: 'Year',
          },
          yaxis: {
            title: 'Profit_Trades(%)',
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
  )
}

export default YearWiseProfitTradesPlot