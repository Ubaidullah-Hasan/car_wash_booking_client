import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import moment from 'moment';

const UpcomingBookings = ({ bookings }) => {
    const [timers, setTimers] = useState({});

    useEffect(() => {
        const intervalId = setInterval(() => {
            const updatedTimers = bookings.reduce((acc, booking) => {
                const timeRemaining = moment(booking.dateTime).diff(moment());
                acc[booking.id] = timeRemaining;
                return acc;
            }, {});
            setTimers(updatedTimers);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [bookings]);

    const formatTime = (timeRemaining) => {
        const duration = moment.duration(timeRemaining);
        return `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
    };

    return (
        <Row gutter={16}>
            {bookings?.map((booking) => (
                <Col span={8} key={booking._id}>
                    <Card title={booking.serviceName} bordered={false}>
                        <p>Date: {moment(booking.dateTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        <p>Location: {booking.location}</p>
                        <p>Time Remaining: {timers[booking.id] !== undefined ? formatTime(timers[booking.id]) : 'Loading...'}</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default UpcomingBookings;
