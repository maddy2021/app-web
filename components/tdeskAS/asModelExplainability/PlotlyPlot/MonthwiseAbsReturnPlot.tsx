import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
  monthwiseAbsReturn: any[any];
  loading: boolean;
}

const MonthwiseAbsReturnPlot: FC<Props> = ({ loading, monthwiseAbsReturn }) => {
  let monthwiseAbsReturnData: any[] = [];
  monthwiseAbsReturnData = monthwiseAbsReturn.map((data: any) => {
    {
      return {
        x: data.x,
        y: data.y,
        type: 'bar',
        name: `${data.x}`,
        hovertemplate:
          `Month=${data.x}` +
          `<br>Absolute_Returns(%)=${data.y}<extra></extra>`,
      };
    }
  });
  return (
    <PlotlyPlot
      loading={loading}
      data={monthwiseAbsReturnData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'Monthwise Absolute_Returns(%)',
        },
        xaxis: {
          title: 'Month',
        },
        yaxis: {
          title: 'Absolute_Returns(%)',
        },
        legend: {
          title: {
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

export default MonthwiseAbsReturnPlot;
