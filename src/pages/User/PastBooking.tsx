import { Table, Tag, Card, Typography } from 'antd';
import { bookingStatus, paymentStatus } from '../../constant/constant';
import moment from 'moment';

const { Title } = Typography;


const PastBooking = ({ bookings, isLoading }) => {
    const now = moment();


    const pastBookings = bookings?.filter((booking) => {
        const bookingDateTime = moment(`${booking?.slotId?.date} ${booking?.slotId?.startTime}`, 'YYYY-MM-DD h:mm A');
        return bookingDateTime.isBefore(now);
    });
    console.log(bookings);

    const columns = [
        {
            title: 'Service Name',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
            render: (item) => <p style={{ textTransform: "capitalize" }}>{item}</p>
        },
        {
            title: 'Booking Date',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === bookingStatus.completed ? 'green' : 'volcano'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status) => (
                <Tag color={status === paymentStatus.paid ? 'green' : 'volcano'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        }
    ];

    const data = pastBookings?.map((booking, index) => ({
        key: index,
        serviceName: booking?.serviceId?.name,
        customerName: booking?.name,
        bookingDate: booking?.createdAt,
        status: booking?.status,
        paymentStatus: booking?.paymentStatus,
    }));

    return (
        <Card>
            <Title level={3} style={{textAlign: "center", marginBottom: "30px"}}>Past Bookings</Title>
            <Table
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={false}
            />
        </Card>
    );
};

export default PastBooking;