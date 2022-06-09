import React, { FC } from 'react';
import { Space } from 'antd';
import EyeIconLink from '../common/EyeIconLink/EyeIconLink';
import EditIconLink from '../common/EditIconLink/EditIconLink';
import { DeleteOutlined } from '@ant-design/icons';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import ModulePermission from '../common/ModulePermissions/ModulePermission';

interface Props {
  path: string;
  module: Modules;
}

const Actions: FC<Props> = ({ path, module }) => {
  return (
    <Space size="middle">
      <ModulePermission module={module} permission={Permissions.EDIT}>
        <EyeIconLink path={path} display={true} />
      </ModulePermission>

      <ModulePermission module={module} permission={Permissions.EDIT}>
        <EditIconLink path={path} display={false} />
      </ModulePermission>

      <ModulePermission module={module} permission={Permissions.DELETE}>
        <a className="text-gray-500">
          <DeleteOutlined />
        </a>
      </ModulePermission>
    </Space>
  );
};

export default Actions;
