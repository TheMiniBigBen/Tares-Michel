import React from 'react';
import { Button, Form, Input } from 'antd';
import type { FormItemProps } from 'antd';

const MyFormItemGroup = ({ prefix, children }) => (
  <div>
    {children}
  </div>
);

const MyFormItem = ({ name, label, children }) => (
  <Form.Item name={name} label={label}>
    {children}
  </Form.Item>
);

const UserForm = () => {
  const [form] = Form.useForm();

  // Esta función se llamará cuando el formulario se envíe exitosamente.
  const onFinish = (values) => {
    // La variable 'values' ya contiene todos los datos del formulario en formato JSON.
    console.log('Todos los datos del formulario:', values);
  };

  return (
    <div>
      <h2>User Form</h2>
      <Form name="form_item_path" layout="vertical" onFinish={onFinish} form={form}>
        <MyFormItemGroup prefix={['user']}>
          <MyFormItemGroup prefix={['name']}>
            <MyFormItem name="firstName" label="First Name">
              <Input />
            </MyFormItem>
            <MyFormItem name="lastName" label="Last Name">
              <Input />
            </MyFormItem>
          </MyFormItemGroup>
          <MyFormItem name="age" label="Age">
            <Input />
          </MyFormItem>
        </MyFormItemGroup>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UserForm;