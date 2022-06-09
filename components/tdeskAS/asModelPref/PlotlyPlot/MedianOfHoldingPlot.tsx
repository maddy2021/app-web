import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
  medianOfHoldingPeriod: any[any];
  loading: boolean;
}

const MedianOfHoldingPlot: FC<Props> = ({ loading, medianOfHoldingPeriod }) => {
  const medianOfHoldingData: any[] = [
    {
      x: medianOfHoldingPeriod.x,
      y: medianOfHoldingPeriod.y,
      hovertemplate: 'x=%{x}' + '<br>y=%{y}<extra></extra>',
      type: 'bar',
    },
  ];
  return (
    <PlotlyPlot
      loading={loading}
      data={medianOfHoldingData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'Median Of Holding Period Grouped by Final Trigger',
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

export default MedianOfHoldingPlot;
