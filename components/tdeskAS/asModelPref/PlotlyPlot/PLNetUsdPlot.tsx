import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
    plNetUsd: any[any];
    loading: boolean;
}

const PLNetUsdPlot:FC<Props> = ({ loading , plNetUsd}) => {

  const plNetUsdData: any[] = [
    {
      x: plNetUsd.x,
      y: plNetUsd.y,
      hovertemplate: 'Final_Trigger=%{x}' + '<br>Cum_PL_Net=%{y}<extra></extra>',
      type: 'scatter',
    },
  ];

  return (
    <PlotlyPlot
      loading={loading}
      data={plNetUsdData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'P&L Net ($)',
        },
        xaxis: {
          title: 'Final Trigger Date',
        },
        yaxis: {
          title: 'Cum_PL_Net',
        },
      }}
      config={{
        responsive: true,
      }}
    />
  );
};

export default PLNetUsdPlot;
