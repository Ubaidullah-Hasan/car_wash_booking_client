import { Table, Tag, Card, Typography } from 'antd';
import { useGetMyBookingQuery } from '../../Redux/features/bookingManagement/bookingManagement.api';
import { bookingStatus, paymentStatus } from '../../constant/constant';

const { Title } = Typography;

const UserBookingOverview = () => {
    const { data: bookings, isLoading } = useGetMyBookingQuery(undefined);

    // Define the columns for the Table component
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

    // Sample data for recent bookings (use real data from API)
    const data = bookings?.map((booking, index) => ({
        key: index,
        serviceName: booking?.serviceId?.name,
        customerName: booking?.name,
        bookingDate: booking?.createdAt,
        status: booking?.status,
        paymentStatus: booking?.paymentStatus,
    }));

    return (
        <Card>
            <Title level={3}>Recent Bookings Overview</Title>
            <Table
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={false}
            />
        </Card>
    );
};

export default UserBookingOverview;