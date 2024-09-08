import { useGetMyBookingQuery } from '../../Redux/features/bookingManagement/bookingManagement.api';
import { useAppSelector } from '../../Redux/hooks';
import { currentUser } from '../../Redux/features/auth/authSlice';
import PastBooking from './PastBooking';
import UpCommingBocking from './UpCommingBocking';

const UserBookingOverview = () => {
    const user = useAppSelector(currentUser)
    const { data: bookings, isLoading } = useGetMyBookingQuery(user?.email, { skip: !user?.email });

    return (
        <>
            <PastBooking bookings={bookings} isLoading={isLoading} />
            <div style={{marginTop: "20px"}}>
                <UpCommingBocking bookings={bookings} />
            </div>
        </>
    )
}

export default UserBookingOverview;