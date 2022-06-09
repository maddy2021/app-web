import React, { FC } from 'react';
import { Tabs } from 'antd';
import { FormInstance } from 'antd';
import SubscriberForm from '../SubscriberForm/SubscriberForm';
import SubscriberUser from '../SubscriberUser/SubscriberUser';
import SubscriberCommodities from '../SubscriberCommodities/SubscriberCommodities';
import { useRouter } from 'next/router';
import SubscriberLookAhead from '../SubscriberLookAhead/SubscriberLookAhead';

interface Props {
  initValues: any;
  onFinish: (form: FormInstance, values: any) => void;
  onFinishFailed: (error: any) => void;
  isDisable?: boolean;
}

const SubscriberAdd: FC<Props> = ({
  initValues,
  onFinish,
  onFinishFailed,
  isDisable,
}) => {
  const router = useRouter();

  const { TabPane } = Tabs;
  
  const { id } = router.query;
  const isDisabled = id == undefined;

  function callback(key: any) {
    console.log(key);
  }

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Basic Info" key="1">
          <SubscriberForm
            initValues={initValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            isDisable={isDisable}
          />
        </TabPane>
        <TabPane tab="User" key="2" disabled={isDisabled}> 
          <SubscriberUser />
        </TabPane>
        <TabPane tab="Commodities" key="3" disabled={isDisabled}>
          <SubscriberCommodities/>
        </TabPane>  
        <TabPane tab="Look Ahead" key="4" disabled={isDisabled}>
          <SubscriberLookAhead/>
        </TabPane> 
      </Tabs>
    </>
  );
};

export default SubscriberAdd;
