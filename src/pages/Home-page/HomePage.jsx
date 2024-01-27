import React from 'react';
import { Row, Col  ,Carousel} from 'antd';
import deliveryImage from '../../assets/img/delivery_ico.svg';
import bannerImage from '../../assets/img/banner-image.svg';
import image_swen from '../../assets/img/swensen-s-logo-B0148BB776-seeklogo.com.png';
import dealImage from  '../../assets/img/superdeal_Toast Banner.png';
import '../../components/layouts/AppLayout.css'

const HomePage = () => {
  const contentStyle = {
    height: '450px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    // background: '#364d79',
  };

  return (
    <div>
      <div className="content-wrapper">
        <Row>
          <Col span={12}>
            <h1>
              สมัครเป็นสมาชิก
              <br />
              สเวนเซ่นส์วันนี้ พร้อมรับสิทธิพิเศษมากมายรอคุณอยู่ที่นี่
            </h1>
            <p className="mt-4 fs-6">
              พิเศษสุดๆ! สำหรับสมาชิกสเวนเซ่นส์ ยิ่งกิน ยิ่งได้
              ยิ่งคุ้ม ใครๆ ก็สมัครได้
              ใช้ง่ายสะดวกสบายพร้อมสิทธิประโยชน์มากมายเพื่อคนสำคัญเช่นคุณ รอไม่ได้แล้ว
              สมัครเลย
            </p>
            <div className="action to-delivery-wrapper mt-5 text-start">
              <a href="/en/delivery" className="wrap image-btn-en">
                <img src={deliveryImage} alt="Delivery Icon" />
              </a>
            </div>
          </Col>
          <Col span={12} className="image-column">
            <img src={bannerImage} alt="Banner" />
          </Col>
        </Row>
      </div>
      <div className="me-5 container mt-5">
      <h2 className='ms-5'>Super Deal</h2>
        <div className="mt-5 w-100">
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>       
                <img src={dealImage} alt="Image 1" height={400} width={1000} className="rounded img-thumbnail" />
              </h3>
            </div>
            <div>
            <h3 style={contentStyle}>       
                <img src={dealImage} alt="Image 1" height={400} width={1000} className="rounded img-thumbnail" />
              </h3>
            </div>
            <div>
            <h3 style={contentStyle}>       
                <img src={dealImage} alt="Image 1" height={400} width={1000} className="rounded img-thumbnail" />
              </h3>
            </div>
            <div>
            <h3 style={contentStyle}>       
                <img src={dealImage} alt="Image 1" height={400} width={1000}  className="rounded img-thumbnail" />
              </h3>
            </div>
          </Carousel>
          
        </div>
        <div className='mt-5 mb-5'>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
