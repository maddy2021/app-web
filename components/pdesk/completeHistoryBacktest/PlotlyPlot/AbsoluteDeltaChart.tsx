import React, { FC } from 'react'
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot'

interface Props {
  absoluteDeltaBoxChart : any[];
  titleLabel2 : string;
  loadingSecondChart : boolean;

}

const AbsoluteDeltaChart:FC<Props> = ({ loadingSecondChart , absoluteDeltaBoxChart , titleLabel2}) => {
  return (
    <PlotlyPlot
        loading = {loadingSecondChart}
        data={absoluteDeltaBoxChart}
        layout={{
          title :{
            text : `${titleLabel2} Absolute Delta as % of Actual Price Backtest Results`,
            font : {
              size : 20
            }
          },
          boxmode: 'group',
          height: 500,
          yaxis: {
            title: 'Absolute Delta as % of Actual Price',
          },
          xaxis: {
            title: 'Year',
          },
          legend: { 
            title : {
              text: 'lookahead_days'
            },  
            x: 0.5, y: 1.15, orientation: 'h', xanchor: 'center'
          },
        }}
        config={{
          responsive: true,
        }}
      />
  )
}

export default AbsoluteDeltaChart