import moment from "moment";
import { currentUser } from "../Redux/features/auth/authSlice";
import { useGetMyBookingQuery } from "../Redux/features/bookingManagement/bookingManagement.api";
import { useAppSelector } from "../Redux/hooks";
import Countdown from "react-countdown";

const ImmediatedSlot = () => {
    const user = useAppSelector(currentUser)
    const { data: bookings } = useGetMyBookingQuery(user?.email, { skip: !user?.email });

    const now = moment();

    const upcomingBookings = bookings?.filter((booking) => {
        const bookingDateTime = moment(`${booking?.slotId?.date} ${booking?.slotId?.startTime}`, 'YYYY-MM-DD h:mm A');
        return bookingDateTime.isAfter(now);
    });

    const immediateUpcomingSlot = upcomingBookings?.reduce((closest, current) => {
        const currentDateTime = moment(`${current?.slotId?.date} ${current?.slotId?.startTime}`, 'YYYY-MM-DD h:mm A');

        if (currentDateTime.isAfter(now) && (!closest || currentDateTime.isBefore(moment(`${closest?.slotId?.date} ${closest?.slotId?.startTime}`, 'YYYY-MM-DD h:mm A')))) {
            return current;
        }

        return closest;
    }, null);


    const bookingDateTime = moment(`${immediateUpcomingSlot?.slotId?.date} ${immediateUpcomingSlot?.slotId?.time}`, 'YYYY-MM-DD h:mm A');


    return (
        immediateUpcomingSlot?.slotId ? 
        <Countdown date={String(bookingDateTime)} /> 
        : <></>
    );
};

export default ImmediatedSlot;