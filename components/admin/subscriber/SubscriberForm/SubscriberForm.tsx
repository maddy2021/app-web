import React, { FC, useEffect, useState } from 'react';
import { Form, Input, Button, FormInstance, Skeleton, Row, Col } from 'antd';
import { useRouter } from 'next/router';

interface Props {
  initValues: any;
  onFinish: (form: FormInstance, values: any) => void;
  onFinishFailed: (error: any) => void;
  isDisable?: boolean;
}

const SubscriberForm: FC<Props> = ({
  initValues,
  onFinish,
  onFinishFailed,
  isDisable,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const disable = isDisable == undefined ? false : isDisable;

  const [form] = Form.useForm();
  const [isSaving, setSaving] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleOnFinish = (values: any) => {
    setSaving(true);
    if (onFinish) {
      onFinish(form, values);
      setSaving(false);
    }
  };

  const handleOnFinishFail = (error: any) => {
    if (onFinishFailed) {
      onFinishFailed(error);
    }
  };

  useEffect(() => {
    form.setFieldsValue(initValues);
  }, [form, initValues]);

  return (
    <Skeleton loading={isLoading}>
      <Row>
        <Col xl={8} lg={12} span={24}>
          <Form
            name="subscriber"
            form={form}
            initialValues={initValues}
            onFinish={handleOnFinish}
            onFinishFailed={handleOnFinishFail}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item label="ID" name="id" hidden={true}>
              <Input readOnly={disable} hidden={true} />
            </Form.Item>

            <Form.Item
              label="Contact First Name"
              name="contact_firstName"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input readOnly={disable} />
            </Form.Item>

            <Form.Item label="Contact Last Name" name="contact_lastname">
              <Input readOnly={disable} />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: 'Please input subscriber name!' },
              ]}
            >
              <Input readOnly={disable} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="contact_email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input readOnly={disable} />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="contact_phone"
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <Input readOnly={disable} />
            </Form.Item>

            {disable == false && (
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={disable}
                  loading={isSaving}
                >
                  {id == undefined ? 'Submit' : 'Update'}
                </Button>
              </Form.Item>
            )}
          </Form>
        </Col>
      </Row>
    </Skeleton>
  );
};

export default SubscriberForm;
