import React from 'react';
import { FormInstance, PageHeader } from 'antd';
import { post } from '../../../util/servercall';
import Layout from '../../../components/Layout/Layout';
import { SubscriberFormData } from '../../../type/subscriber';
import SubscriberAdd from '../../../components/admin/subscriber/SubscriberAdd/SubscriberAdd';
import { useRouter } from 'next/router';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { SUBSCRIBER_CREATE } from '../../../url/admin';

const Add = () => {
  const router = useRouter();

  const initValues: SubscriberFormData = {
    name: '',
    contact_firstName: '',
    contact_lastname: '',
    contact_email: '',
    contact_phone: '',
  };

  const onFinish = (form: FormInstance, values: SubscriberFormData) => {
    post(SUBSCRIBER_CREATE, values).then((response) => {
      router.push(`/admin/subscriber/${response.data.id}/?display=${false}`);
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
        title="Create New Subscriber"
      />
      <SubscriberAdd
        initValues={initValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </Layout>
  );
};

export default withAuthAndPermission(Add, Modules.SUBSCRIBER, Permissions.ADD);
