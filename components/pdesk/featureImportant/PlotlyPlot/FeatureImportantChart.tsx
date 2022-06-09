import React, { FC } from 'react'
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot'

interface Props {
    chartPlotData : any[];
    featureTitle: string;
    lookAheadData : number;
    loading: boolean
}

const FeatureImportantChart:FC<Props> = ({ loading , chartPlotData ,featureTitle ,lookAheadData}) => {
  return (
    <PlotlyPlot
        loading= {loading}
        data={chartPlotData}
        layout={{
          height: 600,
          yaxis: {
            title: 'Feature Importance(%)',
          },
          xaxis: {
            tickangle: 70,
            title: 'Feature Name',
            automargin: true,
          },
          title: {
            text : `Feature Importance ${featureTitle} for ${lookAheadData} lookahead`,
            font : {
              size : 20
            }
          }
        }}
        config={{
          responsive: true,
        }}
      />
  )
}

export default FeatureImportantChart