import { Modules } from "../../../../type/module";
import Actions from "../../../Actions/Actions";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        className: 'font-semibold',
      },
      {
        title: 'First Name',
        dataIndex: 'contact_firstName',
        key: 'contact_firstName',
        className: 'text-gray-600',
        // width: '12%',
      },
      {
        title: 'Last Name',
        dataIndex: 'contact_lastname',
        width: '40%',
        key: 'contact_lastname',
        className: 'text-gray-600',
      },
      {
        title: 'Email',
        dataIndex: 'contact_email',
        key: 'contact_email',
        className: 'text-gray-600',
        // width: '12%',
      },
      {
        title: 'Phone#',
        dataIndex: 'contact_phone',
        key: 'contact_phone',
        className: 'text-gray-600',
        // width: '12%',
      },
    {
        title: 'Action',
        key: 'action',
        render: (record:any) => {
          return (
            <Actions path={`/admin/subscriber/${record.id}`} module={Modules.SUBSCRIBER}/>
          )
        },
        width: 10,
    },
];

export default columns;
