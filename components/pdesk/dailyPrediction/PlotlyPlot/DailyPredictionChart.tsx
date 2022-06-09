import React, { FC } from 'react'
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot'

interface Props{
    chartPlotData : any[];
    titleLabel : string;
    currencyFieldVal : string;
    loading : boolean
}
const DailyPredictionChart:FC<Props> = ({ loading ,chartPlotData ,titleLabel ,currencyFieldVal}) => {
  return (
    <PlotlyPlot
    loading={loading}
    data={chartPlotData}
    layout={{
      height: 500,
      yaxis: {
        title: `${titleLabel} [${currencyFieldVal}]`,
      },
      xaxis: {
        title: 'Date',
        automargin: true,
      },
      title: {
        text: `30 Days Lookahead ${titleLabel} [${currencyFieldVal}]`,
        font: {
          size : 20
        }
      },
      legend: { 
        title : {
          text: 'type'
        }
      },      
    }}
    config={{
      responsive: true,
    }}
  />
  )
}

export default DailyPredictionChart