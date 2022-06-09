import React, { FC } from 'react';
import { CommodityFormDataWithID } from '../../../../type/Commodity';
import { Button, Drawer, Form, FormInstance, Select } from 'antd';

interface Props {
  form: FormInstance;
  onClose: () => void;
  loading : boolean;
  visible: boolean;
  onHandleFinish: (values: { commodity_id: number }) => void;
  notAssociatedCommodities: CommodityFormDataWithID[];
}

const { Option } = Select;

const SubscriberCommodityAssociation: FC<Props> = ({
  form,
  loading,
  onClose,
  visible,
  onHandleFinish,
  notAssociatedCommodities,
}) => {
  return (
    <Drawer
      title="Assign Commodity"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{}}
        onFinish={onHandleFinish}
      >
        <Form.Item
          label="Commodities"
          name="commodity_id"
          rules={[{ required: true, message: 'Please Select commodity!' }]}
        >
          <Select>
            {notAssociatedCommodities.map(
              (commodity: CommodityFormDataWithID) => {
                return (
                  <Option key={commodity.id} value={commodity.id}>
                    {commodity.display_name}
                  </Option>
                );
              }
            )}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Assign Commodity
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default SubscriberCommodityAssociation;
