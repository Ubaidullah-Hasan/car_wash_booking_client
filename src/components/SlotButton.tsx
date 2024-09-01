import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const SlotButton = ({ slot, selectedSlotId, onSelect }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const existingItems = JSON.parse(localStorage.getItem('bookings')) || [];
        const mappedItems = existingItems.map(item => ({
            serviceId: item.serviceId,
            slotId: item.slotId,
        }));

        setItems(mappedItems); 
    }, [selectedSlotId]);

    console.log(items)


    return (
        <Button
            key={slot._id}
            onClick={() => onSelect(slot._id)}
            disabled={slot.isBooked !== 'available'}
            type="default"
            style={{
                marginBottom: '10px',
                width: '100%',
                backgroundColor: items?.some(item => item.slotId === slot._id) ? '#1890ff' : '', 
                color: items?.some(item => item.slotId === slot._id) ? '#fff' : '', 
                textTransform: 'uppercase',
            }}
        >
            {selectedSlotId === slot._id && <CheckOutlined style={{ marginRight: '8px' }} />}
            {slot.isBooked === 'available' ? `${slot.startTime} - ${slot.endTime}` : slot.isBooked}
        </Button>
    )
};

export default SlotButton;
