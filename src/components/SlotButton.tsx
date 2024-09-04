import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { slotStatus } from '../constant/constant';

const SlotButton = ({ slot, selectedSlotId, onSelect }) => {

    return (
        <Button
        className='slot-button'
            key={slot._id}
            onClick={() => onSelect(slot._id)}
            disabled={slot.isBooked !== slotStatus.available}
            type="default"
            style={{
                marginBottom: '10px',
                width: '100%',
                backgroundColor: (selectedSlotId === slot._id) ? '#1890ff' : '',
                color: (selectedSlotId === slot._id) ? '#fff' : '',
                textTransform: 'uppercase',
            }}
        >
            {(selectedSlotId === slot._id) && <CheckOutlined style={{ marginRight: '8px' }} />}
            {slot.isBooked === slotStatus.available ? `${slot.startTime} - ${slot.endTime}` : slot.isBooked}
        </Button>
    )
};

export default SlotButton;
