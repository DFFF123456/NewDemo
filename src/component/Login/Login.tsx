import React from 'react'
import { Button, Checkbox, Form, Input ,message} from 'antd';
import { useNavigate } from "react-router-dom";
import './Login.css'

interface values{
  username: String,
  password: String,
  
}
const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  //登录
  const onFinish = (values: values) => {
    sessionStorage.clear()
    sessionStorage.setItem('token','12345678987654321')
    const url = '/' + values.username;
    message.success(' success login');
    navigate(url);//跳转到主页
  };
  //表单清空
  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      <div className="main" >
      <Form 
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 11 }}
      initialValues={{ remember: true}}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
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