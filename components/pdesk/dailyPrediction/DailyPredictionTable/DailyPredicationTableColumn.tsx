const columns = [
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'date',
      className: 'font-semibold',
    },
    {
      title: 'Raw Prediction',
      dataIndex: 'prediction',
      key: 'raw_prediction',
      className: 'text-gray-600',
    },
    {
      title: '75th Percentile Prediction',
      dataIndex: 'live_prediction',
      key: 'percentile_prediction',
      className: 'text-gray-600',
    },
    {
      title: '7 Days Moving Average Prediction',
      dataIndex: 'moving_avg',
      key: 'average_predction',
      className: 'text-gray-600',
    },
];

export default columns;