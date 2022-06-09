import React, { useState } from 'react';
import { Form, Input, Button, FormInstance, PageHeader } from 'antd';
import { post } from '../../../util/servercall';
import Layout from '../../../components/Layout/Layout';
import CommodityAdd from '../../../components/admin/commodity/CommodityAdd/CommodityAdd';
import { CommodityFormData } from '../../../type/Commodity';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { COMMODITY_CREATE } from '../../../url/admin';
import { useRouter } from 'next/router';

const Add = () => {
  const router = useRouter();

  const initValues: CommodityFormData = {
    display_name: '',
    code: '',
  };

  const onFinish = (form: FormInstance, values: CommodityFormData) => {
    post(COMMODITY_CREATE, values).then((response) => {
      router.push(`/admin/commodity/${response.data.id}/?display=${false}`);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <PageHeader
        className="p-0"
        onBack={() => router.push('/admin/commodity')}
        title="Create New Commodity"
      />
      <CommodityAdd
        initValues={initValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </Layout>
  );
};

export default withAuthAndPermission(Add, Modules.COMMODITY, Permissions.ADD);
