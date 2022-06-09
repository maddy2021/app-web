import { Button, Drawer, Form, FormInstance, Select } from 'antd';
import React, { FC } from 'react';
import { UserFormDataWithID } from '../../../../type/user';

interface Props {
  form: FormInstance;
  loading : boolean;
  visible: boolean;
  onClose: () => void;
  onHandleFinish: (values: { user_id: number }) => void;
  notAssociatedUser: UserFormDataWithID[];
}

const { Option } = Select;

const SubscriberUserAssociation: FC<Props> = ({
  form,
  visible,
  loading,
  onClose,
  onHandleFinish,
  notAssociatedUser,
}) => {
  return (
    <Drawer
      title="Assign User"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{}}
        onFinish={onHandleFinish}
      >
        <Form.Item
          label="Users"
          name="user_id"
          rules={[{ required: true, message: 'Please Select user!' }]}
        >
          <Select>
            {notAssociatedUser.map((user: UserFormDataWithID) => {
              return (
                <Option key={user.id} value={user.id}>
                  {user.first_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
          Assign User
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default SubscriberUserAssociation;
