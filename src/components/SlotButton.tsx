import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const SlotButton = ({ slot, selectedSlotId, onSelect }) => (
    <Button
        key={slot._id}
        onClick={() => onSelect(slot._id)}
        disabled={slot.isBooked !== 'available'}
        type="default"
        style={{
            marginBottom: '10px',
            width: '100%',
            backgroundColor: selectedSlotId === slot._id ? '#1890ff' : '',
            color: selectedSlotId === slot._id ? '#fff' : '',
            textTransform: 'uppercase',
        }}
    >
        {selectedSlotId === slot._id && <CheckOutlined style={{ marginRight: '8px' }} />}
        {slot.isBooked === 'available' ? `${slot.startTime} - ${slot.endTime}` : slot.isBooked}
    </Button>
);

export default SlotButton;
