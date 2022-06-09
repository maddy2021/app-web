import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
  plNetGbFt: any[any];
  loading: boolean;
}

const PLNetGbFtPlot: FC<Props> = ({ loading, plNetGbFt }) => {
  const plNetGbFtData: any[] = [
    {
      x: plNetGbFt.x,
      y: plNetGbFt.y,
      hovertemplate: 'x=%{x}' + '<br>y=%{y}<extra></extra>',
      type: 'bar',
    },
  ];
  return (
    <PlotlyPlot
      loading={loading}
      data={plNetGbFtData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'P&L Net Grouped By Final trigger',
        },
        xaxis: {
          title: 'Name',
        },
        yaxis: {
          title: 'Value',
        },
      }}
      config={{
        responsive: true,
      }}
    />
  );
};

export default PLNetGbFtPlot;
