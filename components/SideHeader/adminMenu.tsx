import {
  UserOutlined,
  ApartmentOutlined,
  ForkOutlined,
  TeamOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';

export default [
  {
    path: '/admin/users',
    icon: <UserOutlined />,
    module: Modules.USER,
    permission: Permissions.VIEW,
  },
  {
    path: '/admin/subscriber',
    icon: <ApartmentOutlined />,
    module: Modules.SUBSCRIBER,
    permission: Permissions.VIEW,
  },
  {
    path: '/admin/commodity',
    icon: <ForkOutlined />,
    module: Modules.COMMODITY,
    permission: Permissions.VIEW,
  },
  {
    path: '/admin/roles',
    icon: <TeamOutlined />,
    module: Modules.ROLE,
    permission: Permissions.VIEW,
  },
  {
    path: '/admin/permission',
    icon: <LockOutlined />,
    module: Modules.PERMISSION,
    permission: Permissions.VIEW,
  },
];
