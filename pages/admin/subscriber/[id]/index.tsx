import { FormInstance, PageHeader, Tag } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SubscriberAdd from '../../../../components/admin/subscriber/SubscriberAdd/SubscriberAdd';
import Layout from '../../../../components/Layout/Layout';
import withAuthAndPermission from '../../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../../type/module';
import { Permissions } from '../../../../type/permission';
import { SubscriberFormDataWithID } from '../../../../type/subscriber';
import { SUBSCRIBER_GETBYID, SUBSCRIBER_UPDATE } from '../../../../url/admin';
import { get, post } from '../../../../util/servercall';

const Index = () => {
  const router = useRouter();
  const { display } = router.query;
  const isDisable = display == 'true';

  const initValues: SubscriberFormDataWithID = {
    id: 0,
    name: '',
    contact_firstName: '',
    contact_lastname: '',
    contact_email: '',
    contact_phone: '',
  };

  const [initFormData, setInitFormData] = useState(initValues);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    get(SUBSCRIBER_GETBYID + `${id}`).then((response) => {
      setInitFormData(response.data);
    });
  }, [router.isReady, router.query]);

  const onFinish = (form: FormInstance, values: SubscriberFormDataWithID) => {
    values.id = initFormData.id;
    post(SUBSCRIBER_UPDATE, values).then((response) => {
      router.push('/admin/subscriber');
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <PageHeader
        className="p-0"
        onBack={() => router.push('/admin/subscriber')}
        title={isDisable ? 'Subscriber' : 'Edit Subscriber'}
        tags={<Tag>{initFormData.contact_firstName}</Tag>}
      />
      <SubscriberAdd
        initValues={initFormData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isDisable={isDisable}
      />
    </Layout>
  );
};

export default withAuthAndPermission(
  Index,
  Modules.SUBSCRIBER,
  Permissions.EDIT
);
