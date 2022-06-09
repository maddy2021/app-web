import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CommodityTable from '../../../components/admin/commodity/CommodityTable/CommodityTable';
import Layout from '../../../components/Layout/Layout';
import ModulePermission from '../../../components/common/ModulePermissions/ModulePermission';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { COMMODITY_GETALL } from '../../../url/admin';
import { get } from '../../../util/servercall';

const Commodity = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [commodities, setCommodities] = useState([]);

  useEffect(() => {
    setLoading(true);
    get(COMMODITY_GETALL).then((response) => {
      setCommodities(response.data);
      setLoading(false);
    });
  }, []);

  const onAddClick = () => {
    router.push('/admin/commodity/add');
  };

  return (
    <Layout>
      <div className="flex justify-end pb-3">
        <ModulePermission
          module={Modules.COMMODITY}
          permission={Permissions.ADD}
        >
          <Button type="primary" className="button-right" onClick={onAddClick}>
            New Commodity
          </Button>
        </ModulePermission>
      </div>
      <CommodityTable data={commodities} loading={loading}/>
    </Layout>
  );
};

export default withAuthAndPermission(
  Commodity,
  Modules.COMMODITY,
  Permissions.VIEW
);
