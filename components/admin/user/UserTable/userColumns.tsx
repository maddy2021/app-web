import { Modules } from '../../../../type/module';
import Actions from '../../../Actions/Actions';

const columns = [
  {
    title: 'Name',
    dataIndex: 'first_name',
    key: 'first_name',
    className: 'font-semibold',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    className: 'text-gray-600',
    // width: '12%',
  },
  {
    title: 'Phone#',
    dataIndex: 'phone',
    width: '40%',
    key: 'phone',
    className: 'text-gray-600',
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: any) => {
      return (
        <Actions path={`/admin/users/${record.id}`} module={Modules.USER} />
      );
    },
    width: 10,
  },
];

export default columns;
