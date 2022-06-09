import React, { FC } from 'react';
import { FormInstance, Tabs } from 'antd';
import UserForm from '../UserForm/UserForm';
import UserRole from '../UserRole/UserRole';
import { useRouter } from 'next/router';

interface Props {
  initValues: any;
  onFinish: (form: FormInstance, values: any) => void;
  onFinishFailed: (error: any) => void;
  isDisable?: boolean;
}

const UserAdd: FC<Props> = ({
  initValues,
  onFinish,
  onFinishFailed,
  isDisable,
}) => {
  const { TabPane } = Tabs;
  const router = useRouter();
  const { id } = router.query;
  const isDisabled = id == undefined;

  function callback(key: any) {
    console.log(key);
  }
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Basic Info" key="1">
        <UserForm
          initValues={initValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          isDisable={isDisable}
        />
      </TabPane>
      <TabPane tab="Roles" key="2" disabled={isDisabled}>
        <UserRole />
      </TabPane>
    </Tabs>
  );
};
export default UserAdd;
