import { Button, Form, Table } from 'antd';
import { withRouter } from 'next/router';
import type { Router } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { get, post } from '../../../../util/servercall';
import SubscriberCommodityAssociation from '../SubscriberCommodityAssociation/SubscriberCommodityAssociation';
import {
  getSubCommNotassociate,
  getSubscriberCommodities,
} from '../../../../url/admin';

interface Props {
  router: Router;
}

const SubscriberCommodities: FC<Props> = (props) => {
  const [subscriberCommodities, setSubscriberCommodities] = useState([]);
  const [notAssociatedCommodities, setNotAssociatedCommodities] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const [form] = Form.useForm();

  const onClose = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Display Name',
      key: 'display_name',
      dataIndex: 'display_name',
    },
  ];

  const onComponentUpdate = () => {
    const id = props.router.query.id as string;
    setLoading(true);
    get(getSubscriberCommodities(id)).then((response) => {
      setSubscriberCommodities(response.data.commodity);
    });
    setLoading(false);
    get(getSubCommNotassociate(id)).then((response) => {
      setNotAssociatedCommodities(response.data);
    });
  };

  useEffect(() => {
    onComponentUpdate();
  }, []);

  const onHandleCommodityAddClick = () => {
    showDrawer();
  };

  const onHandleFinish = (values: { commodity_id: number }) => {
    const id = props.router.query.id as string;
    post(getSubscriberCommodities(id), values).then((response) => {
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
          onClick={onHandleCommodityAddClick}
        >
          Assign Commodity
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={subscriberCommodities}
        rowKey="id"
        size="middle"
        loading={isLoading}
      />

      <SubscriberCommodityAssociation
        loading={isLoading}
        form={form}
        onClose={onClose}
        onHandleFinish={onHandleFinish}
        notAssociatedCommodities={notAssociatedCommodities}
        visible={visible}
      />
    </div>
  );
};

export default withRouter(SubscriberCommodities);
