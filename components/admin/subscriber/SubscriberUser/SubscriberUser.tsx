import { withRouter } from 'next/router';
import type { Router } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { get, post } from '../../../../util/servercall';
import { Button, Form, Table } from 'antd';
import SubscriberUserAssociation from '../SubscriberUserAssociation/SubscriberUserAssociation';
import {
  getSubscriberUser,
  getSubUserNotassociate,
} from '../../../../url/admin';

interface Props {
  router: Router;
}

const SubscriberUser: FC<Props> = (props) => {
  const [subscribersUser, setsubscribersUser] = useState([]);
  const [notAssociatedUser, setNotAssociatedUser] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onComponentUpdate = () => {
    const id = props.router.query.id as string;
    setLoading(true);
    get(getSubscriberUser(id)).then((response) => {
      setsubscribersUser(response.data.user);
    });
    setLoading(false);
    get(getSubUserNotassociate(id)).then((response) => {
      setNotAssociatedUser(response.data);
    });
  };

  useEffect(() => {
    onComponentUpdate();
  }, []);

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'First Name',
      key: 'first_name',
      dataIndex: 'first_name',
    },
  ];

  const onHandleUserAddClick = () => {
    showDrawer();
  };

  const onHandleFinish = (values: { user_id: number }) => {
    const id = props.router.query.id as string;
    post(getSubscriberUser(id), values).then((response) => {
      onComponentUpdate();
      onClose();
      form.resetFields();
    });
  };

  return (
    <div>
      <div className="flex justify-end pb-3">
        <Button
          type="primary"
          className="button-right"
          onClick={onHandleUserAddClick}
        >
          Assign User
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={subscribersUser}
        rowKey="id"
        size="middle"
        loading={isLoading}
      />

      <SubscriberUserAssociation
        form={form}
        loading={isLoading}
        notAssociatedUser={notAssociatedUser}
        onClose={onClose}
        visible={visible}
        onHandleFinish={onHandleFinish}
      />
    </div>
  );
};

export default withRouter(SubscriberUser);
