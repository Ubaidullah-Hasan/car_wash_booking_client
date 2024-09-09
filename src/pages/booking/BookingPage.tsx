import { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd';
import './style.css';
import { useGetSlotBySlotIdQuery } from '../../Redux/features/slotManagement/slotManagement';
import { ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import EmptyCard from '../../components/EmptyCard';
import PayButton from '../../components/PayButton';
import { useAppSelector } from '../../Redux/hooks';
import { currentUser } from '../../Redux/features/auth/authSlice';
import { useGetUserByEmailQuery } from '../../Redux/features/user/userManagement.api';
import { useCreateBookingMutation } from '../../Redux/features/bookingManagement/bookingManagement.api';

const { Title } = Typography;

const BookingPage = () => {
    const [bookingData, setBookingData] = useState({
        serviceId: null,
        slotId: null,
    });
    const user = useAppSelector(currentUser);
    const { data: userResponse } = useGetUserByEmailQuery(user?.email, { skip: !(user?.email) });
    const userData = userResponse?.data;

    const { data: slot, isLoading } = useGetSlotBySlotIdQuery(bookingData?.slotId, { skip: !bookingData?.slotId });
    const slotData = slot?.data;

    const [createBooking] = useCreateBookingMutation();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const bookingInfo = {
                customer: userData?._id,
                serviceId: bookingData?.serviceId,
                slotId: bookingData?.slotId,
                vehicleType: "car",
                vehicleBrand: "X",
                vehicleModel: "Y",
                manufacturingYear: 2020,
                registrationPlate: "Y2U",
                phone: values.phone,
                name: values.name,
                totalPrice: Number(slotData?.service.price)
            }
            const res = await createBooking(bookingInfo).unwrap();
            if (res.success) {
                window.location.href = res.data;
                localStorage.removeItem('bookings');
            }

        } catch (error) {
            console.log(error);
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
                    <Col xs={24} md={24} lg={12}>
                        <Card
                            cover={<img alt="Service Cover" src={slotData?.service?.image || 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg'} />}
                            actions={[
                                <Button type="primary" className='custom-card-price-btn' icon={<DollarOutlined />}>
                                    {slotData?.service.price} ৳
                                </Button>,
                                <Button className='custom-card-btn' type="default" icon={<ClockCircleOutlined />}>
                                    {slotData?.service.duration} mins
                                </Button>,
                                <Button  className='custom-card-btn' type="default" icon={<ClockCircleOutlined />}>
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
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={{
                                email: user?.email,
                                name: userData?.name,
                                phone: userData?.phone
                            }}
                        >
                            <Form.Item label="User Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                                <Input style={{ textTransform: "capitalize" }} placeholder="Enter your name" />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input type="email" placeholder="Enter your email" readOnly />
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
