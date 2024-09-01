import { Card, Col, Row, Button, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import './style.css';
import { useGetSingleServiceQuery } from '../../Redux/features/serviceManagement/serviceManagement.api';
import { useGetSlotByServiceIdQuery } from '../../Redux/features/slotManagement/slotManagement';
import SlotButton from '../../components/SlotButton';
import { useState } from 'react';
import { useCreateBookingMutation } from '../../Redux/features/bookingManagement/bookingManagement.api';
import toast, { Toaster } from 'react-hot-toast';

const { Title, Text } = Typography;

const ServiceDetailsPage = () => {
    const { serviceId } = useParams();
    const { data: service } = useGetSingleServiceQuery(serviceId);
    const { data: slots } = useGetSlotByServiceIdQuery(serviceId, { skip: !(service?.data) });
    const [createBooking, { isLoading }] = useCreateBookingMutation();

    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        if (selectedSlotId === id) {
            setSelectedSlotId(null);
        } else if (slots.data.find(slot => slot._id === id)?.isBooked === 'available') {
            setSelectedSlotId(id);
        }
    };

    const saveToLocalStorage = (key, newItem) => {
        const existingItems = JSON.parse(localStorage.getItem(key)) || [];
        const itemExists = existingItems.some(item => item.slotId === newItem.slotId);

        if (!itemExists) {
            const updatedItems = [...existingItems, newItem];
            localStorage.setItem(key, JSON.stringify(updatedItems));
            toast.success('Save this booking!');
        } else {
            console.log('Item already exists in localStorage:', newItem);
        }
    };

    

    const handleBooke = async () => {
        if (selectedSlotId) {
            const bookingData = {
                serviceId: serviceId,
                slotId: selectedSlotId,
                // vehicleType: "car",
                // vehicleBrand: "Toyota",
                // vehicleModel: "Camry",
                // manufacturingYear: 2020,
                // registrationPlate: "ABC124"
            }
            saveToLocalStorage('bookings', bookingData);
        }
    }

    return (
        <div className="service-details-page section-container margin-y-medium">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card
                        bordered={true}
                        cover={
                            <img
                                alt={service?.name}
                                src={service?.image || "https://cdni.autocarindia.com/utils/ImageResizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Hyundai-Grand-i10-Nios-200120231541.jpg"}
                                style={{ height: '300px', objectFit: 'cover', borderBottom: "1px solid #dedcdc80" }}
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
                        {/* <Calendar
                            fullscreen={false}
                            value={selectedDate}
                            onSelect={handleDateChange}
                        /> */}
                        <div style={{ marginTop: '20px' }}>
                            {slots?.data?.map(slot => (
                                <SlotButton
                                    key={slot._id}
                                    slot={slot}
                                    selectedSlotId={selectedSlotId}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </div>
                        <Button
                            type="primary"
                            disabled={isLoading || !selectedSlotId}
                            style={{ marginTop: '20px', width: '100%' }}
                            onClick={handleBooke}
                        >
                            Book This Service
                        </Button>
                        < Toaster />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ServiceDetailsPage;
