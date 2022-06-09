import { Button, Drawer, Form, FormInstance, Select } from 'antd';
import React, { FC } from 'react';
import { LookAheadFormDataWithID } from '../../../../type/look-ahead';

interface Props {
  form: FormInstance;
  loading : boolean;
  onClose: () => void;
  visible: boolean;
  onHandleFinish: (values: { lookahead_id: number }) => void;
  notAssociatedLookahead: LookAheadFormDataWithID[];
}

const SubscriberLookAheadAssociation: FC<Props> = ({
  form,
  loading,
  onClose,
  visible,
  onHandleFinish,
  notAssociatedLookahead,
}) => {
  const { Option } = Select;
  return (
    <Drawer
      title="Assign Look Ahead"
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
          label="Lookahead"
          name="lookahead_id"
          rules={[{ required: true, message: 'Please Select Lookahead!' }]}
        >
          <Select>
            {notAssociatedLookahead.map((lookahead : LookAheadFormDataWithID) => {
              console.log(lookahead)
              return (
                <Option key={lookahead.id} value={lookahead.id}>
                  {lookahead.days}
                </Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Assign Look Ahead
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default SubscriberLookAheadAssociation;
