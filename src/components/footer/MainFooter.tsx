import { Layout, Row, Col } from 'antd';
import { TwitterOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './footerStyle.css'
import { FaFacebookF } from 'react-icons/fa';

const { Footer } = Layout;
const MainFooter = () => { 
    return (
        <Footer style={{ textAlign: 'left', padding: '0px', color: '#fff', background: "#0A2540" }}>
            <Row style={{padding: "80px"}}>
                <Col xs={24} md={8}>
                    <h3 className='footer-title'>Contact Information</h3>
                    <p><MailOutlined /> email@example.com</p>
                    <p><PhoneOutlined /> +123 456 7890</p>
                </Col>
                <Col xs={24} md={8} >
                    <h3 className='footer-title'>Follow Us</h3>
                    <div>
                        <a href="https://facebook.com" target="_blank" style={{ color: '#fff', margin: '0 10px' }}>
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" style={{ color: '#fff', margin: '0 10px' }}>
                            <TwitterOutlined />
                        </a>
                        <a href="https://instagram.com" target="_blank" style={{ color: '#fff', margin: '0 10px' }}>
                            <InstagramOutlined />
                        </a>
                    </div>
                </Col>
                <Col xs={24} md={8} >
                    <h3 className='footer-title'>Relevant Links</h3>
                    <p><a href="/" style={{ color: '#fff' }}>Home</a></p>
                    <p><a href="/services" style={{ color: '#fff' }}>Service</a></p>
                    <p><a href="/booking" style={{ color: '#fff' }}>Booking</a></p>
                    <p><a href="/reviews" style={{ color: '#fff' }}>Reviews</a></p>
                </Col>
            </Row>
            <div style={{ padding: '30px 0' }} className='copy-bar'>
                Ant Design ©{new Date().getFullYear()} Created by GYMIX
            </div>
        </Footer>
    );
};

export default MainFooter;
