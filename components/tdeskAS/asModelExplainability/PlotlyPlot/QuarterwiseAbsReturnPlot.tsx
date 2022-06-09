import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
    quarterwiseAbsReturn: any[any];
    loading: boolean;
}

const QuarterwiseAbsReturnPlot:FC<Props> = ({ loading , quarterwiseAbsReturn }) => {
  let quarterwiseAbsReturnData: any[] = [];
  quarterwiseAbsReturnData = quarterwiseAbsReturn.map((data: any) => {
    {
      return {
        x: data.x,
        y: data.y,
        type: 'bar',
        name: `${data.x}`,
        hovertemplate: `QuarterSym=${data.x}` + `<br>Absolute_Reaturns(%)=${data.y}<extra></extra>`
      };
    }
  });
  return (
    <PlotlyPlot
      loading={loading}
      data={quarterwiseAbsReturnData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'Quarterwise Absolute_Returns(%)',
        },
        xaxis: {
          title: 'Quarter',
        },
        yaxis: {
          title: 'Absolute_Returns(%)',
        },
        legend: { 
          title : {
            text: 'QuarterSym'
          }
        },
      }}
      config={{
        responsive: true,
      }}
    />
  );
};

export default QuarterwiseAbsReturnPlot;
