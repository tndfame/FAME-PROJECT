import React, { useState } from 'react';
import { Layout, Row, Col, Space, Button, Divider, Dropdown, Drawer , Menu } from 'antd';
import {
  DownOutlined,
  CaretDownOutlined,
  EnvironmentTwoTone,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  MenuOutlined,
  LogoutOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import image_swen from '../../assets/img/swensen-s-logo-B0148BB776-seeklogo.com.png';
import bannerImage from '../../assets/img/banner-image.svg';
import deliveryImage from '../../assets/img/delivery_ico.svg';
import './AppLayout.css';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/Home-page/HomePage';
import RegisterPage from '../../pages/register-page/RegisterPage';
import LoginPage from '../../pages/login-page/LoginPage';
import AdminPage from '../../pages/admin-page/AdminPage';
import { useAuth } from '../../context/AuthContext'; 

const { Header, Content, Footer } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Use the useAuth hook

  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const items = [
    {
      key: '1',
      label: 'TH',
    },
    {
      key: '2',
      label: 'EN',
    },
  ];

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };

  return (
    <Layout>
      <Header
        className="custom-header fixed-header"
        style={{
          background: 'white',
          borderBottom: '1px solid #002855',
          position: 'fixed',
          width: '100%',
          zIndex: 1,
        }}
      >
        <Row>
          <Col xs={24} sm={24} md={4} lg={4} align="left">
            <div className="mx-4">
              <Link to="/home">
                <img src={image_swen} alt="Logo" width={120} />
              </Link>
            </div>
          </Col>
          <Col xs={24} sm={24} md={20} lg={20} align="right">
            <span className="me-right-custom">
              <Button
                size="large"
                className="me-3 ms-3 custom-button"
                type="link"
                href="#"
              >
                <Space>
                  <EnvironmentTwoTone twoToneColor="#000000" />
                  Select Delivery Address
                  <CaretDownOutlined />
                </Space>
              </Button>
            </span>

            <Space
              className="mx-3 justify-content-center"
              align="center"
              justify="center"
            >
              {user ? (
                <>
                <span className="me-4">
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        EN <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </span>
                 <Button
                    type="ghost"
                    size="large"
                    shape="round"
                    className="d-flex justify-content-center w-100"
                    icon={<MenuOutlined />}
                    onClick={handleDrawerOpen}
                  />
                 
                </>
              ) : (
                <>
                  <Button
                    danger
                    size="large"
                    shape="round"
                    style={{ minWidth: '140px' }}
                    className="d-flex justify-content-center  w-100"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </Button>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      color: 'white',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <span>
                      <Button
                        size="large"
                        shape="round"
                        style={{ minWidth: '140px' }}
                        className="ant-btn-outline-danger d-flex justify-content-center logout-button w-100"
                        type="ghost"
                        onClick={handleLoginClick}
                      >
                        Login
                      </Button>
                    </span>
                  </div>
                  <span className="me-4 ms-4">
                    <Dropdown
                      menu={{
                        items,
                      }}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          EN <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </span>
                </>
              )}
            </Space>
            
          </Col>
        </Row>
      </Header>
      <Content
        className="mt-5"
        style={{
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Content>

      <Footer
        className="footer-primary"
        style={{
          textAlign: 'center',
          backgroundColor: '#e21c23',
          padding: '16px',
        }}
      >
        <Row justify="center" align="middle">
          <Col xs={24} sm={12} lg={2} align="">
            <img src={image_swen} alt="Logo" width={120} />
          </Col>
          <Col xs={24} sm={12} lg={22} align="right">
            <Button
              className="fw-bold"
              size="large"
              type="link"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              BrandSite
            </Button>
            <Button
              className="fw-bold"
              size="large"
              type="link"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              Privilege
            </Button>
            <Button
              className="fw-bold"
              size="large"
              type="link"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              Reward
            </Button>
            <Button
              className="fw-bold"
              size="large"
              type="link"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              My Coupons
            </Button>
            <Button
              className="fw-bold"
              size="large"
              type="link"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              Gift Voucher
            </Button>
            <Button
              className="fw-bold"
              size="large"
              type="link"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              Member Card
            </Button>
            <Button
              className="fw-bold"
              size="large"
              type="link"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              My Account
            </Button>
          </Col>
        </Row>
      </Footer>

      {/* Footer for footer-secondary */}
      <Footer
        className="footer-secondary"
        style={{
          backgroundColor: '#cb191f',
          padding: '16px',
        }}
      >
        <Row justify="center" align="middle">
          <Col xs={24} sm={12} lg={12}>
            <Space size={16}>
              <FacebookOutlined style={{ color: '#fff' }} height={100} width={100} />
              <InstagramOutlined style={{ color: '#fff' }} height={100} width={100} />
              <YoutubeOutlined style={{ color: '#fff' }} height={100} width={100} />
            </Space>
          </Col>
          <Col xs={24} sm={12} lg={12} align="right">
            <Button type="link" style={{ color: '#fff', textDecoration: 'none' }} href="/faq">
              FAQ
            </Button>
            <Button size="large" type="link" style={{ color: '#fff', textDecoration: 'none' }}>
              Term and Conditions
            </Button>
            <Button size="large" type="link" style={{ color: '#fff', textDecoration: 'none' }}>
              Privacy Policy
            </Button>
          </Col>
        </Row>
      </Footer>

      {/* Drawer for user */}
      <Drawer
         title={
          user ? (
            <div>
              <p className='fs-5 mb-0'>Welcome ☺ 🍨️</p>
              <p className='text-danger fs-5'>{user.firstName} {user.lastName}</p>
            </div>
          ) : (
            'Unknow'
          )
        }
        placement="right"
        closable={false}
        onClose={handleDrawerClose}
        open={isDrawerVisible}
        width={300}
        className='pd-zero'
      >
        {user ? (
          <div className='w-100 mt-3'>
            <Menu mode="vertical" theme="light" style={{ width: '100%' , padding: '0px' }} className='pd-zero'>
            <Menu.Item key="home-info" icon={<FileTextOutlined />}>
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Menu.Item key="admin-info" icon={<FileTextOutlined />}>
                <Link to="/admin">Admin</Link>
              </Menu.Item>
            </Menu>
            <div className='pd-custom'>
              <Button
                size="large"
                shape="round"
                style={{ minWidth: '140px', marginTop: '16px' }}
                className="ant-btn-outline-danger d-flex justify-content-center logout-button w-100"
                type="ghost"
                icon={<LogoutOutlined />}
                onClick={logout}
              >
                Logout
              </Button>

            </div>
           
          </div>
        ) : (
          <p></p>
          
        )}
      </Drawer>
    </Layout>
  );
};

export default AppLayout;
