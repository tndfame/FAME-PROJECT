// LoginPage.jsx

import React from 'react';
import { Form, Input, Button, Space, Card, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../context/ApiContext';
import titleImage from '../../assets/img/card-head.png';
import './LoginPage.css';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { postAsync } = useApi(); 

  const handleLogin = async (values) => {
    try {
      const response = await postAsync('AdminUser/checkedUserByLogin', values);

      const responseData = response.data;

      console.log(responseData ,"fame");
      if (responseData.success == true) {
        message.success(`Login successful, Welcome ${responseData.user.email}!`);
        login(responseData.user);
        navigate('/home');
      } else {
        message.error('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('An error occurred during login. Please try again.');
    }
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    handleLogin(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const cardTitleStyle = {
    backgroundImage: `url(${titleImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: 'white',
    height: '200px',
    padding: '40px',
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Card bordered={true} style={{ width: 500 }}>
        <div style={cardTitleStyle} className='mb-5 d-flex align-items-center'>
          <div className='ms-4'>
            <h2>Welcome</h2>
            <p>Login to begin the journey</p>
          </div>
        </div>
        <div className='pd-body'>
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} align="center">
                <Form.Item>
                  <Space>
                    <span>
                      <Button
                        size="large"
                        shape="round"
                        style={{ minWidth: '400px' }}
                        className="ant-btn-outline-danger d-flex justify-content-center logout-button"
                        type="ghost"
                        htmlType="submit"
                      >
                        Login
                      </Button>
                    </span>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
