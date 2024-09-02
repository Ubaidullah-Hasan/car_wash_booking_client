import { Card } from 'antd';
import emptyBox from "../assets/icon/empty-box.png"

const EmptyCard = ({ isLoading, imageWidth = "50px" }) => {
    return (
        <Card
            className='empty-card'
            loading={isLoading}
        >
            <div className='no-data'>
                <img style={{width: imageWidth}} src={emptyBox} alt="empty-box" />
                <p>Booking not found!</p>
                <h4>First Select a booking slot.</h4>
            </div>
        </Card>
    );
};

export default EmptyCard;