import { Table, Tag, Card, Typography } from 'antd';
import { useGetAllBookingQuery } from '../../Redux/features/bookingManagement/bookingManagement.api';

const { Title } = Typography;

const OverviewBookings = () => {
    const { data: bookings, isLoading } = useGetAllBookingQuery(undefined); 
    // console.log(bookings);

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
            render: (item) => <p style={{textTransform: "capitalize"}}>{item}</p>
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
                <Tag color={status === 'booked' ? 'green' : 'volcano'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
    ];

    const data = bookings?.map((booking, index) => ({
        key: index,
        serviceName: booking?.serviceId?.name,
        customerName: booking?.customer?.name,
        bookingDate: booking?.createdAt,
        status: booking?.status,
    }));

    return (
        <Card>
            <Title level={3}>Recent Bookings Overview</Title>
            <Table
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={false}
                scroll={{ x: 'max-content' }}
            />
        </Card>
    );
};

export default OverviewBookings;
