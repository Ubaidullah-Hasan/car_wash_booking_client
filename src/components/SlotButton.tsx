import { Badge, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { slotStatus } from '../constant/constant';
import moment from 'moment';

const SlotButton = ({ slot, selectedSlotId, onSelect }) => {
    const date = (moment(slot?.date).format("DD-MM-YYYY"))
    return (
        <Badge.Ribbon text={date} color="red">
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
        </Badge.Ribbon>
    )
};

export default SlotButton;
