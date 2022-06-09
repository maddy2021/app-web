import { FormInstance, PageHeader, Tag } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CommodityAdd from '../../../../components/admin/commodity/CommodityAdd/CommodityAdd';
import Layout from '../../../../components/Layout/Layout';
import withAuthAndPermission from '../../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { CommodityFormDataWithID } from '../../../../type/Commodity';
import { Modules } from '../../../../type/module';
import { Permissions } from '../../../../type/permission';
import { COMMODITY_GETBYID, COMMODITY_UPDATE } from '../../../../url/admin';
import { get, post } from '../../../../util/servercall';

const Index = () => {
  const router = useRouter();
  const { display } = router.query;
  const isDisable = display == 'true';

  const initValues: CommodityFormDataWithID = {
    id: 0,
    display_name: '',
    code: '',
  };

  const [initFormData, setInitFormData] = useState(initValues);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    get(COMMODITY_GETBYID + `${id}`).then((response) => {
      setInitFormData(response.data);
    });
  }, [router.isReady, router.query]);

  const onFinish = (form: FormInstance, values: CommodityFormDataWithID) => {
    values.id = initFormData.id;
    post(COMMODITY_UPDATE, values).then((response) => {
      router.push('/admin/commodity');
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
        title={isDisable ? 'Commodity' : 'Edit Commodity'}
        tags={<Tag>{initFormData.code}</Tag>}
      />
      <CommodityAdd
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
  Modules.COMMODITY,
  Permissions.EDIT
);
