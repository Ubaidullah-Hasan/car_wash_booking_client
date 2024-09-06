import { Button, Table } from 'antd';
import { useGetAllBookingQuery } from '../../Redux/features/bookingManagement/bookingManagement.api';
import { bookingStatus } from '../../constant/constant';

const UserBookings = () => {
    const { data: booking } = useGetAllBookingQuery(undefined);
    console.log(booking);

    const data = booking?.map(item => ({
        key: item._id,
        serviceName: item?.serviceId?.name,
        slotTime: `${item?.slotId?.startTime} - ${item?.slotId?.endTime}`,
        status: item?.status,
        paymentStatus: item?.paymentStatus,
        date: item?.slot?.date
    }))

    const columns = [
        {
            title: 'Service Name',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Booking Date',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
        },
        {
            title: 'Slot Time',
            dataIndex: 'slotTime',
            key: 'slotTime',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (item) => {
                return (
                    <Button
                        className={item === bookingStatus.completed ? "complete-btn" : 'canceled-btn'}
                        danger={item === bookingStatus.pending}
                        size='small'
                    >{item}</Button>
                )
            }
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (item) => {
                return (
                    <Button type='primary'>{item}</Button>
                )
            }
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default UserBookings;
