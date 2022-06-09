import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
  finalTriggerDistribution: any[any];
  loading: boolean;
}

const FinalTriggerPlot: FC<Props> = ({ loading, finalTriggerDistribution }) => {

  const finalTriggerData: any[] = [
    {
      x: finalTriggerDistribution.x,
      y: finalTriggerDistribution.y,
      hovertemplate: 'x=%{x}' + '<br>y=%{y}<extra></extra>',
      type: 'bar',
    },
  ];

  return (
    <PlotlyPlot
      loading={loading}
      data={finalTriggerData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'Final Trigger Distribution',
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

export default FinalTriggerPlot;
