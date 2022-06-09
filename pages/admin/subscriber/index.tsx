import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SubscriberTable from '../../../components/admin/subscriber/SubscriberColumns/SubscriberTable';
import Layout from '../../../components/Layout/Layout';
import { get } from '../../../util/servercall';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import ModulePermission from '../../../components/common/ModulePermissions/ModulePermission';
import { SUBSCRIBER_GETALL } from '../../../url/admin';

const Subscriber = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [subscribers, setsubscribers] = useState([]);

  useEffect(() => {
    setLoading(true);
    get(SUBSCRIBER_GETALL).then((response) => {
      setsubscribers(response.data);
      setLoading(false);
    });
  }, []);

  const onAddClick = () => {
    router.push('/admin/subscriber/add');
  };

  return (
    <Layout>
      <div className="flex justify-end pb-3">
        <ModulePermission
          module={Modules.SUBSCRIBER}
          permission={Permissions.ADD}
        >
          <Button type="primary" className="button-right" onClick={onAddClick}>
            New Subscriber
          </Button>
        </ModulePermission>
      </div>
      <SubscriberTable data={subscribers} loading={loading} />
    </Layout>
  );
};

export default withAuthAndPermission(
  Subscriber,
  Modules.SUBSCRIBER,
  Permissions.VIEW
);
