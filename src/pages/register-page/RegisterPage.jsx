import React, { useState } from 'react';
import { Form, Input, Button, Space ,Card, Row, Col , Checkbox , message} from 'antd';
import titleImage from '../../assets/img/card-head.png'
import './RegisterPage.css'
import { useApi } from '../../context/ApiContext';

  
  const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = React.useState(false);
  
    const values = Form.useWatch([], form);
    React.useEffect(() => {
      form
        .validateFields({
          validateOnly: true,
        })
        .then(
          () => {
            setSubmittable(true);
          },
          () => {
            setSubmittable(false);
          },
        );
    }, [values]);
    return (
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        Register
      </Button>
    );
  };
  
  const RegisterPage = () => {
    const [form] = Form.useForm();
    const { postAsync } = useApi(); 


    const handleRegister = async (values) => {
        console.log(values, "value for submit");
        const response = await postAsync('AdminUser/register', values);
        console.log(response, "fame");
 
    };
    
    const onFinish = (values) => {
      console.log('Received values:', values);
      handleRegister(values);
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
      padding: '40px'
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Card bordered={true} style={{ width: 500 }}>
          <div style={cardTitleStyle} className='mb-5 d-flex align-items-center'>
            <div className='ms-1'>
              <h2>Register</h2>
              <p>Register to start your sweet journey</p>
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
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item  valuePropName="checked1">
                    <Checkbox>
                      I have read and accepted the  <a href="">agreement</a> and privacy policy of Swensen’s.
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item valuePropName="checked2">
                    <Checkbox>
                      I agree to receive the information including other marketing activities from Swensen’s and <a href="">affiliated companies. </a>
                      We will keep your data confidential. Learn more about <a href="">privacy policy </a> from the company’s website.
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Space>
                  <SubmitButton form={form} />
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    );
  };

export default RegisterPage;
