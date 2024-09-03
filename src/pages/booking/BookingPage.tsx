import { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useGetSlotBySlotIdQuery } from '../../Redux/features/slotManagement/slotManagement';
import { ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import EmptyCard from '../../components/EmptyCard';
import PayButton from '../../components/PayButton';
import axios from 'axios';

const { Title } = Typography;

const BookingPage = () => {
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState({
        serviceId: null,
        slotId: null,
    });
    const { data: slot, isLoading } = useGetSlotBySlotIdQuery(bookingData?.slotId, { skip: !bookingData?.slotId });
    const slotData = slot?.data;


    // payment
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);

        // Prepare payment data
        const paymentData = {
            store_id: 'aamarpaytest',
            signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
            amount: '500',
            tran_id: Math.floor(Math.random() * 10000),
            currency: "BDT",
            desc: "Description",
            cus_add1: "Dhaka",
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "0",
            cus_country: "Bangladesh",
            type: "json",
            success_url: 'http://localhost:5173/payment/success',
            fail_url: 'http://localhost:5173/payment/fail',
            cancel_url: 'http://localhost:5173/payment/cancel',
            cus_name: values.userName,
            cus_email: values.email,
            cus_phone: values.phone,
        };

        try {
            const response = await axios.post('https://sandbox.aamarpay.com/index.php', paymentData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const redirect_url = response.data.payment_url;
            if (response.data && redirect_url) {
                window.location.href = redirect_url
            }

        } catch (error) {
            console.error('Payment initiation failed', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const storedBookingData = JSON.parse(localStorage.getItem('bookings'));
        if (storedBookingData) {
            setBookingData(storedBookingData);
        }
    }, []);


    return (
        <div className="booking-page section-container">
            <Row gutter={[16, 16]}>
                {/* Left Side - Selected Service & Slot Information */}
                {!slotData ?
                    <EmptyCard isLoading={isLoading} imageWidth='100px' />
                    :
                    <Col xs={24} md={12}>
                        <Card
                            cover={<img alt="Service Cover" src={slotData?.service?.image || 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg'} />}
                            actions={[
                                <Button type="primary" className='custom-card-price-btn' icon={<DollarOutlined />}>
                                    {slotData?.service.price} ৳
                                </Button>,
                                <Button className='custom-card-btn' type="default" icon={<ClockCircleOutlined />}>
                                    {slotData?.service.duration} mins
                                </Button>,
                                // <Button type="default" icon={<CalendarOutlined />}>
                                //     {moment(slotData?.date).format("YYYY-MM-DD") || 'Selected Date'}
                                // </Button>,
                                <Button className='custom-card-btn' type="default" icon={<ClockCircleOutlined />}>
                                    {slotData?.startTime} - {slotData?.endTime}
                                </Button>,
                            ]}
                        >
                            <Title level={4}>{slotData?.service?.name}</Title>
                            <p>{slotData?.service.description}</p>
                        </Card>
                    </Col>

                }

                {/* Right Side - User Information Form */}
                <Col xs={24} md={12}>
                    <Card title="User Information">
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item label="User Name" name="userName" rules={[{ required: true, message: 'Please input your name!' }]}>
                                <Input placeholder="Enter your name" />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input type="email" placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input your phone!' }]}>
                                <Input type="text" placeholder="Enter your phone" />
                            </Form.Item>
                            <Form.Item label="Selected Time Slot">
                                <Input className='date-disabled' value={`${slotData?.startTime} - ${slotData?.endTime}`} disabled />
                            </Form.Item>
                            {/* pay btn */}
                            <PayButton slotData={slotData} loading={loading} />
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default BookingPage;
