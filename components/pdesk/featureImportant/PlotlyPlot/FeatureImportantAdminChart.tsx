import React, { FC } from 'react'
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot'

interface Props {
    featureAdminChart : any[];
    featureTitle2: string;
    lookAheadData2 : number;
    loadingSecondChart : boolean
}

const FeatureImportantAdminChart:FC<Props> = ({ loadingSecondChart , featureAdminChart , featureTitle2 , lookAheadData2}) => {
  return (
    <PlotlyPlot
       loading = {loadingSecondChart}
       data={featureAdminChart}
       layout={{
         height: 700 ,
         yaxis: {
           title: 'Feature Importance(%)',
         },
         xaxis: {
           title: 'Feature Name',
           tickangle: 70,
           automargin:true
         },
         title: {
          text : `Feature Importance ${featureTitle2} for ${lookAheadData2} lookahead`,
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

export default FeatureImportantAdminChart