/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Button, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import { useGetSingleServiceQuery } from '../../Redux/features/serviceManagement/serviceManagement.api';
import { useGetSlotByServiceIdQuery } from '../../Redux/features/slotManagement/slotManagement';
import SlotButton from '../../components/SlotButton';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { slotStatus, USER_ROLE } from '../../constant/constant';
import { useAppSelector } from '../../Redux/hooks';
import { currentUser } from '../../Redux/features/auth/authSlice';

const { Title, Text } = Typography;

const ServiceDetailsPage = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);
    const { data: service } = useGetSingleServiceQuery(serviceId); // use into card
    const { data: slots } = useGetSlotByServiceIdQuery(serviceId, { skip: !(service?.data) });

    const [selectedSlot, setSelectedSlot] = useState<Record<string, any>>(
        JSON.parse(localStorage.getItem("bookings")) || { serviceId: null, slotId: null }
    );

    const handleSelect = (id: string) => {
        if (selectedSlot?.slotId === id) {
            localStorage.removeItem('bookings');
            setSelectedSlot({
                serviceId: null,
                slotId: null,
            });
        } else {
            const selectedSlotData = slots?.data?.find(slot => slot._id === id);
            if (selectedSlotData?.isBooked === slotStatus.available) {
                const bookingData = {
                    serviceId: selectedSlotData.service?._id,
                    slotId: id,
                };
                setSelectedSlot(bookingData);
            }
        }
    };

    const saveToLocalStorage = (key, newItem) => {
        const existingItems = JSON.parse(localStorage.getItem(key)) || {};
        const itemExists = existingItems?.slotId === newItem?.slotId;
        if (!itemExists) {
            const updatedItems = newItem;
            localStorage.setItem(key, JSON.stringify(updatedItems));
            toast.success('Save this booking!');
        } else {
            toast.error('Already save this booking!');
        }
    };



    const handleBooke = async () => {
        if (selectedSlot?.slotId) {
            const bookingData = {
                serviceId: serviceId,
                slotId: selectedSlot?.slotId,
            }
            saveToLocalStorage('bookings', bookingData);
            navigate("/booking")
        }
    }

    return (
        <div className="service-details-page section-container">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card
                        bordered={true}
                        cover={
                            <img
                                alt={service?.name}
                                src={service?.image || "https://cdni.autocarindia.com/utils/ImageResizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Hyundai-Grand-i10-Nios-200120231541.jpg"}
                                style={{ maxHeight: '300px', objectFit: 'cover', borderBottom: "1px solid #dedcdc80" }}
                            />
                        }
                    >
                        <Title level={3}>{service?.data?.name}</Title>
                        <Text>{service?.data?.description}</Text>
                        <p><strong>Price:</strong> ${service?.data?.price}</p>
                        <p><strong>Duration:</strong> {service?.data?.duration} mins</p>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card>
                        <Title level={3} style={{ textAlign: "center", textTransform: "uppercase" }}>Available Slots</Title>
                        
                        <div style={{ marginTop: '20px' }}>
                            {slots?.data?.map(slot => (
                                <SlotButton
                                    key={slot._id}
                                    slot={slot}
                                    selectedSlotId={selectedSlot?.slotId}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </div>
                        <Button
                            className='booking-btn'
                            type="primary"
                            disabled={user?.role === USER_ROLE.admin || !selectedSlot?.slotId}
                            style={{ marginTop: '20px', width: '100%' }}
                            onClick={handleBooke}
                        >
                            Book This Service
                        </Button>
                        < Toaster />
                        {user?.role === USER_ROLE.admin && <p style={{color: "red"}}>Admin Can't Access This!</p>}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ServiceDetailsPage;
