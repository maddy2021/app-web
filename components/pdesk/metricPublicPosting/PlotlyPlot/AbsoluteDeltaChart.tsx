import React, { FC } from 'react'
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot'

interface Props {
   publicPostingBoxPlot: any[];
   titleLabel : string;
   loading: boolean;
}

const AbsoluteDeltaChart:FC<Props> = ({ loading , publicPostingBoxPlot , titleLabel}) => {
  return (
    <PlotlyPlot
        loading = {loading}
        data={publicPostingBoxPlot}
        layout={{
          title: {
            text: `${titleLabel} Absolute Delta Based on Public Posting`,
            font: {
              size : 20
            }
          },
          height: 500,
          yaxis: {
            title: 'Absolute Delta as % of Actual Price',
          },
          xaxis: {
            title: 'Lookahead Days',
          },
          showlegend: false,
        }}
        config={{
          responsive: true,
        }}
      />
  )
}

export default AbsoluteDeltaChart