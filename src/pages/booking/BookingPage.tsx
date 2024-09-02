import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.css';

const { Title } = Typography;

const BookingPage = () => {
    const [bookingData, setBookingData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve booking data from localStorage
        const storedBookingData = JSON.parse(localStorage.getItem('bookings'));
        if (storedBookingData && storedBookingData.length > 0) {
            setBookingData(storedBookingData[0]);
        }
    }, []);
    console.log(bookingData);

    const handlePayNow = () => {
        if (bookingData) {
            // Redirect to AAMARPAY for payment
            navigate('/payment'); // Adjust according to your routing
            // Update the slot status to "booked" after payment
            // Logic to mark the slot as "booked" should be added here
        }
    };

    if (!bookingData) {
        return <p>No booking data found!</p>;
    }

    return (
        <div className="booking-page section-container margin-y-medium">
            <Row gutter={[16, 16]}>
                {/* Left Side - Selected Service & Slot Information */}
                <Col xs={24} md={12}>
                    <Card title="Selected Service">
                        <Title level={4}>{bookingData.serviceId.name}</Title>
                        <p><strong>Description:</strong> {bookingData.serviceId.description}</p>
                        <p><strong>Price:</strong> ${bookingData.serviceId.price}</p>
                        <p><strong>Duration:</strong> {bookingData.serviceId.duration} mins</p>
                        <p><strong>Selected Time Slot:</strong> {bookingData.slotId.startTime} - {bookingData.slotId.endTime}</p>
                    </Card>
                </Col>

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
                                <Input value={`${bookingData.slotId.startTime} - ${bookingData.slotId.endTime}`} disabled />
                            </Form.Item>
                            <Button type="primary" block onClick={handlePayNow}>
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
