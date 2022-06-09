import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
  chartPlotData: any[];
  titleLabel: string;
  loading : boolean
}

const DirectionalCorrectnessChart:FC<Props> = ({ loading , chartPlotData , titleLabel}) => {
  return (
    <PlotlyPlot
      loading={loading}
      data={chartPlotData}
      layout={{
        title :{
          text : `${titleLabel}` + ' Directional Correctness',
          font : {
            size : 20
          }
        },
        height: 600,
        yaxis: {
          title: 'Percentage',
        },
        xaxis: {
          title: 'Year',
        },
        legend:{
          title : {
            text: 'lookahead_days',
          },
          x: 0.5 , y : 1.10 , xanchor : 'center' , orientation : 'h'
        }
      }}
      config={{
        responsive: true,
      }}
    />
  );
};

export default DirectionalCorrectnessChart;
