import { Card, Row, Col, Typography, Badge } from 'antd';
import moment from 'moment';
import Countdown from 'react-countdown';
import "./style.css"

const { Title, Text } = Typography;


const UpCommingBocking = ({ bookings }) => {
    const now = moment();
    
    const upcomingBookings = bookings?.filter((booking) => {
        const bookingDateTime = moment(`${booking?.slotId?.date} ${booking?.slotId?.startTime}`, 'YYYY-MM-DD h:mm A');
        return bookingDateTime.isAfter(now);
    });

    return (
        <div>
            <Card >
                <Title level={3} style={{ marginBottom: "30px", textAlign: "center" }}>Upcoming Bookings</Title>
                <Row gutter={[16, 16]}>
                    {upcomingBookings?.map((booking) => {
                        const bookingDateTime = moment(`${booking?.slotId?.date} ${booking?.slotId?.time}`, 'YYYY-MM-DD h:mm A');
                        return (
                            <Col xs={24} md={12} key={booking?._id}>
                                <Badge.Ribbon text={<Countdown date={String(bookingDateTime)} />} color="pink">
                                    <Card
                                        className='card-shadow'
                                        bordered={false}
                                        cover={
                                            <img
                                                alt={booking?.service?.name}
                                                src={booking?.service?.image || "https://cdni.autocarindia.com/utils/ImageResizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Hyundai-Grand-i10-Nios-200120231541.jpg"}
                                                style={{ height: '300px', objectFit: 'cover', }}
                                            />
                                        }
                                    >
                                        <Title level={3}>{booking?.serviceId?.name}</Title>
                                        <Text>{booking?.serviceId?.description}</Text>
                                        <p><strong>Price:</strong> ${booking?.serviceId?.price}</p>
                                        <p><strong>Duration:</strong> {booking?.serviceId?.duration} mins</p>
                                        <p><strong>date:</strong> {moment(booking?.slotId?.date).format("Do MMM, YYYY")} </p>
                                    </Card>
                                </Badge.Ribbon>
                            </Col>
                        );
                    })}
                </Row>
            </Card>
        </div>
    );
};

export default UpCommingBocking 