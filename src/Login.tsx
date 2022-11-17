import React from 'react'

import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import './CSS/Login.css'
const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    // console.log(values.username);
    sessionStorage.setItem('token','12345678987654321')
    const url = '/' + values.username;
    navigate(url);//跳转到主页
  };
  const onReset = () => {
    console.log(666)
    form.resetFields();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className="main" >
      <Form 
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 11 }}
      initialValues={{ remember: true ,username:"DFFF123456"}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      
    >
      <Form.Item 
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
      <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
        <Button type="primary" htmlType="button" style={{marginLeft:"10px"}} onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
      

      </div>
    </>
    
  )
}

export default Login