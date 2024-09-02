import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useCreateBookingMutation } from '../../Redux/features/bookingManagement/bookingManagement.api';
import { useGetSlotBySlotIdQuery } from '../../Redux/features/slotManagement/slotManagement';
import { ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import EmptyCard from '../../components/EmptyCard';

const { Title } = Typography;

const BookingPage = () => {
    const navigate = useNavigate();
    // const [bookingData, setBookingData] = useState(null);
    const [bookingData, setBookingData] = useState({
        serviceId: null,
        slotId: null,
    });
    const { data: slot, isLoading } = useGetSlotBySlotIdQuery(bookingData?.slotId, { skip: !bookingData?.slotId });
    const slotData = slot?.data;
    console.log(slotData);


    useEffect(() => {
        const storedBookingData = JSON.parse(localStorage.getItem('bookings'));
        if (storedBookingData) {
            setBookingData(storedBookingData);
        }
    }, []);

    const handlePayNow = () => {
        if (bookingData) {
            // Redirect to AAMARPAY for payment
            navigate('/payment'); // Adjust according to your routing
            // Update the slot status to "booked" after payment
            // Logic to mark the slot as "booked" should be added here
        }
    };


    return (
        <div className="booking-page section-container margin-y-medium">
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
                        <Form layout="vertical">
                            <Form.Item label="User Name" name="userName" rules={[{ required: true, message: 'Please input your name!' }]}>
                                <Input placeholder="Enter your name" />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input type="email" placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item label="Selected Time Slot">
                                <Input value={`${slotData?.startTime} - ${slotData?.endTime}`} disabled />
                            </Form.Item>
                            <Button
                                disabled={!slotData}
                                type="primary"
                                block
                                onClick={handlePayNow}
                            >
                                Pay Now
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default BookingPage;
