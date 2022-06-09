import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
    yearwiseAbsReturn: any[any];
    loading: boolean;
}

const YearwiseAbsReturnPlot:FC<Props> = ({loading , yearwiseAbsReturn }) => {
  let yearwiseAbsReturnData: any[] = [];
  yearwiseAbsReturnData = yearwiseAbsReturn.map((data: any) => {
    {
      return {
        x: data.x,
        y: data.y,
        type: 'bar',
        name: `${data.x}`,
        hovertemplate:
        `Year=${data.x}` +
        `<br>Absolute_Reaturns(%)=${data.y}<extra></extra>`,
      };
    }
  });

  return (
    <PlotlyPlot
      loading={loading}
      data={yearwiseAbsReturnData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'Yearwise Absolute_Returns(%)',
        },
        xaxis: {
          title: 'Year',
        },
        yaxis: {
          title: 'Absolute_Returns(%)',
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
  );
};

export default YearwiseAbsReturnPlot;
