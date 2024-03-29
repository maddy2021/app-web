import { Modules } from '../../../../type/module';
import Actions from '../../../Actions/Actions';

const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    className: 'font-semibold',
  },
  {
    title: 'Display Name',
    dataIndex: 'display_name',
    key: 'display_name',
    className: 'text-gray-600',
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: any) => (
      <Actions
        path={`/admin/commodity/${record.id}`}
        module={Modules.COMMODITY}
      />
    ),
    width: 10,
  },
];

export default columns;
