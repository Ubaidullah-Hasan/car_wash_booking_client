import { Layout, Row, Col } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './footerStyle.css'

const { Footer } = Layout;
const MainFooter = () => {
    return (
        <Footer style={{ textAlign: 'left', padding: '0px', color: '#fff' }}>
            <Row gutter={[16, 16]} style={{padding: "80px"}}>
                <Col xs={24} md={8}>
                    <h3 className='footer-title'>Contact Information</h3>
                    <p><MailOutlined /> email@example.com</p>
                    <p><PhoneOutlined /> +123 456 7890</p>
                </Col>
                <Col xs={24} md={8}>
                    <h3 className='footer-title'>Follow Us</h3>
                    <div>
                        <a href="https://facebook.com" target="_blank" style={{ color: '#fff', margin: '0 10px' }}>
                            <FacebookOutlined />
                        </a>
                        <a href="https://twitter.com" target="_blank" style={{ color: '#fff', margin: '0 10px' }}>
                            <TwitterOutlined />
                        </a>
                        <a href="https://instagram.com" target="_blank" style={{ color: '#fff', margin: '0 10px' }}>
                            <InstagramOutlined />
                        </a>
                    </div>
                </Col>
                <Col xs={24} md={8}>
                    <h3 className='footer-title'>Relevant Links</h3>
                    <p><a href="/about" style={{ color: '#fff' }}>About Us</a></p>
                    <p><a href="/privacy" style={{ color: '#fff' }}>Privacy Policy</a></p>
                    <p><a href="/terms" style={{ color: '#fff' }}>Terms of Service</a></p>
                </Col>
            </Row>
            <div style={{ padding: '30px 0' }} className='copy-bar'>
                Ant Design ©{new Date().getFullYear()} Created by GYMIX
            </div>
        </Footer>
    );
};

export default MainFooter;
