import { Modules } from '../../../../type/module';
import Actions from '../../../Actions/Actions';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    className: 'font-semibold',
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: any) => (
      <Actions path={`/admin/roles/${record.id}`} module={Modules.ROLE} />
    ),
    width: 10,
  },
];

export default columns;
