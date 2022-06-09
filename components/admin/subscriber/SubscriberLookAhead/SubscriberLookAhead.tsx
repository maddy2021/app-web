import { Button, Form, Table } from 'antd';
import { Router, withRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import {
  getSubLookaheadNotassociate,
  getSubscriberLookahead,
} from '../../../../url/admin';
import { get, post } from '../../../../util/servercall';
import SubscriberLookAheadAssociation from '../SubscriberLookAheadAssociation/SubscriberLookAheadAssociation';

interface Props {
  router: Router;
}

const SubscriberLookAhead: FC<Props> = (props) => {
  const [form] = Form.useForm();
  const [subscriberLookahead, setSubscriberLookahead] = useState([]);
  const [notAssociatedLookahead, setNotAssociatedLookahead] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'Lookahead Days',
      dataIndex: 'days',
      key: 'days',
    },
  ];

  const onComponentUpdate = () => {
    const id = props.router.query.id as string;
    setLoading(true);
    get(getSubscriberLookahead(id)).then((response) => {
      setSubscriberLookahead(response.data.lookahead);
    });
    setLoading(false);

    get(getSubLookaheadNotassociate(id)).then((response) => {
      setNotAssociatedLookahead(response.data);
    });
  };

  useEffect(() => {
    onComponentUpdate();
  }, []);

  const onHandleLookAheadAdd = () => {
    showDrawer();
  };

  const onHandleFinish = (values: { lookahead_id: number }) => {
    const id = props.router.query.id as string;
    post(getSubscriberLookahead(id), values).then((response) => {
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
          onClick={onHandleLookAheadAdd}
        >
          Assign Lookahead
        </Button>
      </div>
      <Table
        columns={columns}
        size="middle"
        dataSource={subscriberLookahead}
        rowKey="id"
      />

      <SubscriberLookAheadAssociation
        loading={isLoading}
        form={form}
        onClose={onClose}
        onHandleFinish={onHandleFinish}
        notAssociatedLookahead={notAssociatedLookahead}
        visible={visible}
      />
    </div>
  );
};

export default withRouter(SubscriberLookAhead);
