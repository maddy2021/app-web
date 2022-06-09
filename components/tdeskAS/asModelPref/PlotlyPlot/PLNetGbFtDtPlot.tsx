import React, { FC } from 'react';
import PlotlyPlot from '../../../common/PlotlyPlot/PlotlyPlot';

interface Props {
  plNetGbFtDt: any[];
  loading: boolean;
}
const PLNetGbFtDtPlot: FC<Props> = ({ loading, plNetGbFtDt }) => {
  let plNetGbFtDtData: any[] = [];

  plNetGbFtDtData = plNetGbFtDt.map((data) => {
    return {
      x: data.x,
      y: data.y,
      type: 'scatter',
      hovertemplate:
        `Final_Trigger=${data.name}` +
        '<br>Final_Trigger_date=%{x}' +
        '<br>Cum_PL_Net=%{y} <extra></extra>',
      name: data.name,
    };
  });

  return (
    <PlotlyPlot
      loading={loading}
      data={plNetGbFtDtData}
      layout={{
        width: 500,
        height: 500,
        title: {
          text: 'P&L Net Grouped By Final trigger By Date',
        },
        xaxis: {
          title: 'Final Trigger Date',
        },
        yaxis: {
          title: 'Cum PL_Net',
        },
        legend: {
          title: {
            text: 'Final_Trigger',
          },
        },
      }}
      config={{
        responsive: true,
      }}
    />
  );
};

export default PLNetGbFtDtPlot;
