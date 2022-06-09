import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
  predictedDirectionDistribution: any[any];
  loading: boolean;
}

const PredictedDistributionPlot: FC<Props> = ({
  loading,
  predictedDirectionDistribution,
}) => {

  const predictedDistributionData: any[] = [
    {
      x: predictedDirectionDistribution.x,
      y: predictedDirectionDistribution.y,
      hovertemplate: 'x=%{x}' + '<br>y=%{y}<extra></extra>',
      type: 'bar',
    },
  ];

  return (
    <PlotlyPlot
      loading={loading}
      data={predictedDistributionData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'predicted Direction Distribution',
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

export default PredictedDistributionPlot;
