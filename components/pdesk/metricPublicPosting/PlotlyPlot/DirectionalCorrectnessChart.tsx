import React, { FC } from 'react'
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot'

interface Props {
    chartPlotData : any[];
    titleLabel : string;
    highimpectData : string;
    loading : boolean;
}

const DirectionalCorrectnessChart:FC<Props> = ({ loading , chartPlotData , titleLabel , highimpectData}) => {
  return (
    <PlotlyPlot
        loading={loading}
        data={chartPlotData}
        layout={{
          title: {
            text: `${titleLabel} Directional Correctness of  Public Posting for ${
              highimpectData + '%'
            } high impect cases`,
            font: {
              size : 20
            }
          },
          height: 500,
          yaxis: {
            title: 'Directional Correctness(%)',
          },
          xaxis: {
            title: 'Lookahead Days',
          },
        }}
        config={{
          responsive: true,
        }}
      />

  )
}

export default DirectionalCorrectnessChart