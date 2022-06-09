import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props{
    tdeskNonIndiaRealizedPositions: any[any];
    loading: boolean;
}

const TdeskRealizedPositionsPlot:FC<Props> = ({loading , tdeskNonIndiaRealizedPositions}) => {
  const tdeskRealizedPositionsData: any[] = [
    {
      x: tdeskNonIndiaRealizedPositions.x,
      y: tdeskNonIndiaRealizedPositions.y,
      hovertemplate:
        'Final_Trigger_date=%{x}' +
        '<br>Absolute_Return(%)=%{y}<extra></extra>',
      type: 'scatter',
    },
  ];

  return (
    <PlotlyPlot
      loading={loading}
      data={tdeskRealizedPositionsData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'TDesk Non-India Realized Positions',
        },
        xaxis: {
          title: 'Final Trigger Date',
        },
        yaxis: {
          title: 'Absolute_Return(%)',
        },
      }}
      config={{
        responsive: true,
      }}
    />
  );
};

export default TdeskRealizedPositionsPlot;
